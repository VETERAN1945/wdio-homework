class FooterPage {
    get twitterLink()  { return $('[data-test="social-twitter"]'); }
    get facebookLink() { return $('[data-test="social-facebook"]'); }
    get linkedinLink() { return $('[data-test="social-linkedin"]'); }
}

module.exports = new FooterPage();