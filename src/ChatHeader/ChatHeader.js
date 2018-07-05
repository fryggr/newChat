import React, {Component} from "react";
import {
    Button,
    Icon,
    Row,
    Col,
    Collection,
    CollectionItem,
    Badge,
    Input
} from "react-materialize";

export class ChatHeader extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.onPersonView);
        return (
            <Col s={12} className="Chat__header">
                <div className="Chat__header-icon">
                    <img src={this.props.onPersonView.image} alt="img" className="Chat__avatar"/>
                </div>
                <div className="Chat__header-username"><b>{this.props.onPersonView.name}</b></div>
            </Col>
        )
    }
}
