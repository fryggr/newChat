import React, { Component } from "react";
import "./App.css";
import {
    Button,
    Icon,
    Row,
    Col,
    CollectionItem,
    Badge,
    Input
} from "react-materialize";
import { PersonList } from "./PersonList/PersonList.js";
import { ChatHeader } from "./ChatHeader/ChatHeader.js";
import { ChatBody } from "./ChatBody/ChatBody.js";
import load from './load';
// import chat from './chat';

import anton from "./Person/img/anton.jpg";
import svidetel from "./Person/img/ava.png";
import kot from "./Person/img/kot.jpg";
import poehavshiy from "./Person/img/poehavshiy.jpg";
import removekebab from "./Person/img/remove-kebab.png";

let PERSONS = [
    {
        "id": 0,
        "name": "Svidetel",
        "messages":[],
        "img": svidetel
    },
    {
        "id": 1,
        "name": "Anton Uralskiy",
        "messages":[],
        "img": anton
    },
    {
        "id": 2,
        "name": "Kot",
        "messages":[],
        "img": kot
    },
    {
        "id": 3,
        "name": "Remove Kebab",
        "messages":[],
        "img": removekebab
    },
    {
        "id": 4,
        "name": "Poehavshiy",
        "messages":[
            {
                message: 'olololo'
            }
        ],
        "img": poehavshiy
    }
];

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            person: PERSONS,
            messages: [
                {
                    message:"Hello!"
                }
            ] };

        this.chatBodyPrev = React.createRef();
        this.chatBody = React.createRef();
        this.chatInput = React.createRef();

        this.content = React.createRef();

        this.socket = new WebSocket("ws://localhost:8081");

        this.onPersonView = this.onPersonView.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.getMessage = this.getMessage.bind(this);
    }

    onPersonView(person) {
        this.person = person;
        // console.log(person);
        this.chatBody.current.classList.remove("hidden");
        this.chatBodyPrev.current.classList.add("hidden");
        this.setState({ person: person })
    }

    addMessage() {
        let newMessage = {message: this.chatInput.current.value}
        // this.state.messages.push(this.chatInput.current.value);
        let messages = this.state.messages.slice();
        messages.push(newMessage);
        // console.log(this.person.id);
        // console.log(this.state.person.messages);
        this.setState({ messages: messages });
        this.chatInput.current.value = '';
        const chatMessages = document.querySelector('.Chat__messages');
        chatMessages.scrollTo(0, chatMessages.getBoundingClientRect().bottom);

        // document.querySelectorAll('[for="first_name"]')[0].classList.remove('active');
    }

    handleKeyPress(e) {
        if (e.charCode === 13) {
          this.addMessage()
        }
    }

    sendMessage(){
        this.socket.send(this.chatInput.current.value);
        this.getMessage();
    }

    getMessage(){
        let messages = this.state.messages.slice();
        this.socket.onmessage = function(event) {
            var incomingMessage = event.data;
            console.log(incomingMessage);
            let newMessage = {message: incomingMessage};
            messages.push(newMessage);

        };
        this.setState({ messages: messages });
    }

    render() {
        console.log(this.state.messages);
        return (
            <div className="App container Chat">
                <Row>
                    <PersonList persons={PERSONS} onView={this.onPersonView}/>
                    <Col s={8} className="grid-example">
                        <div className="Chat__body row" >
                            <div className="Chat__body-wrapper Chat__body-wrapper_preview" ref={this.chatBodyPrev}>
                                <Row className='center'>
                                    <Col s={12}>
                                      <Icon className="grey" large>forum</Icon>
                                      <p className="Chat__text-prev">Select a chat!</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className="Chat__body-wrapper hidden" ref={this.chatBody}>
                                <ChatHeader onPersonView={this.state.person} />
                                <ChatBody messages={this.state.messages} />
                                <Col s={12} className="Chat__input">
                                    <Col s={11} className="input-field">
                                        <input s={11} id="first_name" type="text" ref={this.chatInput} onKeyPress={this.handleKeyPress} defaultValue="Hello!"/>
                                        <label htmlFor="first_name">Type message...</label>
                                    </Col>
                                    <i className="material-icons Chat__icon-send" onClick={this.sendMessage} >
                                        send
                                    </i>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div id="content" ref={this.content}></div>

            </div>
        );
    }
}

export default App;
