## Shopping cart demo

Demo app with using React, Redux, React-dnd (drag and drop), Immutable.js. With unit tests using Chai adn Mocha and e2e test using Nightwatch and Selenium.

###Install

    npm install

###Get production build

    1) npm run build
    2) check build in folder "/public"
    
###Run application on localhost

    1) check that port 8090 is available
    2) npm run start
    3) in browser go to http://localhost:8090
	
###Run unit tests

    1) npm run test
	
###Run e2e tests (checked on Windows 7 with Chrome browser)

    1) npm run start:test to make build and start node server (keep server working)
	2) npm run selenium:chrome (keep server working)
	3) npm run test:e2e

###Try it online

http://apaniuta.github.io/cart