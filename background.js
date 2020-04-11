'use strict';

const MAIN_ALARM_NAME = "take_break";
const REFRESH_ALARM_NAME = "alarm_checker"


function add_alarm() {
  console.log("Started the alarm");
  // This one 
  chrome.alarms.create(MAIN_ALARM_NAME, {
    delayInMinutes: 30,
    periodInMinutes: 30
  });

  chrome.alarms.create(REFRESH_ALARM_NAME, {
    delayInMinutes: 5,
    periodInMinutes: 5
  })

  chrome.alarms.onAlarm.addListener(function(alarm) {

    if (alarm.name === MAIN_ALARM_NAME) {
      chrome.runtime.getBackgroundPage(function(page) {
        page.console.log("Alarm time is up, creating notification");
      })
      chrome.notifications.create({
        message: 'It has been 30 minutes',
        type: 'image',
        iconUrl: chrome.runtime.getURL("images/take_a_break.png"),
        imageUrl: chrome.runtime.getURL("images/take_a_break.png"),
        title: 'Take a Break',
        requireInteraction: true
      });
    };

    if (alarm.name === REFRESH_ALARM_NAME) {
      chrome.notifications.getAll(function(notifications) {
        Object.keys(notifications).forEach(function(notification_id) {
          console.log(notification_id);
          chrome.notifications.update(
            notification_id, {
              message: 'It has been 30+ minutes...',
              type: 'image',
              iconUrl: chrome.runtime.getURL("images/take_a_break.png"),
              imageUrl: chrome.runtime.getURL("images/take_a_break.png"),
              title: '[Delayed] Take a Break',
              requireInteraction: true
            },
          );
        });
      });
    }
  });
}


chrome.runtime.onInstalled.addListener(add_alarm);
chrome.runtime.onStartup.addListener(add_alarm);