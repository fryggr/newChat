import React from "react";
import {Col} from "react-materialize";
import {ChatMessage} from "./../ChatMessage/ChatMessage.js";

export const ChatBody = props => {
    let findMessages = [];
    props.messages.forEach(messages => {
        // if(messages.roomId === props.activeRoom.roomId){
            findMessages = messages.messages.slice();
        // }
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
