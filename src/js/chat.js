const ChatEngineCore = require('chat-engine');

const ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-9b914983-9487-4be5-a0e4-0c27a20e6572',
  subscribeKey: 'sub-c-acc8e784-cd70-11e8-b02a-a6a8b6327be1',
});


let myChat;
let me;
const newPerson = 'Vova';

const getMsgDate = () => {
  const dateMsg = new Date();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${dateMsg.getHours()}:${dateMsg.getMinutes()}
|  ${monthNames[dateMsg.getMonth()]} ${dateMsg.getDay()}`;
};

const meTemplate = (text, time) => `
          <div class="outgoing_msg">
            <div class="sent_msg">
              <p>${text}</p>
              <span class="time_date">${time}</span>
            </div>
          </div>`;

const userTemplate = (text, time, user) => `
          <div class="incoming_msg">
            <div class="incoming_msg_img">
              <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
            </div>
            <div class="received_msg">
              <div class="received_withd_msg">
                <p><span>${user}<br></span>${text}</p>
                <span class="time_date">${time}</span>
              </div>
            </div>
          </div>`;

const peopleTemplate = person => `
          <div class="chat_list">
            <div class="chat_people">
              <div class="chat_img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
              </div>
              <div class="chat_ib">
                <span>${person}</span>
              </div>
            </div>
          </div>`;

// const joinRoom = () => {
//   $('#login').on('submit', (event) => {
//     newPerson = $('#userName').val();
//   });
//
// window.location.replace(`Chat.html?uuid=${newPerson}`);
// };

// send a message to the Chat
const sendMessage = () => {
  // get the message text from the text input
  const message = $('#message-to-send').val().trim();

  // if the message isn't empty
  if (message.length) {
    // emit the `message` event to everyone in the Chat
    myChat.emit('message', {
      text: message,
    });

    // clear out the text input
    $('#message-to-send').val('');
  }

  // stop form submit from bubbling
  return false;
};


// scroll to the bottom of the window
const scrollToBottom = () => {
  $('.msg_history').scrollTop($('.msg_history')[0].scrollHeight);
};

// render messages in the list
const renderMessage = (message, isHistory = false) => {
  // use the generic user template by default
  let template = userTemplate;

  if (message.sender === me) {
    template = meTemplate;
  }
  const el = template({
    text: message.data.text,
    time: getMsgDate(),
    user: newPerson,
  });

  // render the message
  if (isHistory) {
    $('.msg_history ul').prepend();
  } else {
    $('.msg_history ul').append(el);
  }

  // scroll to the bottom of the chat
  scrollToBottom();
};

const init = () => {
  ChatEngine.connect(newPerson);
  ChatEngine.on('$.ready', (data) => {
    me = data.me; // eslint-disable-line
    myChat = new ChatEngine.Chat('myChat');
    myChat.on('message', (message) => {
      // renderMessage(message);
      console.log(message);
    });
  });
};

// // this is our main function that starts our chat app
// const init = () => {
//   // connect to ChatEngine with our generated user
//   ChatEngine.connect(newPerson);
//
//   // when ChatEngine is booted, it returns your new User as `data.me`
//   ChatEngine.on('$.ready', (data) => {
//     // store my new user as `me`
//     me = data.me; // eslint-disable-line
//     // create a new ChatEngine Chat
//     myChat = new ChatEngine.Chat('myChat');
//     console.log(data.user);
//     // when we recieve messages in this chat, render them
//     myChat.on('message', (message) => {
//       renderMessage(message);
//     });
//     // when a user comes online, render them in the online list
//     myChat.on('$.online.*', () => {
//       $('#people-list ul').append(peopleTemplate(`${data.user} qwerttttttty`));
//     });
//
//     // when a user goes offline, remove them from the online list
//     myChat.on('$.offline.*', () => {
//       $('#people-list ul').find(`#${data.user.uuid}`).remove();
//     });
//
//     // wait for our chat to be connected to the internet
//     myChat.on('$.connected', () => {
//       // search for 50 old `message` events
//       myChat.search({
//         event: 'message',
//         limit: 50,
//       }).on('message', () => {
//         console.log(data);
//
//         // when messages are returned, render them like normal messages
//         renderMessage(data, true);
//       });
//     });
//
//     // bind our "send" button and return key to send message
//     $('#sendMessage').on('submit', sendMessage);
//   });
// };

// joinRoom();
// boot the app
init();
