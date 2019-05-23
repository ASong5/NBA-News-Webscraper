const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('nbanews.csv');

writeStream.write(`Headline,Link,Date \n`);

request('https://ca.nba.com/news', (error, response, html) => {
    if(!error && response.statusCode === 200){
        const $ = cheerio.load(html);
        $('.p0comp-card').each((i, el) => {

            const headline = $(el).find('.card__body .card__inner-body div.card__headline').text().replace(/,/, " and");
            const link = $(el).find('.card__body a').attr("href");
            const meta = $(el).find(".card__footer span").attr("datetime").replace(/T/, " ");
            console.log(`Headline: ${headline}\nURL: ${link}\nDate/Time: ${meta}\n`);
            writeStream.write(`${headline},${link},${meta} \n`);
        });
     console.log("\n SCRAPING COMPLETE");   
    }
})

