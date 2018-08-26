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
