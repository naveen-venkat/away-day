class ActivitySlot {

  morningSlot = {
    startTime: 9,
    endTime: 12
  }
  lunchBreak = {
    duration: 60,
    name: 'Lunch Break'
  }
  eveningSlot = {
    startTime: 13,
    endTime: 16,
    extraTime: 1
  }
  presentation = {
    minStartTime: 16,
    maxStartTime: 17,
    name: 'Staff Motivation Presentation'
  }

  getActivityStartTime(dateTime) {
    return dateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hourCycle: 'h12' });
  }

  getMorningAvailableMinutes() {
    return Math.round((this.morningSlot.endTime - this.morningSlot.startTime) * 60);
  }

  getEveningAvailableMinutes() {
    return Math.round((this.eveningSlot.endTime - this.eveningSlot.startTime) * 60);
  }

  getAvailableMinutes() {
    return this.getMorningAvailableMinutes() + this.getEveningAvailableMinutes();
  }

  getAvailableMinutesWithExtraTime() {
    return this.getAvailableMinutes() + (this.eveningSlot.extraTime * 60);
  }

  getLunchBreak() {
    return this.lunchBreak;
  }

  getPresentation() {
    return this.presentation;
  }

  SPRINT = 15;

}

module.exports = new ActivitySlot();