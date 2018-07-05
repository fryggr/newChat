import React, {Component} from "react";
import "./PersonList.css";
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
import { Person } from "../Person/Person"

export class PersonList extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        const onPersonView = this.props.onView;
        return (
            <Col s={4} className="grid-example">
                <Collection>
                {
                    this.props.persons.map(el =>
                        <Person key={el.id} name={el.name} image={el.img} onView={onPersonView.bind(null, el)}/>
                    )
                }
                {
                /*
                <CollectionItem className="Chat__list Chat__list_active" href="#!">
                    <img src={svidetel} className="Chat__list-usericon" />
                    <span>Svidetel</span>
                    <Badge>1</Badge>
                </CollectionItem>
                */
            }
            </Collection>
        </Col>

        )
    }
}
