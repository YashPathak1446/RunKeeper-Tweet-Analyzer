function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;

	const options = {
		// weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	// Part 1.1
	// Calculate earliest and latest dates amongst all tweets
	// Map the time of the tweets corresponding to every tweet in the tweet array
	const dates = tweet_array.map(tweet => tweet.time);
	// Find the min and the max date possible of each tweet.
	const earliest_date = new Date(Math.min(...dates));
	const latest_date = new Date(Math.max(...dates));

	// Replace the hardcoded values inside the html id and use the tolocalDateString to format it better
	document.getElementById('firstDate').innerText = earliest_date.toLocaleDateString("en-US", options);
	document.getElementById('lastDate').innerText = latest_date.toLocaleDateString("en-US", options);


	// Part 1.2
	// First create a object to map tweets with the categories:
	const tweet_categories = {
		completed_event: 0,
		live_event: 0,
		achievement: 0,
		miscellaneous: 0,
	};

	// Debug statement to check correct indexing/output access by class tag
	console.log(document.getElementsByClassName('liveEvents')[0].innerText);

	// Categorize each tweet. For that you need to loop through the tweets:
	tweet_array.forEach(tweet => {
		// Check if it is a completed event
		if (tweet.source == "completed_event") {
			tweet_categories.completed_event++;
		}
		// or a live event
		else if (tweet.source == "live_event") {
			tweet_categories.live_event++;
		}
		// or an achievement
		else if (tweet.source == "achievement") {
			tweet_categories.achievement++;
		}
		// or miscellaneous
		else if (tweet.source == "miscellaneous") {
			tweet_categories.miscellaneous++;
		}
	});

	// First set the value for completed
	let completedEventsElements = document.getElementsByClassName('completedEvents');
	for (let i = 0; i < completedEventsElements.length; i++) {
		completedEventsElements[i].innerText = tweet_categories.completed_event;
	}

	// Next set the value for live events
	// Use query selector if the appearance of the inner text is only once in the html
	document.querySelector('.liveEvents').innerText = tweet_categories.live_event;

	// Next set the value for achievements
	document.querySelector('.achievements').innerText = tweet_categories.achievement;

	// Next set the value for miscellaneous tweets
	document.querySelector('.miscellaneous').innerText = tweet_categories.miscellaneous;

	// Now calculate the percentages of the tweets out of the total tweets
	// Calculated the total number of tweets:
	const total_tweets = tweet_array.length;
	// First set the value for the percentage of completed events. 
	// Use math.format and 4 to get upto 2 decimal places when calculating the percentages
	document.querySelector('.completedEventsPct').innerText = math.format((tweet_categories.completed_event / total_tweets * 100), 4) + "%";
	// Next set value for percentage of live events
	document.querySelector('.liveEventsPct').innerText = math.format((tweet_categories.live_event / total_tweets * 100), 4) + "%";
	// Next set value for percentage of achievements
	document.querySelector('.achievementsPct').innerText = math.format((tweet_categories.achievement / total_tweets * 100), 2) + "%";
	// Set the value for percentage of miscellaneous
	document.querySelector('.miscellaneousPct').innerText = math.format((tweet_categories.miscellaneous / total_tweets * 100), 2) + "%";

}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});