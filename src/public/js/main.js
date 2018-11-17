$(function () {

    const socket = io();

    // getting elements from DOM
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    // events
    $messageForm.submit ( e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val());
        $messageBox.val("");

    })

    socket.on('new message', function (data) {
        $chat.append(data + '<br/>')
    })
});