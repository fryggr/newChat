import React from "react";
import "./PersonList.css";
import {Col, Collection, CollectionItem} from "react-materialize";
import { Person } from "../Person/Person"

export const PersonList = props => {

    const onPersonView = props.onView;
    return (
        <Col s={2} m={2} xl={3} l={4} className="grid-example Person__list">
            <Collection>
            {
                [
                    <CollectionItem className="Chat__list " href="#!" >
                        <img src="http://placehold.it/50x50/26a69a/ffffff.jpg&text=G" className="Chat__list-usericon" alt="user-icon"/>
                        <div className="Chat__list-info">
                            <span>{props.roomId}</span>
                            <div className="Chat__list-wrapper disabled"></div>
                        </div>
                    </CollectionItem >,
                    props.persons.map(el =>
                        <Person
                            key={el.key}
                            id={
                                el.key === props.userId ? "you" : "online"
                            }
                            name={el.name}
                            image={el.img}
                            onView={onPersonView.bind(null, el)}
                        />
                    )
                ]
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
