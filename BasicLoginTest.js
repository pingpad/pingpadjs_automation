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
	return browser.findElements(webdriver.By.xpath("//img[@data-src='https://static1.squarespace.com/static/594330b0ff7c50df3578e8a9/t/597a72e920099e0bff656b0a/1501197051952/']")).then(function(result) {
		return result[0];
	});
}
function findTosLink() {
	return browser.findElement(webdriver.By.xpath("//a[@href='https://www.pingpad.net/tos']")).then(function(result) {
		return result[0];
	});
}
function findHelpLink() {
	return browser.findElement(webdriver.By.xpath("//a[@href='#/channels/public_0_1/board']")).then(function(result) {
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

browser.get('https://pingpad.net');
//browser.executeScript("window.scrollTo(0,document.body.scrollHeight);");
browser.sleep(3000);
//var tosLink = browser.findElement(webdriver.By.xpath("//a[@href='https://www.pingpad.net/tos']"));
//tosLink.click();
//findAddtoSlack();
browser.executeScript("window.scrollBy(0,200);");
browser.sleep(1000);

browser.wait(findAddtoSlack, 2000).then(clickLink).then(logTitle);

browser.getTitle().then(function(title) {
  if(title === 'Sign in | Slack') {
    console.log('Test passed');
  } else {
    console.log('Test failed');
  }
  });
//browser.wait(findTosLink, 2000).then(clickLink).then(logTitle);//.then(assert.equal("Sign in | Slack", "Sign in | Slack"));//.then(closeBrowser, handleFailure);
//browser.wait(findAddtoSlack, 2000).then(clickLink).then(logTitle);//.then(assert.equal("Sign in | Slack", "Sign in | Slack"));//.then(closeBrowser, handleFailure);
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
browser.wait(findPingpadLogo, 8000).then(logTitle);
browser.getTitle().then(function(title) {
    if(title === 'Pingpad') {
      console.log('Test passed');
    } else {
      console.log('Test failed');
    }
  });
browser.wait(findPingpadLogo, 5000).then(logTitle);
browser.sleep(3000);

var channelsHeader = browser.findElement(webdriver.By.xpath("//div[@id='pads']"));
channelsHeader.getText().then(function(s) {
  assert.equal(s, "CHANNELS");
});
browser.sleep(3000);
browser.findElement(webdriver.By.xpath("//a[@href='#/channels/public_0_1/board']")).click();
browser.sleep(7000);
logTitle();
//console.log('This is the current url' + browser.getCurrentUrl().toString());
browser.sleep(7000);


/*browser.wait(findHelpLink, 4000).then(clickLink).then(logTitle);
browser.getTitle().then(function(title) {
    if(title === 'Pingpad') {
      console.log('Test passed');
    } else {
      console.log('Test failed');
    }
  });
*/
/*var allNotes = browser.findElement(webdriver.By.xpath("//a[@id='pads']"));
allNotes.getText().then(function(s){
  assert.equal(s, "All Notes");
});*/


closeBrowser();
