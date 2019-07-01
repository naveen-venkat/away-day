const ActivitySlot = require('./activity-slot');

class Schedule {
  morningActivities = []
  lunchBreak = {}
  eveningActivities = []
  presentation = {}

  getRemainingMinutesInMorningSlot(teamActivities) {
    const availableMorningMinutes = ActivitySlot.getMorningAvailableMinutes();
    if (teamActivities.length === 0) return availableMorningMinutes;
    const sumOfActivitiesDuration = teamActivities.reduce((acc, currentValue) => acc + currentValue.duration, 0);
    return (availableMorningMinutes - sumOfActivitiesDuration);
  }

  getRemainingMinutesInEveningSlot(teamActivities) {
    if (teamActivities.length === 0) return true;
    const sumOfActivitiesDuration = teamActivities.reduce((acc, currentValue) => acc + currentValue.duration, 0);
    const availableEveningMinutes = ActivitySlots.getEveningAvailableMinutes();
    return (availableEveningMinutes - sumOfActivitiesDuration);
  }
}

module.exports = Schedule;