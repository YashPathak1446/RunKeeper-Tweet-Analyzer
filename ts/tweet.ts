class Tweet {
    private text: string;
    time: Date;

    constructor(tweet_text: string, tweet_time: string) {
        this.text = tweet_text;
        this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
    }

    // returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
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

    // returns a boolean, whether the text includes any content written by the person tweeting.
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
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        return "";
    }

    get distance(): number {
        if (this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        return 0;
    }

    getHTMLTableRow(rowNumber: number): string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        return "<tr></tr>";
    }
}