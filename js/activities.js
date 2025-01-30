function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// create a map to store the values of the the tweet as key


	// Create another map to count the total number of activities
	let activity_dict = {};

	// Create a dictionary based on activity dict that keeps track 
	// of distance covered by each activity,a s well as the day
	let distance_dict = {};

	// Create a dict based on week of the day, accounting for all the distances
	// Covered on either a weekday or weekend 
	let week_dict = {
		"weekdays": 0,
		"weekends": 0
	};

	// function to 
	function addOrIncrement(map, key) {
		if (map[key]) {
			map[key]++;
		}
		else {
			map[key] = 1;
		}
	}

	// Loop through every tweet to extract relevant information
	tweet_array.forEach(tweet => {
		// Store the activity type for each tweet
		let tweet_activity = tweet.activityType;
		// Store the disstance for each tweet
		let tweet_distance = tweet.distance;
		// Store the day that each tweet was made
		let tweet_day = tweet.time.toLocaleString('en-us', { weekday: 'long' });

		if (tweet_day == "Sunday" || tweet_day == "Saturday") {
			tweet_day = "weekends";
		}
		else {
			tweet_day = "weekdays";
		}
		// Check if tweet_activity is "". If so, then it is a timed workout. Exclude it
		if (tweet_activity != "") {
			// Increment the count of activity per activity
			addOrIncrement(activity_dict, tweet_activity);
			// Check if the tweet has been recorded in distance dict already
			if (distance_dict[tweet_activity]) {
				distance_dict[tweet_activity] += tweet_distance;
			}
			else {
				distance_dict[tweet_activity] = tweet_distance;
			}
			// Map the distance covered on weekends/weekdays
			week_dict[tweet_day] += tweet_distance;
		}
	});

	// Create a list to store the values of activity dict
	const activity_counts = [];
	// Create a variable to keep track of all the activity types
	let num_activities = 0;

	// Loop through the activity dict
	for (key in activity_dict) {
		// Increment count of total activities
		num_activities++;
		// Push the value of the counts of each activity
		activity_counts.push(activity_dict[key]);
	}

	// Sort the counts of activities in descending order
	activity_counts.sort((a, b) => b - a);
	// Store the top 3 activities by matching the sorted values with their keys
	let top1_activity, top2_activity, top3_activity;
	// Loop through activity dict to find the top 3 activities
	for (key in activity_dict) {
		// Check if it is the top 1 activity
		if (activity_dict[key] == activity_counts[0]) {
			top1_activity = key;
		}
		// Check if it is the top 2 activity
		else if (activity_dict[key] == activity_counts[1]) {
			top2_activity = key;
		}
		// check if it is the top 3 activity
		else if (activity_dict[key] == activity_counts[2]) {
			top3_activity = key;
		}
	}

	// calculate the max and min of the distance dict
	let max_distance = Math.max(...Object.values(distance_dict));
	let max_distance_activity;
	let min_distance = Math.min(...Object.values(distance_dict));
	let min_distance_activity;

	// Loop through the distance dict to find the relevant keys associated to these distances
	for (key in distance_dict) {
		if (distance_dict[key] == max_distance) {
			max_distance_activity = key;
		}
		if (distance_dict[key] == min_distance) {
			min_distance_activity = key;
		}
	}

	// Use week dict to find which day had more covered distance
	max_distance_day_number = Math.max(week_dict['weekdays'], week_dict['weekends']);
	let max_distance_day;
	if (week_dict['weekdays'] == max_distance_day_number) {
		max_distance_day = 'weekdays';
	}
	else {
		max_distance_day = 'weekends';
	}

	// 2.1.1
	// Display all the different types of activities
	document.getElementById('numberActivities').innerText = num_activities;

	// 2.1.2
	// Display the top 3 activities
	document.getElementById('firstMost').innerText = top1_activity;
	document.getElementById('secondMost').innerText = top2_activity;
	document.getElementById('thirdMost').innerText = top3_activity;

	// 2.1.3
	// Display the activity with most and least distance
	document.getElementById('longestActivityType').innerText = max_distance_activity;
	document.getElementById('shortestActivityType').innerText = min_distance_activity;

	// 2.1.4
	// Display the type of day (weekend/weekday) where more distance was covered
	document.getElementById('weekdayOrWeekendLonger').innerText = max_distance_day;



	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v5.json",
		"description": "A graph of the number of Tweets containing each type of activity.",
		"data": {
			"values": tweet_array
		}
		//TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, { actions: false });

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});