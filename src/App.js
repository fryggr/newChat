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

class App extends Component {

    constructor(props){
        super(props)

        this.state = {
            persons: [],
            activeRoom:
                {
                    roomId: "",
                    roomImg: "http://placehold.it/50x50/26a69a/ffffff.jpg&text=G",
                    roomName: "General"
                }
            ,
            messages: [],
            openChat: 0,
            myPerson: {
                myId: "",
                myName: "",
                myImg: ""
            }
        };

        this.chatBody = React.createRef();
        this.chatInput = React.createRef();
        this.myConnect = 0;

        // this.socket = io('37.1.218.55:3000');
        this.socket = io('http://localhost:3000');

        // Event when user sending or receiving the message

        this.socket.on('chat message', (message, userId, name, img, receiverId, receiverImg, receiverName) => {
            this.addMessage(message, userId, name, img, receiverId, receiverImg, receiverName);
         });

        // Event when user connected to the server

        this.socket.on('user connected', (activeUsers, numberOfUsers, userId, name, img) => {
            this.myConnect++;
           this.numberOfUsers = numberOfUsers;
           if(this.myConnect === 1){
               this.state.myPerson.myId = userId;
               this.state.myPerson.myName = name;
               this.state.myPerson.myImg = img;
           }
           this.setState({persons: activeUsers})
         });

        // Event when user disconnected from the server

        this.socket.on('user disconnected', (activeUsers, numberOfUsers) => {
           this.numberOfUsers = numberOfUsers;
           this.setState({persons: activeUsers})
         });

        // Binding

        this.onPersonView = this.onPersonView.bind(this);
        this.addMessage = this.addMessage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
    }

    // When user choose the room or private dialog with other user

    onPersonView(room) {
        this.state.openChat = 1;
        this.setState({ activeRoom: room }, ()=>{console.log(room);})
    }

    // A method that adds a new message to room or other user

    addMessage(message, userId, name, img, receiverId, receiverImg, receiverName) {
        console.log(this.state.myPerson.myId);
        let newMessage = {
            userMessage: message,
            userId: userId,
            userName: name,
            userImg: img
        }
        let newRoom = {
            roomId: receiverId,
            roomName: receiverName,
            roomImg: receiverImg,
            messages: [
                newMessage
            ]
        }
        console.log("newRoom: ", newRoom);

        // messages: [
            // {
                // roomId: "",
                // roomName: "",
                // roomImg: "",
                // messages: [
                //     {
                //         userMessage: "",
                //         userId: "",
                //         userName: "",
                //         userImg: ""
                //     }
                // ]
            // }
        // ]
        let messages = [];
        let rooms = this.state.messages.slice();
        let findRoom = 0;

        if (this.state.messages.length === 0){
            rooms.push(newRoom);
            this.setState({ messages: rooms });
        }
        else {
            let room = [];

            this.state.messages.forEach((item, index) =>{
                // console.log("this.state.messages: ", item);
                if (item.roomId === receiverId){
                    // room = item.slice();
                    // messages = item.messages.slice();
                    // messages.push(newMessage);
                    item.messages.push(newMessage);
                    rooms = this.state.messages.slice();
                    // rooms.push(item);
                    findRoom = 1;
                    this.setState({messages: rooms });
                }
            })
            if(findRoom === 0){
                rooms.push(newRoom);
                this.setState({ messages: rooms });
            }
        }


        console.log(this.state.messages);
        userId === this.state.myPerson.myId ? this.chatInput.current.value = '' : "";
        const chatMessages = document.querySelector('.Chat__messages');
        // chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Method that add message when user press Enter

    handleKeyPress(e) {
        if (e.charCode === 13) {
          this.sendMessage()
        }
    }

    // Method that causes an event that sends a message to the server

    sendMessage(){
        if(this.chatInput.current.value !== ''){
            this.socket.emit('chat message', this.chatInput.current.value, this.state.myPerson.myId, this.state.myPerson.myName, this.state.myPerson.myImg, this.state.activeRoom.roomId, this.state.activeRoom.roomImg, this.state.activeRoom.roomName);
        }
    }


    render() {
        return (
            [
            <nav className="light-blue lighten-1" role="navigation">
                <div className="nav-wrapper container">
                    <a id="logo-container" href="#" className="brand-logo">MyChat</a>
                </div>
            </nav>,
            <div className="App container Chat" >
                <Row>
                    <PersonList persons={this.state.persons} onView={this.onPersonView} userId={this.state.myPerson.myId} roomId="General"/>
                    <Col s={8} m={8} xl={6} l={8} className="grid-example Chat__body-wrap">
                        <div className="Chat__body row" >
                            {this.state.openChat === 0 ?
                                <div className="Chat__body-wrapper Chat__body-wrapper_preview">
                                    <Row className='center'>
                                        <Col s={12}>
                                          <Icon className="grey" large>forum</Icon>
                                          <p className="Chat__text-prev">
                                              {
                                                  this.numberOfUsers < 2 || this.numberOfUsers === undefined ? "Sorry, there are currently no users online." : "Choose the chat to start messaging."
                                              }</p>
                                        </Col>
                                    </Row>
                                </div> :
                                <div className="Chat__body-wrapper">
                                    <ChatHeader onPersonView={this.state.activeRoom} />
                                    <ChatBody messages={this.state.messages} activeRoom={this.state.activeRoom} myId={this.state.myPerson.myId}/>
                                    <Col s={12} className="Chat__input">
                                        <Col s={11} className="input-field">
                                            <input s={11} id="first_name" type="text" ref={this.chatInput} onKeyPress={this.handleKeyPress}/>
                                            <label htmlFor="first_name">Type message...</label>
                                        </Col>
                                        <i className="small material-icons Chat__icon-send" onClick={this.sendMessage} >
                                            send
                                        </i>
                                    </Col>
                                </div>
                            }
                        </div>
                    </Col>
                </Row>

            </div>,
            <footer className="page-footer orange">
                <div className="footer-copyright">
                  <div className="container">
                  Made by <a className="orange-text text-lighten-3" href="#">Daria Smirnova</a>
                  </div>
                </div>
              </footer>
        ]
        );
    }
}

export default App;
