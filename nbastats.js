

const puppeteer = require('puppeteer');
const rl = require('readline-sync');

(async () => {
	var playerOne = new String();
	//var playerTwo = new String();

	playerOne = rl.question('Enter Player One Name: ');
    //playerTwo = rl.question('Enter Player Two Name: ');

	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://www.basketball-reference.com/');

	await page.focus('#header > div.search > form > div > div > input.ac-input.completely');
    await page.keyboard.type(playerOne);
    await page.click("#header > div.search > form > input[type=submit]:nth-child(3)");

    await page.waitForSelector("#all_per_game");
    await page.waitFor(500);
    await page.click("#per_game\.2019\.clone > th > a");

    await page.waitForSelector("#pgl_basic_playoffs.88.clone");
    const table = await page.evaluate(() => {
        return document.querySelectorAll("#pgl_basic_playoffs_clone > tbody tr");
    })

    playerOneStats = {};

    table.forEach(element => {
        playerOneStats.Date = element.querySelector("td.left a").innerText;
        console.log(playerOneStats);
    })

    var html = await page.evaluate(() => {
        return document.querySelector("#meta > div:nth-child(2) > p:nth-child(2)").innerText;
    })
    
    

	await browser.close();
})();
