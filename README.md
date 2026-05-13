# SauceDemo WebdriverIO Automation

## Setup
npm install

## Run all tests
npm test

## Run specific test
npm run test:login
npm run test:logout
npm run test:cart
npm run test:sorting
npm run test:footer
npm run test:checkout

## Tech stack
- WebdriverIO v8
- Mocha
- ChromeDriver
- Page Object Pattern

## Test cases
- TC-1: Valid Login
- TC-2: Login with invalid password
- TC-3: Login with locked out user
- TC-4: Logout
- TC-5: Cart persistence after re-login
- TC-6: Sorting (4 options)
- TC-7: Footer social links
- TC-8: Valid Checkout
- TC-9: Checkout without products
