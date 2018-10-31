import React from "react";
import "./Person.css";
import {CollectionItem, Badge} from "react-materialize";

export const Person = props => {
    return (
        <CollectionItem className="Chat__list " href="#!" onClick={props.onView}>
            <img src={props.image} className="Chat__list-usericon" />
            <span>{props.name}</span>
            <Badge className="Chat__list__badge">online</Badge>
            <div className="Chat__list-wrapper disabled"></div>
        </CollectionItem >
    )
}
