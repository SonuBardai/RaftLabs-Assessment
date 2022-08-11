import { useEffect, useState } from "react";
import "./separation.css";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

var initialPeople: string[] = [
    "Alice",
    "Bob",
    "Clark",
    "Dave",
    "Ellie",
    "Flash",
    "Geo",
];

var initialRelations: string[][] = [
    ["Alice", "Bob"],
    ["Alice", "Dave"],
    ["Bob", "Dave"],
    ["Bob", "Clark"],
    ["Clark", "Dave"],
    ["Alice", "Ellie"],
    ["Ellie", "Flash"],
    ["Flash", "Dave"],
    ["Flash", "Geo"],
    ["Geo", "Dave"],
];

// Creating a Graph Structure
const hash = new Map();

const addPerson = (person: string) => {
    // Creating Nodes(People) in the graph
    hash.set(person, []);
};

initialPeople.forEach((person) => {
    addPerson(person);
});

const addRelation = (p1: string, p2: string) => {
    // Connecting nodes(People) with edges(Relations)
    hash.get(p1).push(p2);
    hash.get(p2).push(p1);
};

initialRelations.forEach((relation) => {
    addRelation(relation[0], relation[1]);
});

const Separation = () => {
    const [people, setPeople] = useState<Array<string>>(initialPeople);

    useEffect(() => {
        const initPeople: string[] = JSON.parse(
            localStorage.getItem("people") || "{}"
        );
        const initRelations: string[][] = JSON.parse(
            localStorage.getItem("relations") || "{}"
        );
        if (initPeople.length > 0 || initRelations.length > 0) {
            setPeople(initPeople);
            initPeople.forEach((person) => {
                addPerson(person);
            });
            initRelations.forEach((relation) => {
                addRelation(relation[0], relation[1]);
            });
        } else {
            localStorage.setItem("people", JSON.stringify(initialPeople));
            localStorage.setItem("relations", JSON.stringify(initialRelations));
        }
    }, [initialPeople, initialRelations]);

    const [checkedFriends, setCheckedFriends] = useState(
        new Array(initialPeople.length).fill(false)
    );
    const [newPerson, setNewPerson] = useState<string>("");
    const [person1, setPerson1] = useState<string>("select");
    const [person2, setPerson2] = useState<string>("select");

    const [relationStrings, setRelationStrings] = useState<Array<string>>([]);

    const onChangeCheckBox = (index: number) => {
        const updatedCheckedFriends = checkedFriends.map((friend, i) =>
            i === index ? !friend : friend
        );
        setCheckedFriends(updatedCheckedFriends);
    };

    const handleSubmit = () => {
        if (!newPerson) return;

        setPeople([...people, newPerson]);
        addPerson(newPerson);
        for (var i: number = 0; i < people.length; i++) {
            if (checkedFriends[i]) {
                addRelation(people[i], newPerson);
            }
        }
        setNewPerson("");

        var initPeople: string[] = JSON.parse(
            localStorage.getItem("people") || "{}"
        );
        initPeople.push(newPerson);
        localStorage.setItem("people", JSON.stringify(initPeople));

        var initRelations: string[][] = JSON.parse(
            localStorage.getItem("relations") || "{}"
        );
        for (var i: number = 0; i < people.length; i++) {
            if (checkedFriends[i]) {
                initRelations.push([newPerson, people[i]]);
            }
        }
        localStorage.setItem("relations", JSON.stringify(initRelations));

        setCheckedFriends(new Array(people.length).fill(false));
    };

    const handlePerson1 = (person: string) => {
        setRelationStrings([]);
        setPerson1(person);
    };

    const handlePerson2 = (person: string) => {
        setRelationStrings([]);
        setPerson2(person);
    };

    const displayRelation = () => {
        findRelation(person1, person2, [person1], []);
        if (relationStrings.length === 0) {
            setRelationStrings(["These people are not related :("]);
        }
    };

    const findRelation = (
        p1: string,
        p2: string,
        curPath: string[],
        visited: string[]
    ) => {
        // This function finds all the relation between person-1 and person-2 using DFS

        const curPer: string = curPath[curPath.length - 1]!;

        if (p1 == p2) {
            visited.push(p2);
            if (visited.length <= 6) {
                setRelationStrings([...relationStrings, visited.join(" > ")]);
                console.log(
                    "Curr: ",
                    relationStrings.push(visited.join(" > "))
                );
            }
            visited.pop();
            return;
        }

        const rels: string[] = hash.get(curPer);
        visited.push(curPer);

        for (const rel of rels) {
            if (!visited.includes(rel)) {
                curPath.push(rel);
                findRelation(rel, p2, curPath, visited);
            }
        }

        visited.pop();
    };

    return (
        <>
            <Container className="separationContainer">
                <Accordion className="accordionElement">
                    <div className="innerContainer">
                        <Accordion.Item eventKey="0" className="accordionItem">
                            <Accordion.Header>Add a Person</Accordion.Header>
                            <Accordion.Body>
                                <div className="addPersonContainer">
                                    <div>Add Person</div>
                                    <input
                                        type="text"
                                        className="personInput"
                                        value={newPerson}
                                        placeholder="Enter the name of the new person"
                                        onChange={(e) =>
                                            setNewPerson(e.target.value)
                                        }
                                    />
                                    <div>
                                        Select the people that this person is
                                        friends with:
                                        {people.map((person, i) => (
                                            <div
                                                key={i}
                                                className="checkBoxItem"
                                            >
                                                <Form.Check
                                                    name={person}
                                                    id={person}
                                                    checked={checkedFriends[i]}
                                                    onChange={() =>
                                                        onChangeCheckBox(i)
                                                    }
                                                    className="checkBox"
                                                />
                                                <label
                                                    htmlFor={person}
                                                    className="personName"
                                                >
                                                    {person},
                                                </label>
                                                {hash.get(person).length > 0 ? (
                                                    <span>
                                                        <span>
                                                            who is Friends with{" "}
                                                        </span>
                                                        <span>
                                                            {hash
                                                                .get(person)
                                                                .join(", ")}
                                                        </span>
                                                    </span>
                                                ) : (
                                                    <span>
                                                        who has no friends :(
                                                    </span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={handleSubmit}
                                        variant="dark"
                                    >
                                        Submit
                                    </Button>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>

                        <Accordion.Item eventKey="1" className="accordionItem">
                            <Accordion.Header>
                                Find the relation between two people
                            </Accordion.Header>
                            <Accordion.Body>
                                <div className="getRelationContainer">
                                    <span>Get Relation between:</span>
                                    <div className="relationPeopleInput">
                                        <label htmlFor="person-2">
                                            Select Person 1
                                        </label>

                                        <select
                                            name="person-1"
                                            id="person-1"
                                            value={person1}
                                            onChange={(e) =>
                                                handlePerson1(e.target.value)
                                            }
                                            className="selectInput"
                                        >
                                            <option value="select" disabled>
                                                Select Person 1
                                            </option>
                                            {people.map((person, i) => (
                                                <option value={person} key={i}>
                                                    {person}
                                                </option>
                                            ))}
                                        </select>

                                        <label htmlFor="person-2">
                                            Select Person 2
                                        </label>

                                        <select
                                            name="person-2"
                                            id="person-2"
                                            value={person2}
                                            onChange={(e) =>
                                                handlePerson2(e.target.value)
                                            }
                                            className="selectInput"
                                        >
                                            <option value="select" disabled>
                                                Select Person 2
                                            </option>
                                            {people.map((person, i) => (
                                                <option value={person} key={i}>
                                                    {person}
                                                </option>
                                            ))}
                                        </select>

                                        <Button
                                            onClick={displayRelation}
                                            variant="dark"
                                            className="my-3"
                                        >
                                            Get Relation
                                        </Button>

                                        <div>
                                            <div>
                                                {relationStrings.length > 0 && (
                                                    <div>
                                                        <span>
                                                            The relations
                                                            between {person1}{" "}
                                                            and {person2} are:{" "}
                                                        </span>
                                                        {
                                                            <div>
                                                                {relationStrings.map(
                                                                    (
                                                                        rel,
                                                                        i
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                i
                                                                            }
                                                                        >
                                                                            {
                                                                                rel
                                                                            }
                                                                        </div>
                                                                    )
                                                                )}
                                                            </div>
                                                        }
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </div>
                </Accordion>
                <div className="details">
                    This application has the following features:
                    <ul className="detailsList">
                        <li>
                            <span>&#8640; </span>
                            It lets you insert people's names and who they're
                            friends with.
                        </li>
                        <li>
                            <span>&#8640; </span>It stores this data in the
                            localStorage.
                        </li>
                        <li>
                            <span>&#8640; </span>
                            We then generate a graph with people as nodes and
                            their relations as edges. This is an undirected
                            cyclic graph.
                        </li>
                        <li>
                            <span>&#8640; </span>
                            Using Depth First Search we traverse this graph and
                            find the Degrees of Separation between any two
                            people.
                        </li>
                    </ul>
                </div>
            </Container>
        </>
    );
};

export default Separation;
