import { React, useEffect, useState } from 'react';
import { Jumbotron , Button, Form, Container, Spinner } from 'react-bootstrap';
import Result from './components/results';
import env from "react-dotenv";
import './App.css';

const App = () => {


  const [fetchResponse, setContent] = useState(null);
  const [fileName, setFileName]     = useState("Upload your file");
  const [selectedFile, setFile]     = useState(null);
  const [loading, setLoading]       = useState(false);
  const [resInfo, setResInfo]       = useState([]);
  const [detected, setDetected]     = useState(null);

  const displayNone = {display: 'none'};
  const center      = {display: 'flex', justifyContent: 'center'};

  const sendFile = () => {
    if (!selectedFile){
      setContent('No file attached!');
      return;
    }

    const formData = new FormData();
    formData.append('upload', selectedFile, fileName);

		console.log(`Sending info to ${env.API_URL}/upload`);

    setLoading(true);
    fetch(`${env.API_URL}/upload`, {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(res => {
      setResInfo(res);
      setLoading(false);

      var wasDetected = res.length > 0;
      setDetected(wasDetected);
    })
    .catch(err => console.error(err));
  }

  const selectFile = (e) => {
    setFile(e.target.files[0])
    setFileName(e.target.files[0].name);
  }

  return (
    <>

      <Container>
        <h1>File Analyzer</h1>
        <Form style={loading === true ? displayNone : {}}>
          <Form.File 
              id="custom-file"
              label={fileName}
              name="upload"
              onChange={(e) => selectFile(e)}
              custom
            />
        </Form>

        <div style={loading === true ? center : displayNone }>
          <Spinner variant="light" animation="border"/>
        </div>
        
      </Container>

      <Container>
        <div style={{display: 'flex', justifyContent: 'center', marginTop: '15px'}}>
          <Button onClick={sendFile}>Analyze file</Button>
        </div>
      </Container>

      <Container>
        <h3 className={detected === false ? 'nothing-found' : 'none'}>
          No files found, you're all good! {detected}
        </h3>
      </Container>


      {resInfo.map( (info, i) => <Result key={i} info={info}/>)}
      
      <Container style={{marginTop: '40px'}}
       className={detected === true ? '' : 'none'}
      >
        <h3>
          What are embedded files? 
        </h3>
        <hr className="light"/>
        <div className="box">
          Embedded files are files that can be injected into other, seemingly harmless files.
          This technique is largely used by malware to sneak seemingly innocuous files by firewalls to deliver a payload.
          Normally the payload is some compressed malicious file(s), which can be extremely hard to detect.
        </div>
      </Container>

      <Container style={{marginTop: '40px'}}
       className={detected === true ? '' : 'none'}
      >
        <h3 style={{textAlign: 'right '}}>
          I found some embedded files, is my life over? 
        </h3>
        <hr className="light"/>
        <div className="box">
          The reality of this solution is that there are bound to be many more false positives than there are true positives.
          The nature of malware detection is an arduous game of cat and mouse, and this solution only means to provide security analysts
          and researches a jumping off point for some much deeper analysis.
        </div>
      </Container>
    </>
  );
}

export default App;
