const fs = require('fs');
const readline = require('readline');

exports.readLines = async (filename) => {
	return new Promise((resolve, reject) => {
		let data = [];
		const input = fs.createReadStream(filename);
		const rl = readline.createInterface({ input });
		rl.on('line', line => {
			data.push(line);
		});
		rl.on('close', () => {
			if (!data) {
				return reject('Filename you provided is empty or invalid');
			}
			return resolve(data);
		});
	});
};