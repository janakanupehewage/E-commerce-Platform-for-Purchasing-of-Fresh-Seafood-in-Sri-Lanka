const paypal = require("paypal-rest-sdk");

paypal.configure({
    mode : "sandbox",
    client_id : "AS8aCViNHy9eKazgp46LaLFn_2n3VoRnIRJNJaY99HIJUykKOovZrwopDbPlPsMXIDVvGg0Bkt-2zCvk",
    client_secret : "EEF0QEvHONCKOH-t1rYJ4FSk9p2uFWKurrVbzUD-cwcCcs87mIgDcLA4kA4xff_lGSw-3wvVeQnUvv_o"
});

module.exports = paypal;