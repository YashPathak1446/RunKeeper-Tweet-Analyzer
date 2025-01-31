function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if (runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}


	// Convert tweet data into Tweet objects
	tweet_array = runkeeper_tweets.map(function (tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// Filter to only user-written tweets
	written_tweets = tweet_array.filter(tweet => tweet.written);

	console.log("Filtered User-Written Tweets:", written_tweets);
}

function addEventHandlerForSearch() {
	// Get necessary DOM elements
	const searchBox = document.getElementById("textFilter");
	const searchCount = document.getElementById("searchCount");
	const searchText = document.getElementById("searchText");
	const tweetTable = document.getElementById("tweetTable");

	function updateTable() {
		const query = searchBox.value.trim().toLowerCase();
		searchText.textContent = query || "???"; // Update displayed search query

		// Filter tweets based on search query
		const filteredTweets = written_tweets.filter(tweet =>
			tweet.writtenText.toLowerCase().includes(query)
		);

		searchCount.textContent = filteredTweets.length; // Update tweet count
		tweetTable.innerHTML = ""; // Clear previous results

		// Populate table with filtered tweets
		filteredTweets.forEach((tweet, index) => {
			const row = document.createElement("tr");
			row.innerHTML = tweet.getHTMLTableRow(index + 1);
			tweetTable.appendChild(row);
		});
	}

	// Add event listener to search box for dynamic filtering
	searchBox.addEventListener("input", updateTable);
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});