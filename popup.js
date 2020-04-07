// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.alarms.get('break_interval', function(alarm) {
	var current_time = (new Date(Date.now()));
	var alarm_time = (new Date(alarm.scheduledTime));
	var remaining_time = (alarm_time.getTime() - current_time.getTime()) / 1000 / 60 // minutes remaining
	document.getElementById('remaining_time').innerHTML = remaining_time + ' minutes remaining';

	chrome.runtime.getBackgroundPage(function(page) {
		page.console.log("Current time: " + current_time.toTimeString());
		page.console.log("Alarm time: " + alarm_time.toTimeString());
	});

});