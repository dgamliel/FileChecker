import { React, useState} from "react";
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

const classFromClickedState = (defaultState, clickedState, clicked) => {
    return clicked === true ? clickedState : defaultState;
}

const bgFromSeverity = (severity) => {
    return severity === undefined || severity === null ? '' : severity;
}

const Result = (props) => {

    const [clicked, setClicked] = useState(false);
    const handleClick = (e) => {
        setClicked(!clicked);
    }



    console.log(`Props are ${JSON.stringify(props)}`);

    const {file,index, severity, issues} = props.info;

    console.log(`Info passed in ${JSON.stringify(props.info, null, 2)}`);
    return (
        <>
            {/* <div style={center}>
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
            </div> */}

            <div className={classFromClickedState("custom-box", "custom-box expanded", clicked)} 
             onClick={handleClick}
            >
                <h3 className="box-header">{file}</h3>
                <div className={classFromClickedState("box-body", "box-body expanded", clicked)}>
                    <div style={{textAlign: 'center'}}>
                        Severity &mdash; 
                        <span className={bgFromSeverity(severity)}>{capitalizeFirstLetter(severity)}</span>
                    </div>
                    <ul style={{marginTop: '5px'}}>
                        <li>
                            Byte Offset &mdash; <code>{index}</code>
                        </li>
                        <li>
                            <a href={issues}>{file}</a> Security Issues
                        </li>
                    </ul>
                        
                </div>
            </div>
        </>
    );
}

export default Result;