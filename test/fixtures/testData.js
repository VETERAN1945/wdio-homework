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

module.exports = { credentials, checkoutData };