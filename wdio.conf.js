exports.config = {
    runner: 'local',
    specs: ['./test/specs/**/*.spec.js'],
    exclude: [],
    maxInstances: 1,
    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': {
            args: [
                '--disable-password-leak-detection',
                '--disable-save-password-bubble',
                '--no-default-browser-check',
                '--disable-features=PasswordCheck',
                '--disable-popup-blocking'
            ],
            prefs: {
                'credentials_enable_service': false,
                'profile.password_manager_enabled': false,
                'profile.password_manager_leak_detection': false,
                'profile.default_content_setting_values.popups': 1
            }
        }
    }],
    logLevel: 'error',
    bail: 0,
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'mocha',
    reporters: ['spec'],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    }
};