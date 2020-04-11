'use strict';

chrome.alarms.get('break_interval', function(alarm) {
	var current_time = (new Date(Date.now()));
	var alarm_time = (new Date(alarm.scheduledTime));
	var remaining_time_minutes = (alarm_time.getTime() - current_time.getTime()) / 1000 / 60 // minutes remaining

	document.getElementById('remaining_time_minutes').innerHTML = remaining_time_minutes + ' minutes remaining';

	chrome.notifications.getAll(function(notifications) {
		var notification_ids = Object.keys(notifications);
		var msg;
			if (notification_ids.length === 0) {
				msg = "No delayed notifications in the queue";
			} else {
				msg = notification_ids.length + " delayed notifications in the queue";
			}
			document.getElementById('delayed_alarms').innerHTML = msg;
		});

	chrome.runtime.getBackgroundPage(function(page) {
		page.console.log("Current time: " + current_time.toTimeString());
		page.console.log("Alarm time: " + alarm_time.toTimeString());
		chrome.notifications.getAll(function(notifications) {
			var notification_ids = Object.keys(notifications);
			if (notification_ids.length === 0) {
				page.console.log("No delayed notifications in the queue");
			} else {
				notification_ids.forEach(
					function(notification_id) {
						page.console.log("Delayed notifications in the queue " + notification_id);
					}
				);
			}

		});
	});

});