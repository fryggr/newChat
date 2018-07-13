import React, {Component} from "react";
import {ChatMessage} from "./../ChatMessage/ChatMessage.js";

export class ChatBody extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return (
            this.props.addMessage.map(message => {
                <ChatMessage>
                    {message}
                </ChatMessage>
            })
        )
    }
}
