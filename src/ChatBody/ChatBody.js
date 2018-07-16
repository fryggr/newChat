import React, {Component} from "react";
import {
    Button,
    Icon,
    Row,
    Col,
    CollectionItem,
    Badge,
    Input
} from "react-materialize";
import {ChatMessage} from "./../ChatMessage/ChatMessage.js";

export class ChatBody extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Col s={12} className="Chat__messages">
                {
                    this.props.addMessage.map(el =>
                        <ChatMessage
                            newMessage={el}
                        />
                    )
                }
            </Col>
        )
    }
}
