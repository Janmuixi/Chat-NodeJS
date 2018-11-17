$(function () {

    const socket = io();

    // getting elements from DOM / interface
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#chat');

    // getting elements from DOM / nickname
    const $nickForm = $('#nickForm');
    const $nickName = $('#nickName');
    const $nickError = $('#nickError');

    const $users = $("#usernames");

    $nickForm.submit (e => {
        e.preventDefault();
        socket.emit('new user', $nickName.val(), data => {
            if (data) {
                $('#nickWrap').hide();
                $('#contentWrap').show();
            } else {
                $nickError.html(`
                    <div class="alert alert-danger">
                        That username already exists
                    </div>
                `);
            }
            $nickName.val('');
        })
    });
    // events
    $messageForm.submit ( e => {
        e.preventDefault();
        socket.emit('send message', $messageBox.val());
        $messageBox.val("");

    })

    socket.on('new message', function (data) {
        $chat.append('<b>' + data.nick + '</b> ' + data.msg + '<br/>');
    })

    socket.on('usernames', data => {
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += `<p><i class="fas fa-user"></i> ${data[i]}</p>`
        }
        $users.html(html);
    });
});