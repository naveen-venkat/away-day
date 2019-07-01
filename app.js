const EventOrganizer = require('./models/event-organizer');
const fileUtil = require('./utils/file-util');
const ActivitySlot = require('./models/activity-slot');
const Activity = require('./models/activity');
const logger = require('./utils/logger');

class App {

	parseActivities(rows) {
		return rows.map(row => {
			// Activity format <Activity name><Space><Duration in min>min | sprint
			const activitySplit = row.split(' ');
			const durationString = activitySplit[activitySplit.length - 1];
			const activityName = activitySplit.join(' ');
			let duration;
			if (durationString.toLowerCase() === 'sprint') {
				duration = ActivitySlot.SPRINT;
			} else if (durationString.match(/\d+/g)) {
				duration = Number.parseInt(durationString);
			} else {
				throw new Error(`Activity "${activityName}" has invalid entries, please correct and try again`);
			}
			return new Activity(activityName, duration);
		});
	}

	main() {
		const filename = process.argv[2];
		logger.debug('Entered filename', filename);
		if (!filename) {
			throw new Error('Please provide a filename');
		}
		return fileUtil.readLines(filename)
			.then(activityRows => {
				let activities = this.parseActivities(activityRows);
				logger.debug('Parsed activities', activities);
				let eventOrganizer = new EventOrganizer(activities);
				if (eventOrganizer.prepareSchedule()) {
					logger.debug('Schedule prepared', activities);
					console.log('\n\n********************************** OUTPUT ****************************************');
					return eventOrganizer.printSchedule();
				} else {
					throw new Error('Schedule could not be prepared');
				}
			});
	}
}

let app = new App();
app.main();