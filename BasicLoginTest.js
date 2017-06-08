"use strict";

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

function logTitle() {
	browser.getTitle().then(function(title) {
		console.log('Current Page Title: ' + title);
	});
}

function clickLink(link) {
	link.click();
}

function handleFailure(err) {
	console.error('Something went wrong\n', err.stack, '\n');
	closeBrowser();
}

function closeBrowser() {
	browser.quit();
}

browser.get('https://ping1.firebaseapp.com');
browser.findElement(webdriver.By.xpath("//img[@src='https://platform.slack-edge.com/img/sign_in_with_slack.png']")).click();   //sendKeys('tuts+ code');
browser.findElement(webdriver.By.xpath("//input[@id='domain']")).click();
browser.findElement(webdriver.By.xpath("//input[@id='domain']")).sendKeys("pingpad");
browser.findElement(webdriver.By.xpath("//button[@id='submit_team_domain']")).click();

//browser.wait(findTutsPlusLink, 2000).then(clickLink).then(logTitle).then(closeBrowser, handleFailure);
