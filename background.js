// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {
  // chrome.runtime.onStartup.addListener(function() {
  chrome.alarms.create("break_interval", {
    delayInMinutes: 30,
    periodInMinutes: 30
  });

  chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === "break_interval") {

      chrome.notifications.create({
        message: 'It has been 30 minutes',
        type: 'image',
        iconUrl: chrome.runtime.getURL("images/take_a_break.png"),
        imageUrl: chrome.runtime.getURL("images/take_a_break.png"),
        title: 'Take a Break',
        requireInteraction: true
      });
    };
  });

});