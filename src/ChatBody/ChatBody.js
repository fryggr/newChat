import React, {Component} from "react";

export class ChatBody extends React.Component{
    render() {
        console.log(this.props.addMessage)
        return (
            <div>{this.props.addMessage}
            </div>
        )
    }
}
