# RunKeeper Tweets Dashboard

## Overview
This project provides an interactive dashboard that analyzes and visualizes data from tweets shared by Runkeeper users. The dashboard categorizes tweets, displays activity statistics, and generates visualizations of tweet data, focusing on activities like running, cycling, and more. Users can filter and search through tweets, track the most common activities, and visualize distances covered on different days of the week.

## Features
- **Tweet Categorization**: Categorizes tweets based on predefined sources like completed events, live events, achievements, and miscellaneous.
- **Activity Analysis**: Analyzes the most frequent activities, distance covered, and the days when the most distance was covered.
- **Visualizations**: Generates interactive visualizations for activity counts and distances covered, including breakdowns by weekdays and weekends.
- **Search Functionality**: Provides a dynamic search bar to filter tweets based on user-provided text.
- **Interactive Dashboard**: Displays various statistics, such as the number of tweets, activities, and distances covered.

## Files

- ```about.js```: Handles the parsing and categorization of tweets based on their source (completed event, live event, achievement, miscellaneous).
- ```activities.js```: Parses tweets to determine activity types, distances, and calculates statistics related to activities and the days of the week.
- ```descriptions.js```: Provides the functionality to filter and search for written tweets and dynamically display results in a table.

## Installation
#### 1. Clone the repository
```git clone https://github.com/YashPathak1446/RunKeeper-Tweet-Analyzer.git```

#### 2. Open the project folder:
```cd {path-of-installation-directory}\RunKeeper-Tweet-Analyzer```

#### 3. Open ```index.html``` in your browser

## Usage
1. After loading the page, the dashboard will fetch and display tweets from the Runkeeper dataset.
2. The dashboard categorizes tweets and provides interactive charts for better understanding of the data.
3. Use the search bar to filter written tweets dynamically.
4. Visualizations of the activities and distances will automatically update based on the data.

## Visualizations

- **Activity Distributions**: A bar chart displaying the number of tweets per activity type.
- **Distance Distribution**: Visualizes the distance covered for each activity type on different days of the week.
- **Aggregated Distance**: Displays the average distance covered per activity type on each day of the week.

## Dependencies
- Vega-Lite for data visualizations. *(A JS API for creating Vega-Lite JSON specifications)*.
- Math.js for mathematical calculations and formatting. *(An extensive math library for JavaScript and Node.js.)*

## Project Structure
```
.
├── css/
│   └── style.css
|         
├── data/
│   └── saved_tweets.json
|
├── js/
│   ├── about.js
│   |
│   ├── activities.js
│   |
│   ├── descriptions.js
│   |
│   ├── get_saved_tweets.js
│   |
│   └── tweets.js
|
├── ts/
│   └── tweets.ts
|
├── activities.html
|
├── descriptions.html
|
├── inidex.html
|
└── tsconfig.json
