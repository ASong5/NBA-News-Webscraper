const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('streams.csv');

writeStream.write(`Host,Quality,Broadcast,URL \n`);

request('https://www.reddit.com/r/nbastreams/', (error, response, html) => {
	if (!error && response.statusCode === 200) {
		const $ = cheerio.load(html);
		var titleCheck = $('.s15fpu6f-0').each((i, el) => {
			raptorsRegex = RegExp('Raptors');
			const titleCheck = $(el).text();
			return titleCheck;
		});
		raptorsRegex.test(titleCheck) ? console.log('found raptors') : console.log('raptors not found');
    }
    
    // to implement actual scraper once any game thread opens up.
});
