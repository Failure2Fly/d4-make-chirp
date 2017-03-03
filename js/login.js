document.querySelector('#loginButton').addEventListener('click', login);

function login() {
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;

    fetch('https://ef3e3b94.ngrok.io/login', {
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

            if (response.token) {
                // Saves any string into a named spot within your browser for the current domain.
                sessionStorage.setItem('token', response.token);
                location.href = 'users.html';
            }
            else {
                alert('There was an error. Check out your console.');
                // console.log(r esponse);
            }
        })
}