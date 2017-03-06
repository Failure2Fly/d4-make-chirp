getUsers();

function getUsers() {
    var token = sessionStorage.getItem('token');
    var email = sessionStorage.getItem('email');

    fetch('https://chirpyapp.herokuapp.com/messages_index', {
        // Method is set as a post. 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            api_token: token,
        })
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);
    })
}

function renderUsersList(users) {
    console.log(users)

    users.forEach(function(user) {
        var userMessage = `<div token="${user.api_token}" class="chirpies col-sm-8">
                    <img class="avatar" src="${user.avatar_url}">
                    <section>
                        <div class="message-box">
                        <div class="info-row">
                            <h4>${user.name}</h4>
                            <button type="button" class="btn btn-info">
                                <span id="follow" data-id="${user.id}"  class="glyphicon                             glyphicon-plus"                 aria-hidden="true"></span>                                    Follow
                            </button>
                        </div>
                        <div class="message-row">
                            <h5>${user.messages.body}</h5>
                            <h6 class="date">3.3.17 12:12pm</h6>
                        </div>
                        </div>
                    </section>
                </div>`;

        document.querySelector('#posts').innerHTML += userMessage;
    });
}



fetch('https://chirpyapp.herokuapp.com/follow/:user_id'), {

    }
