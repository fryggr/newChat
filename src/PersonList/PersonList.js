import React from "react";
import "./PersonList.css";
import {Col, Collection} from "react-materialize";
import { Person } from "../Person/Person"

export const PersonList = props => {

    const onPersonView = props.onView;
    return (
        <Col s={4} className="grid-example">
            <Collection>
            {
                props.persons.map(el =>
                    <Person key={el.id} name={el.name} image={el.img} onView={onPersonView.bind(null, el)}/>
                )
            }
            {
            /*
            <CollectionItem className="Chat__list " href="#!">
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
