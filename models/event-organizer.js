const Schedule = require('./schedule');
const ActivitySlot = require('./activity-slot');
const logger = require('../utils/logger');

class DayOut {

  activities = [];
  schedules = [];

  constructor(activities) {
    this.activities = activities;
  }

  getSumOfActivitiesDuration() {
    return this.activities.reduce((acc, currentValue) => acc + currentValue.duration, 0);
  }

  getSuitableActivityIndex(activities, availableMinutes) {
    return activities.findIndex(activity => activity.duration <= availableMinutes);
  }

  printSchedule() {
    let index = 0;
    for (let schedule of this.schedules) {
      console.log(`Team ${++index}:`);
      var date = new Date();
      date.toLocaleDateString
      date.setHours(ActivitySlot.morningSlot.startTime);
      date.setMinutes(0);
      date.setSeconds(0);
      let firstActivity = schedule.morningActivities.shift();
      console.log('%s \t : %s', ActivitySlot.getActivityStartTime(date), firstActivity.name);
      date.setMinutes(firstActivity.duration);

      for (let activity of schedule.morningActivities) {
        console.log('%s \t : %s', ActivitySlot.getActivityStartTime(date), activity.name);
        date.setMinutes(date.getMinutes() + activity.duration);
      }
      console.log('%s \t : %s', ActivitySlot.getActivityStartTime(date), schedule.lunchBreak.name);
      date.setMinutes(date.getMinutes() + schedule.lunchBreak.duration);

      for (let activity of schedule.eveningActivities) {
        console.log('%s \t : %s', ActivitySlot.getActivityStartTime(date), activity.name);
        date.setMinutes(date.getMinutes() + activity.duration);
      }

      if (date.getHours() < ActivitySlot.presentation.minStartTime) {
        date.setHours(ActivitySlot.presentation.minStartTime);
        date.setMinutes(0);
      }
      console.log('%s \t : %s \n', ActivitySlot.getActivityStartTime(date), schedule.presentation.name);
    }
  }

  prepareSchedule() {
    const availableMinutes = ActivitySlot.getAvailableMinutesWithExtraTime();
    logger.debug('Total Away day time available in minutes', availableMinutes);

    const sumOfActivitiesDuration = this.getSumOfActivitiesDuration();
    logger.debug('Total Activities time available in minutes', sumOfActivitiesDuration);

    const numberOfTeamsRequired = Math.round(sumOfActivitiesDuration / availableMinutes);
    logger.debug('Number of Teams required', numberOfTeamsRequired);

    do {
      let schedule = new Schedule();
      let addMoreActivities = true;

      while (addMoreActivities && this.activities.length) {
        const availableMinutes = schedule.getRemainingMinutesInMorningSlot(schedule.morningActivities);
        const activityIndex = this.getSuitableActivityIndex(this.activities, availableMinutes);
        if (activityIndex !== -1) {
          schedule.morningActivities.push(this.activities[activityIndex]);
          this.activities.splice(activityIndex, 1);
        } else {
          addMoreActivities = false;
        }
      }

      logger.debug('Morning slot added to Team', this.schedules.length);

      schedule.lunchBreak = ActivitySlot.getLunchBreak();
      addMoreActivities = true;
      while (addMoreActivities && this.activities.length) {
        const availableMinutes = schedule.getRemainingMinutesInMorningSlot(schedule.eveningActivities)
        const activityIndex = this.getSuitableActivityIndex(this.activities, availableMinutes);

        if (activityIndex !== -1) {
          schedule.eveningActivities.push(this.activities[activityIndex]);
          this.activities.splice(activityIndex, 1);
        } else {
          addMoreActivities = false;
        }
      }

      logger.debug('Evening slot added to Team', this.schedules.length);
      schedule.presentation = ActivitySlot.getPresentation();
      this.schedules.push(schedule);

    } while (this.schedules.length < numberOfTeamsRequired);

    return true;
  }
}

module.exports = DayOut;