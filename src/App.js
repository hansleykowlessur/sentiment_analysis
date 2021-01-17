import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';



function App() {
  const [value, setValue] = React.useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [currentTime, setCurrentTime] = useState(0);

  const [userInput, setUserInput] = useState("");
  const [finalText, setFinalText] = useState('');
  const [allEmotion, setEmotion] = useState({user: {neg: 0, pos:0, neu:0, compound:0}});
  const onSubmit = (e)=> {
    console.log(e)
    e.preventDefault();
    setFinalText(userInput);

    const data = { user: userInput};
    fetch('http://localhost:5000/time', {
      method :'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(res => res.json()).then(res => setEmotion(res));


    (async () => {
      const incomingdata = await fetch("http://localhost:5000/time")
        .then(res => res.json() )
        .catch(e => e );
      console.log(incomingdata);
      setCurrentTime(incomingdata.time);
    })();
  }

  useEffect(() => {
      fetch('http://localhost:5000/time').then(res => {return res.json();}).then(data => {
        setCurrentTime(data.time);
      });
    }, []);

  return (
    <div className="App">
      <CssBaseline />
      <Container maxWidth="sm">
        <Grid container spacing={3}>
          <Grid item xs={12}/>

          <Grid alignItems="center"  direction='column' alignContent='center' justify="center" item xs={12} >
          <form onSubmit={onSubmit} method='GET'>
          <Grid container spacing={3}>
              <Grid item xs={12}>
              <TextField
                id="outlined-multiline-static"
                label="Type your text"
                multiline
                rows={8}
                variant="outlined"
                value={userInput}
                onChange={(e)=>(setUserInput(e.target.value))}   />
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" color="primary" type='submit'>
              Primary
              </Button>
              </Grid>
          </Grid>


          </form>
          </Grid>

          <Grid item xs={12}>

          </Grid>
          <Grid item xs={12}>
          <Paper>
          Negative emotion
          <LinearProgress color='secondary' variant="determinate" value={allEmotion.user.neg * 100} />
          </Paper>
          </Grid>
          <Grid item xs={12}>
          <Paper>
          Positive emotion
          <LinearProgress color='primary' variant="determinate" value={allEmotion.user.pos * 100} />
          </Paper>
          </Grid>
          <Grid item xs={12}>
          <Paper>
          Neutral emotion
          <LinearProgress color='secondary' variant="determinate" value={allEmotion.user.neu * 100} />
          </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
