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
        console.log('this is person.js')
        // const imageUrl = this.props.image;
        return (
            <div className="Chat__list" href="#!">
                <img src="" className="Chat__list-usericon" />
                <span>this.props.name</span>
            </div>
        )
    }
}
