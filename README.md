# Turntable Frontend News Platform

## Hosted Version

Go to https://www.turntablenews.com for the hosted version of this application.

## Quick Start guide

1. Clone the repo
1. Run `yarn` to install the project dependencies
1. Run `yarn start` to start the project.

Note that an .env file is missing from the github repository, namely missing environmental variables including the Google Analytics key, api keys for Google Firebase, and Facebook metadata.

## Key Components

- Bootstrap CSS - Sets up some initial theming with fonts, card design, button design.

- React - I used a lot of react libraries, but the most important one is probably "@brainhubeu/react-carousel ". It's the carousel that makes up the biggest visual component of the app, and has built-in swiping functionality for the articles, as well as the left / right navigation arrows. The app also includes "speak-tts" for slightly better compatibility across platforms for speech synthesis.

- Web-share - I learned that browser compatibility across mobile, desktop, chrome, android, ios for certain functionalities is terrible. Sharing is one of them. I ended up using the built-in navigator.share() for iOS and Mac browsers, and the "react-share" library as a fallback for everything else.
