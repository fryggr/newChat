import React, { Component } from "react";
import "./App.css";
import {
    Icon,
    Row,
    Col
} from "react-materialize";
import { PersonList } from "./PersonList/PersonList.js";
import { ChatHeader } from "./ChatHeader/ChatHeader.js";
import { ChatBody } from "./ChatBody/ChatBody.js";

import io from 'socket.io-client';

// import anton from "./Person/img/anton.jpg";
// import svidetel from "./Person/img/ava.png";
// import kot from "./Person/img/kot.jpg";
// import poehavshiy from "./Person/img/poehavshiy.jpg";
// import removekebab from "./Person/img/remove-kebab.png";

// let PERSONS = [
//     {
//         "id": 0,
//         "name": "Svidetel",
//         "messages":[],
//         "img": svidetel
//     },
//     {
//         "id": 1,
//         "name": "Anton Uralskiy",
//         "messages":[],
//         "img": anton
//     },
//     {
//         "id": 2,
//         "name": "Kot",
//         "messages":[],
//         "img": kot
//     },
//     {
//         "id": 3,
//         "name": "Remove Kebab",
//         "messages":[],
//         "img": removekebab
//     },
//     {
//         "id": 4,
//         "name": "Poehavshiy",
//         "messages":[
//             {
//                 message: 'olololo'
//             }
//         ],
//         "img": poehavshiy
//     }
// ];

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            persons: [],
            activePerson: [],
            messages: []
        };

        this.chatBodyPrev = React.createRef();
        this.chatBody = React.createRef();
        this.chatInput = React.createRef();
        this.openChat = 0;
        this.firstUser = 0;

        this.socket = io('http://localhost:3000');


        // this.socket.on('chat message', (msg) => {
        //    this.addMessage(msg);
        //  });

        //  this.socket.on('message', function(data){
        //     console.log(data.message);
        // });


        this.socket.on('user connected', (activeUsers) => {
            console.log(activeUsers);
            this.setState({persons: activeUsers})
           // this.numberOfUsers = numberOfUsers;
            // this.getRandomUser();

         });
        //
        // this.socket.on('user disconnected', (numberOfUsers) => {
           // this.numberOfUsers = numberOfUsers;
           // this.deleteUser();
         // });
        //
        // this.socket.on('new user', (user) => {
        //    console.log(user);
        //    // let newPersons = this.state.persons.slice();
        //    // newPersons.push(user);
        //    // this.setState({persons: newPersons})
        //  });

        // Binding

        this.onPersonView = this.onPersonView.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        // this.getRandomUser = this.getRandomUser.bind(this);
        // this.deleteUser = this.deleteUser.bind(this);
    }

    onPersonView(person) {
        this.openChat = 1;
        console.log(person);
        // this.chatBody.current.classList.remove("hidden");
        // this.chatBodyPrev.current.classList.add("hidden");
        this.setState({ activePerson: person })
    }

    addMessage(message) {
        let newMessage = {message: message}
        let messages = this.state.messages.slice();
        messages.push(newMessage);
        this.setState({ messages: messages });
        this.chatInput.current.value = '';
        const chatMessages = document.querySelector('.Chat__messages');
        chatMessages.scrollTo(0, chatMessages.getBoundingClientRect().bottom);

        // document.querySelectorAll('[for="first_name"]')[0].classList.remove('active');
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
          this.sendMessage()
        }
    }

    sendMessage(){
        // if(this.chatInput.current.value !== '')
            // this.socket.emit('chat message', this.chatInput.current.value);
    }

    // getRandomUser(){
    //     function fetchJSONFile(path, callback) {
    //         var httpRequest = new XMLHttpRequest();
    //         httpRequest.onreadystatechange = function() {
    //             if (httpRequest.readyState === 4) {
    //                 if (httpRequest.status === 200) {
    //                     var data = JSON.parse(httpRequest.responseText);
    //                     if (callback) callback(data);
    //                 }
    //             }
    //         };
    //         httpRequest.open('GET', path);
    //         httpRequest.send();
    //     }
    //
    //     fetchJSONFile('https://randomuser.me/api/', (data) => {
    //         let newUser = {};
    //         newUser["key"] = Date.now();
    //         newUser["name"] = `${data.results[0].name.first} ${data.results[0].name.last}`;
    //         newUser["img"] = data.results[0].picture.thumbnail;
    //         // if(this.firstUser === 0){
    //         //     newUser["id"] = "you"
    //         //     this.firstUser = 1;
    //         // }
    //         // else newUser["id"] = "online"
    //         this.socket.emit('new user', newUser);
    //     });
    // }
    //
    // deleteUser(){
    //     let newPersons = this.state.persons.slice();
    //
    // }

    render() {
        return (
            <div className="App container Chat" onClick={()=>this.socket.emit('user connected')}>
                <Row>
                    <PersonList persons={this.state.persons} onView={this.onPersonView}/>
                    <Col s={8} className="grid-example">
                        <div className="Chat__body row" >
                            {
                                this.openChat === 0
                                ?
                                <div className="Chat__body-wrapper Chat__body-wrapper_preview">
                                    <Row className='center'>
                                        <Col s={12}>
                                          <Icon className="grey" large>forum</Icon>
                                          <p className="Chat__text-prev">
                                              {
                                                  this.numberOfUsers < 2 || this.numberOfUsers === undefined ? "Sorry, there are currently no users online." : "Choose the chat!"
                                              }</p>
                                        </Col>
                                    </Row>
                                </div>
                                :
                                <div className="Chat__body-wrapper">
                                    <ChatHeader onPersonView={this.state.activePerson} />
                                    <ChatBody messages={this.state.messages} />
                                    <Col s={12} className="Chat__input">
                                        <Col s={11} className="input-field">
                                            <input s={11} id="first_name" type="text" ref={this.chatInput} onKeyPress={this.handleKeyPress}/>
                                            <label htmlFor="first_name">Type message...</label>
                                        </Col>
                                        <i className="material-icons Chat__icon-send" onClick={this.sendMessage} >
                                            send
                                        </i>
                                    </Col>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>

            </div>
        );
    }
}

export default App;
