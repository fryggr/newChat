import React from "react";
import "./Person.css";
import {CollectionItem, Badge} from "react-materialize";

export const Person = props => {
    return (
        <CollectionItem className="Chat__list " href="#!" onClick={props.onView}>
            <img src={props.image} className="Chat__list-usericon" alt="user-icon"/>
            <div className="Chat__list-info">
                <span>{props.name}</span>
                <Badge className="Chat__list__badge">{props.id}</Badge>
                <div className="Chat__list-wrapper disabled"></div>
            </div>
        </CollectionItem >
    )
}
