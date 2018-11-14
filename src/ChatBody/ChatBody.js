import React from "react";
import {Col} from "react-materialize";
import {ChatMessage} from "./../ChatMessage/ChatMessage.js";

export const ChatBody = props => {
    return (
        <Col s={12} className="Chat__messages">
            {
                props.messages.map((item,index) => {
                    (item.roomId === props.activeRoom.roomId) ?
                        <ChatMessage
                            message={item.messages.userMessage}
                            name={item.messages.userName}
                            img={item.messages.userImg}
                            key={index}
                        />
                    : ""
                })
            }
        </Col>
    )
}
