import React, { Component } from "react";

export class ChatMessage extends React.Component{
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div> { this.props.children } </div>
        )
    }
}
