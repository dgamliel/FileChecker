import React from "react";
import { Card } from "react-bootstrap";
import './results.css';

const center = {
    display: 'flex', 
    justifyContent: 'center',
    marginTop: "10px",
};

const cardWidth = {
    width: '18rem'
}

const getBorder = (severity) => {
    switch(severity){
        case "high":
            return "danger";
        case "medium":
            return "warning";
        case "low":
            return "success";
        default:
            return "info";
    }
}

const capitalizeFirstLetter = (inStr) => {
    return inStr.charAt(0).toUpperCase() + inStr.slice(1);
}

const Result = (props) => {
    console.log(`Props are ${JSON.stringify(props)}`);

    const {file,index, severity, issues} = props.info;

    console.log(`Info passed in ${JSON.stringify(props.info, null, 2)}`);
    return (
        <div style={center}>
            <Card border={getBorder(severity)} style={cardWidth}>
                <Card.Header>{file}</Card.Header>
                <Card.Body >
                    <Card.Title>Severity: {capitalizeFirstLetter(severity)}</Card.Title>
                    <Card.Text>Byte Offset: <code>{index}</code></Card.Text>

                    <Card.Link href={issues}>
                    {file} security issues
                    </Card.Link>
                </Card.Body>

            </Card>
        </div>
    );
}

export default Result;