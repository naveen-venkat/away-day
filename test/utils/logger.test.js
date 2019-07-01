'use strict';

const expect = require('chai').expect;

describe('Logger -> ', () => {
	let logger;
	beforeEach(() => {
		logger = require('../../utils/logger');
	});

	it('should be a Object', () => {
		expect(logger).to.be.a('object');
	});

	it('should have a setLevel function', () => {
		expect(logger.setLevel).to.be.a('function');
	});

	it('should have logger level to info', () => {
		expect(logger.level).to.equal('info');
	});

	it('should set logger level to error', () => {
		logger.setLevel('error');
		expect(logger.level).to.equal('error');
	});

	it('should set logger level to debug', () => {
		logger.level = 'debug';
		logger.setLevel();
		expect(logger.level).to.equal('debug');
	});
});
