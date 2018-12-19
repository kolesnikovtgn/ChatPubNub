const ChatEngineCore = require('chat-engine');

const ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-9b914983-9487-4be5-a0e4-0c27a20e6572',
  subscribeKey: 'sub-c-acc8e784-cd70-11e8-b02a-a6a8b6327be1',
});

let myChat;
let me;
const sourceLanguage = 'en';
const targetLanguage = 'es';

const getMsgDate = () => {
  const dateMsg = new Date();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${dateMsg.getHours()}:${dateMsg.getMinutes()}
          | ${monthNames[dateMsg.getMonth()]} ${dateMsg.getDay()}`;
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
          <div class="person">
            <div class="person__container">
              <div class="person__img">
                <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">
              </div>
              <div class="person__name">
                <span>${person}</span>
              </div>
            </div>
          </div>`;

const joinRoom = () => {
  $('#login').on('submit', (e) => {
    e.preventDefault();
    const newPerson = $('#userName').val();
    if (newPerson) {
      window.location.replace(`Chat.html?uuid=${newPerson}`);
    }
  });
};

const scrollToBottom = () => {
  $('.chatbox__messages-history').scrollTop($('.chatbox__messages-history')[0].scrollHeight);
};

const sendMessage = () => {
  const message = $('#messageToSend').val().trim();
  if (message.length) {
    myChat.emit('message', {
      text: message,
      translate: {
        text: message,
        source: sourceLanguage,
        target: targetLanguage,
      },
    });
    $('#messageToSend').val('');
  }
  return false;
};

const renderMessage = (message, isHistory = false) => {
  let template = userTemplate;
  if (message.sender.uuid === me.uuid) {
    template = meTemplate;
  }
  const el = template(message.data.text, getMsgDate(), message.sender.uuid);
  if (isHistory) {
    $('.chatbox__messages-history ul').prepend(el);
  } else {
    $('.chatbox__messages-history ul').append(el);
  }
  scrollToBottom();
};

const init = () => {
  const username = window.location.search.substring(1).split('=')[1];
  ChatEngine.connect(username);
  ChatEngine.on('$.ready', (data) => {
    me = data.me; // eslint-disable-line
    myChat = new ChatEngine.Chat('chatpubnub');
    myChat.on('$.online.*', (data1) => {
      $('#people-list ul').append(peopleTemplate(data1.user.uuid));
    });
    myChat.on('$.offline.*', (data2) => {
      $('#people-list ul').find(`#${data2.user.uuid}`).remove();
    });
    myChat.on('message', (message) => {
      renderMessage(message);
    });
    myChat.on('$.connected', () => {
      myChat.search({
        event: 'message',
        limit: 50,
      }).on('message', (data3) => {
        renderMessage(data3, true);
      });
    });
    $('#sendMessage').on('submit', sendMessage);
  });
};

$(document).ready(() => {
  joinRoom();
  init();
});
