document.querySelector('#signupButton').addEventListener('click', signup);

// if (location.href.includes('logout')) {
//     document.querySelector('#loggedout').innerHTML = '<div class="alert alert-warning text-center">Logged out successfully.</div>';
// }

function signup() {
    var name = document.querySelector('#name').value;
    var email = document.querySelector('#email').value;
    var password = document.querySelector('#password').value;
    var avatar = document.querySelector('#avatar').value;

    fetch('https://ef3e3b94.ngrok.io/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        
        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            name: name,
            username_email: email,
            password: password,
            avatar_url: avatar,
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
                console.log(response);
            }
        })
}