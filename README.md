# ReactMaps Project
This is a single page application featuring a map of neighborhood.

# App Functionality
Functionality of this map including highlighted locations, third-party data about
those locations and various ways to browse the content.

# How to run

Clone or download this git repository

$ git clone ...

Go into the application folder

$ cd ...

Install dependencies

$ npm install
$ npm install semantic-ui-react
$ npm install semantic-ui-css



Run the application

$ npm start

This will open a new browser tab with the application running.

In case you run into Refs Must Have Owner warning please refer to the following guidance
https://reactjs.org/warnings/refs-must-have-owner.html
to make sure you don't have multiple copies of React which may cause this warning/behavior

# How I did it
0. Have Google API key ready.

1. From https://www.npmjs.com/package/google-maps-react:  install the library:

in terminal run $ npm install --save google-maps-react

2. Create project using create-react-app, install dependencies.

3. Write "skeleton".

4. Build App and components.

5. Add data from third-party API FourSquare.

   You need to be registered and have your client ID and secret key.

6. Error handling.

7. Accessibility.

Add tabIndex, aria-labels, roles.

8. Responsiveness.

Applied media screen.

Styling using "semantic-ui-css": "^2.3.3", "semantic-ui-react": "^0.82.1".

9. Service Worker.

By default, the create-react-app includes a service worker in the production build.
It's recommended that you do not enable an offline-first service worker in a
development environment.
If you need to test your offline-first service worker locally, build the application
(using npm run build) and run a simple http server from your build directory.

10. References.

//https://medium.com/@eighteen0seven/writing-a-google-maps-react-component-fae411588a91
//https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple

//https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
//https://developer.foursquare.com/docs/api/venues/details

//https://api.foursquare.com/v2/venues/search?ll=47.587,-122.1391&client_id=4LAFMCX0K4YV1VVJHPOIVDJKB0QHIZ2AFC1UHMBLN0H3FXIL&client_secret=CYDR4WDTUW4WQ0XG0ZDYTNH0GH4A5YAI0BRUBVVQRAYA5HZ5&v=20180725
//https://api.foursquare.com/v2/venues/4ac23711f964a520399820e3?client_id=4LAFMCX0K4YV1VVJHPOIVDJKB0QHIZ2AFC1UHMBLN0H3FXIL&client_secret=CYDR4WDTUW4WQ0XG0ZDYTNH0GH4A5YAI0BRUBVVQRAYA5HZ5&v=20180725

//https://stackoverflow.com/questions/40104350/react-js-is-domcontentloaded-equal-with-componentdidmount

//https://developers.google.com/web/ilt/pwa/working-with-the-fetch-api

Refs Must Have Owner Warning:
//https://reactjs.org/warnings/refs-must-have-owner.html
Multiple copies of React: Bower does a good job of deduplicating dependencies, but npm does not. If you aren’t doing anything (fancy) with refs, there is a good chance that the problem is not with your refs, but rather an issue with having multiple copies of React loaded into your project. Sometimes, when you pull in a third-party module via npm, you will get a duplicate copy of the dependency library, and this can create problems.
If you are using npm… npm ls or npm ls react might help illuminate.
