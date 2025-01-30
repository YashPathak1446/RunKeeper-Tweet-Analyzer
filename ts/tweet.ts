class Tweet {
    private text: string;
    time: Date;

    constructor(tweet_text: string, tweet_time: string) {
        this.text = tweet_text;
        this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
    }

    //returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source(): string {
        // starts with "Just completed" OR "Just posted" -> 'completed_event' (95% +- 5%)
        if (this.text.startsWith("Just completed") || this.text.startsWith("Just posted")) {
            return "completed_event";
        }
        // starts with "Watch my" OR includes #RKLive-> 'live_event'
        else if (this.text.startsWith("Watch my") || this.text.includes('#RKLive')) {
            return "live_event";
        }
        // starts with "Achieved" OR includes Achieved OR endsWith #FitnessAlerts-> 'achievement'
        else if (this.text.startsWith("Achieved") || this.text.includes("ACHIEVED") || this.text.endsWith("#FitnessAlerts")) {
            return "achievement";
        }
        // else: 'miscellaneous'
        else {
            return "miscellaneous";
        }

    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written(): boolean {
        // Check if the tweet ends with the string "Check it out!"
        // If so, it is not written
        if (this.writtenText.endsWith("Check it out!")) {
            return false;
        }
        // Otherwise, it's written by a user.
        return true;
    }

    get writtenText(): string {
        // First strip the #RunKeeper at the end, as well as the link that starts with https://
        const index = this.text.indexOf("https://");
        // create new string that removes the hashtag and hyperlink
        const new_string = this.text.substring(0, index);

        // Next, check strip the additional whitespace on the right:
        const tweet_text = new_string.trim()

        // return the tweet
        return tweet_text;
    }

    get activityType(): string {
        // Only for completed tweets determine the activity type
        // The format for completed tweets seems to be like:
        // Just completed/posted a {distance} {unit} {activity} with @Runkeeper.
        // Check it out! {link} #Runkeeper"
        if (this.source == 'completed_event') {
            // The units are either km (4301) or mi (3946) as per skimming the tweets.
            // so the activity is right after that!

            // Use .split to convert string to array and search for activity
            // split on whitespace
            const tweet = this.text.split(" ");
            for (let i = 0; i < tweet.length; i++) {
                // Check if the current index is pointing to the unit
                // This code skips time duration activities like yoga
                if (tweet[i] == "km" || tweet[i] == "mi") {
                    let activity;
                    // Check for mountain bike activities, motorsport freestyle, chair ride, nordic walk, or circuit walk

                    if (tweet[i + 1] == "mtn" || tweet[i + 1] == "MySports" || tweet[i + 1] == "chair" || tweet[i + 1] == "nordic" || tweet[i + 1] == "circuit") {
                        activity = tweet[i + 1] + " " + tweet[i + 2];
                    }
                    else {
                        activity = tweet[i + 1];
                    }
                    return activity;
                }
            }
        }
        // Otherwise return empty
        return "";
    }

    get distance(): number {
        if (this.source == 'completed_event') {
            const tweet = this.text.split(" ");
            // This code skips time duration activities like yoga
            for (let i = 0; i < tweet.length; i++) {
                if (tweet[i] == "mi") {
                    let distance = parseFloat(tweet[i - 1]);
                    return distance;
                }
                // Check if the current index is pointing to km. 
                // If so convert it to mi (1mi = 1.609km)
                if (tweet[i] == "km") {
                    let distance = parseFloat(tweet[i - 1]);
                    let distance_miles = distance / 1.609;
                    return distance_miles;
                }
            }
        }
        // Otherwise return 0
        return 0;
    }

    getHTMLTableRow(rowNumber: number): string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}