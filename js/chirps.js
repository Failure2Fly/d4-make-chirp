var user;
var response = '';

document.querySelector('#logout').addEventListener('click', function() {
    sessionStorage.clear();
    location.href = 'login.html';
    // sessionStorage.removeItem('token');
        if (location.href.includes('#logout')) {
        document.querySelector('.fa-window-close-o').innerHTML = '<div class="alert alert-warning text-center">Logged out successfully.</div>';
        api_token = "";
        }
});

// document.querySelector('#users').addEventListener('click', function(e) {
//     var userListItem = e.target;
//     var userId = userListItem.dataset.id;

//     location.href = 'chirps.html?user_id=' + userId;
//     console.log(userId)
// });


document.querySelector('#sendMessage').addEventListener('click', sendMessage);

document.querySelector('#message').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    var message = document.querySelector('#message').value;
    var token = sessionStorage.getItem('token');

    document.querySelector('#message').value = '';

    fetch('https://chirpyapp.herokuapp.com/message', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        // Back-end controls the left side, properties, of this object
        // Front-end controls the variables names and values on the right side
        body: JSON.stringify({
            body: message,
            api_token: token
        }),
    })
        .then(function(response) {
            return response.json();
        })
        .then(function(response) {


            var messageSent = document.querySelector('#message');
            messageSent.classList.remove('hidden');

        });
}

getMessages();

function getMessages() {
    var token = sessionStorage.getItem('token');

    fetch('https://chirpyapp.herokuapp.com/user_list?api_token=' + token) 
    .then(function(response) {
        return response.json();
    })
    .then(function(response) {
        renderUsersList(response);
    })
        // method: 'GET',
        // headers: {
        //     'Content-Type': 'application/json'
        // },
        // body: JSON.stringify({
        //     api_token: token,
        // })

    
    // .then(function(response) {
    //     return response.json();
    // })
    // .then(function(response) {
    //     renderUsersList(response);
    // })
    // clearStorage();
}


// function clearStorage() {
//     sessionStorage.removeItem('email');
// };


function renderMessagesList(messages) {
    console.log(messages)
    users.forEach(function(messages) {
        console.log(messages)
        var userMessage = `<div class="chirpies col-sm-8">
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
    })
//     var me = user.messages
//     console.log(me)
//    me.forEach(function(message){
//             var jeff = `<div class="message-row">
//                             <h5>${message}</h5>
//                             <h6 class="date">3.3.17 12:12pm</h6>
//                         </div>`
//             document.querySelector('#posts').innerHTML += me;
//         })
}
