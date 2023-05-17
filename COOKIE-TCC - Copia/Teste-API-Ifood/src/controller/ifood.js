const request = require('request');

const link = (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://merchant-api.ifood.com.br/authentication/v1.0/oauth/userCode',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        form: { clientId: '33609c45-a199-43f6-a475-60634abc28e5' }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        console.log(body);
    });
}


module.exports = {
    link
}