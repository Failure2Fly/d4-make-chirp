document.querySelector('#loginButton').addEventListener('click', login);

function login() {
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;

    fetch('https://warm-woodland-79592.herokuapp.com/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            username_email: email,
            password: password,
        })

    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // console.log(response);

            if (response.api_token) {
                // Saves any string into a named spot within your browser for the current domain.
                sessionStorage.setItem('token', response.api_token);
                location.href = 'chirps.html';
                // console.log(response.api_token)
            }
            else {
                alert('There was an error. Check out your console.');
                // console.log(r esponse);
            }
        })
}