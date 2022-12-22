const loginForm = document.querySelector('#welcome-form');
const messagesSection = document.querySelector('#messages-section');
const messagesList = document.querySelector('#messages-list');
const addMessageForm = document.querySelector('#add-messages-form');
const userNameInput = document.querySelector('#username');
const messageContentInput = document.querySelector('#message-content');

let username = '';

loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    login(e);
});

function login(e) {
    e.preventDefault();
    if (userNameInput.value.length === 0) {
        alert('Enter your username');
    } else {
        username = userNameInput.value;
        loginForm.classList.remove('show');
        messagesSection.classList.add('show');
    }
}

addMessageForm.addEventListener('submit', function(e) {
    e.preventDefault();
    sendMessage(e);
});

function sendMessage(e) {
    e.preventDefault();
    if (messageContentInput.value.length === 0) {
        alert('Enter your message');
    } else {
        addMessage(username, messageContentInput.value);
        messageContentInput.value = '';
    }
}

function addMessage(author, message) {
    const messageContentHtml = document.createElement('div');
    messageContentHtml.classList.add('message__content');
    messageContentHtml.textContent = message;
    
    const messageAuthorHtml = document.createElement('h3');
    messageAuthorHtml.classList.add('message__author');
    messageAuthorHtml.textContent = username === author ? 'You' : author;

    const messageHtml = document.createElement('li');
    messageHtml.classList.add('message');
    messageHtml.classList.add('message--received');
    if(author === username) messageHtml.classList.add('message--self');
    messageHtml.append(messageAuthorHtml, messageContentHtml);

    messagesList.appendChild(messageHtml);
}