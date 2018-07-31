import React, { Component } from "react";

export class ChatMessages extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>{this.props.message}</div>
        )
    }
}
