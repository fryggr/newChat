import React from "react";
import {Col} from "react-materialize";
import {ChatMessage} from "./../ChatMessage/ChatMessage.js";

export const ChatBody = props => {
    return (
        <Col s={12} className="Chat__messages">
            {
                props.messages.map(item => {
                    return(
                        <ChatMessage
                            message={item.message}
                        />
                    )
                })
            }
        </Col>
    )
}
