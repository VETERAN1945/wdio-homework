const credentials = {
    validUser: {
        username: 'standard_user',
        password: 'secret_sauce'
    },
    lockedUser: {
        username: 'locked_out_user',
        password: 'secret_sauce'
    },
    invalidUser: {
        username: 'standard_user',
        password: 'any_random_value'
    }
};

const checkoutData = {
    firstName: 'John',
    lastName: 'Doe',
    postalCode: '12345'
};

const urls = {
    inventory: '/inventory.html',
    cart: '/cart.html',
    checkoutStepOne: '/checkout-step-one.html',
    checkoutStepTwo: '/checkout-step-two.html',
    checkoutComplete: '/checkout-complete.html'
};

const errorMessages = {
    invalidPassword: 'Username and password do not match any user in this service',
    lockedUser: 'Sorry, this user has been locked out',
    completeHeader: 'Thank you for your order'
};

module.exports = { credentials, checkoutData, urls, errorMessages };