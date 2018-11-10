import React from "react";
import {Col} from "react-materialize";
import {ChatMessage} from "./../ChatMessage/ChatMessage.js";

export const ChatBody = props => {
    return (
        <Col s={12} className="Chat__messages">
            {
                props.messages.map((item,index) => {
                    return(
                        <ChatMessage
                            message={item.message}
                            name={item.name}
                            img={item.img}
                            idmessage={item.id}
                            key={index}
                            persons={props.persons}
                        />
                    )
                })
            }
        </Col>
    )
}
