'use strict';

const logger = require('pino')({level: 'info'});

/* istanbul ignore if */
if (process.env.DEBUG) {
	logger.level = 'debug';
}

logger.setLevel = (level) => {
	logger.level = level || logger.level;
};

module.exports = logger;
