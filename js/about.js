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
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});