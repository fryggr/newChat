import React from "react";
import {Col} from "react-materialize";
import {ChatMessage} from "./../ChatMessage/ChatMessage.js";

export const ChatBody = props => {
    let findMessages = [];
    console.log(props.activeRoom.roomId);
    props.messages.forEach(messages => {
        // console.log(messages.roomId);
        if(messages.roomId === props.activeRoom.roomId || messages.roomId === props.myId){
            findMessages = messages.messages.slice();
        // }
            // messages.messages.forEach(message => {
            //     if(props.activeRoom.roomId === message.userId){
            //         console.log(message);
            //         findMessages.push(message);
            //     }
            // })
        }
    })
    return (
        <Col s={12} className="Chat__messages">
            {
                findMessages.map((message, index) => {
                    return(
                        <ChatMessage
                            message={message.userMessage}
                            name={message.userName}
                            img={message.userImg}
                            key={index}
                        />
                    )
                })
            }
        </Col>
    )
}
