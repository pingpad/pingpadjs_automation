"use strict";
var assert = require('assert');

var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder().usingServer().withCapabilities({'browserName': 'chrome' }).build();

assert.throws(
  function() {
    throw new Error("Wrong value");
  },
  function(err) {
    if ( (err instanceof Error) && /value/.test(err) ) {
      return true;
    }
  },
  "unexpected error"
);

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

function findAddtoSlack() {
	return browser.findElements(webdriver.By.xpath("//img[@src='https://platform.slack-edge.com/img/sign_in_with_slack.png']")).then(function(result) {
		return result[0];
	});
}
function findPingpadLogo() {
	return browser.findElements(webdriver.By.xpath("//img[@src='images/pingpad_logo.png']")).then(function(result) {
		return result[0];
	});
}
function findChannelsHeader() {
	return browser.findElements(webdriver.By.xpath("//div[@id='pads']")).then(function(result) {
		return result[0];
	});
}

function closeBrowser() {
	browser.quit();
}

browser.get('https://ping1.firebaseapp.com');
browser.wait(findAddtoSlack, 2000).then(clickLink).then(logTitle);//.then(assert.equal("Sign in | Slack", "Sign in | Slack"));//.then(closeBrowser, handleFailure);
browser.getTitle().then(function(title) {
    if(title === 'Sign in | Slack') {
      console.log('Test passed');
    } else {
      console.log('Test failed');
    }
  });
browser.findElement(webdriver.By.xpath("//input[@id='domain']")).click();
browser.findElement(webdriver.By.xpath("//input[@id='domain']")).sendKeys("pingpad");
browser.findElement(webdriver.By.xpath("//button[@id='submit_team_domain']")).click();
browser.findElement(webdriver.By.xpath("//input[@id='email']")).click();
browser.findElement(webdriver.By.xpath("//input[@id='email']")).sendKeys("automationpingpad@gmail.com");
browser.findElement(webdriver.By.xpath("//input[@id='password']")).click();
browser.findElement(webdriver.By.xpath("//input[@id='password']")).sendKeys("pingpad123");
browser.findElement(webdriver.By.xpath("//button[@id='signin_btn']")).click();
browser.findElement(webdriver.By.xpath("//button[@id='oauth_authorizify']")).click();
browser.wait(findPingpadLogo, 10000).then(logTitle);
browser.getTitle().then(function(title) {
    if(title === 'Pingpad') {
      console.log('Test passed');
    } else {
      console.log('Test failed');
    }
  });
browser.wait(findPingpadLogo, 10000).then(logTitle);

var channelsHeader = browser.findElement(webdriver.By.xpath("//div[@id='pads']"));
channelsHeader.getText().then(function(s) {
  assert.equal(s, "CHANNELS");
});

var allNotes = browser.findElement(webdriver.By.xpath("//a[@id='pads']"));
allNotes.getText().then(function(s){
  assert.equal(s, "All Notes");
});


closeBrowser();
