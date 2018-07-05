import React, {Component} from "react";
import "./Person.css";
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

export class Person extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <CollectionItem className="Chat__list" href="#!" onClick={this.props.onView}>
                <img src={this.props.image} className="Chat__list-usericon" />
                <span>{this.props.name}</span>
            </CollectionItem >
        )
    }
}
