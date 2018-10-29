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
        "messages":[],
        "img": poehavshiy
    }
];

class App extends Component {

    constructor(props){
        super(props)

        this.state = { person: PERSONS, messages: [] };

        this.chatBodyPrev = React.createRef();
        this.chatBody = React.createRef();
        this.chatInput = React.createRef();

        this.onPersonView = this.onPersonView.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    onPersonView(person) {
        this.person = person;
        // console.log(person);
        this.chatBody.current.classList.remove("hidden");
        this.chatBodyPrev.current.classList.add("hidden");
        this.setState({ person: person })
    }

    addMessage() {
        // this.state.messages.push(this.chatInput.current.value);
        this.state.person.messages.push(this.chatInput.current.value);
        console.log(this.person.id);
        console.log(this.state.person.messages);
        // this.setState({ person.messages: this.state.person.messages });
        this.chatInput.current.value = '';
        const chatMessages = document.querySelector('.Chat__messages');
        chatMessages.scrollTo(0, chatMessages.getBoundingClientRect().bottom);
        // document.querySelectorAll('[for="first_name"]')[0].classList.remove('active');
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
          this.addMessage()
        }
    }

    render() {
        console.log(this.state.person);
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
                                <ChatBody addMessage={this.state.person.messages} />
                                <Col s={12} className="Chat__input">
                                    <Col s={11} className="input-field">
                                        <input s={11} id="first_name" type="text" ref={this.chatInput} onKeyPress={this.handleKeyPress} />
                                        <label htmlFor="first_name">Type message...</label>
                                    </Col>
                                    <i className="material-icons Chat__icon-send" onClick={this.addMessage} >
                                        send
                                    </i>
                                </Col>
                            </div>
                        </div>
                    </Col>
                </Row>


            </div>
        );
    }
}

export default App;
