document.querySelector('#logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'login.html';
    // sessionStorage.removeItem('token');
        if (location.href.includes('Logout')) {
        document.querySelector('.fa-window-close-o').innerHTML = '<div class="alert alert-warning text-center">Logged out successfully.</div>';
        api_token = "";
        }
});

// document.querySelector('#users').addEventListener('click', function(e) {
//     var userListItem = e.target;
//     var userId = userListItem.dataset.id;

//     location.href = 'chirps.html?user_id=' + userId;
// });

document.querySelector('#logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'login.html?logout=yes';
    sessionStorage.removeItem('token');
});

document.querySelector('#sendMessage').addEventListener('click', sendMessage);

document.querySelector('#message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
})


getUsers();

function getUsers() {
    var token = sessionStorage.getItem('token');

    fetch('https://warm-woodland-79592.herokuapp.com/messages_index', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);
    })
}

function renderUsersList(users) {
    console.log(users);

    users.forEach(function(user) {
        var userMessage = `<div class="chirpies col-sm-8">
                    <img class="avatar" src="${avatar_url}">
                    <section>
                        <div class="message-box">
                            <div class="info-row">
                            <h4>${username_email}/h4>
                            <button type="button" class="btn btn-info">
                                <span class="glyphicon                        glyphicon-plus"                             aria-hidden="true"></span>                     Follow
                            </button>
                        </div>
                        <div class="message-row">
                            <h5>${message} + '.'</h5>
                            <h6 class="date">3.3.17 12:12pm</h6>
                        </div>
                        </div>
                    </section>
                </div>`
        
        // `<li data-id="${user.id}" class="list-group-item">${user.username}</li>`;

        document.querySelector('#posts').innerHTML += userMessage;
    });
}

function sendMessage() {
    var message = document.querySelector('#message').value;
    var token = sessionStorage.getItem('token');

    document.querySelector('#message').value = '';

    fetch('https://warm-woodland-79592.herokuapp.com/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            body: message,
            api_token: token
        })
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {
            // console.log(response);

            var messageSent = document.querySelector('#message');
            messageSent.classList.remove('hidden');

        })
}