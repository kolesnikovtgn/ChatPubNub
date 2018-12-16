// import ChatEngineCore from 'chat-engine';

//
// let myChat;
// let publish;
//
// // setup up PubNub API keys
// const ChatEngine = ChatEngineCore.create({
//   publishKey: 'pub-c-19708532-7bed-4525-ad4e-4e8fd36075fe',
//   subscribeKey: 'sub-c-950f47c6-ff8b-11e8-9231-4abfa1972993',
// });
//
// if (ChatEngine) { console.log(); } ;
// // Provide a unique id and other profile information for your user here.
// const uuid = String(new Date().getTime());
// ChatEngine.connect(uuid, {
//   nickName: 'Vladimir Kolesnikov',
//   favoriteColor: 'Red',
// });

// ChatEngine.on('$.ready', (data) => {
//   // store my user as me
//   const me = data.me;
//   console.log(data);
//   // create a new ChatEngine chat room
//   myChat = new ChatEngine.Chat('chat-engine-demo-room');
//   // connect to the chat room
//   myChat.on('$.connected', () => {
//     console.log('The chat is connected!');
//     // when we receive messages in this chat, render them
//     myChat.on('message', (message) => {
//       console.log('Incoming Message: ', message);
//     });
//     // send a message to everyone in the chat room
//     myChat.emit('message', {
//       text: 'Hi Everyone!',
//     });
//   });
// });
