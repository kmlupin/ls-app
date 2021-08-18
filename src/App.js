import './App.css';

import React, {useState} from 'react';
import { ButtonGroup, Typography, Button, TextField, Box, Grid, Paper } from '@material-ui/core';
import { withStyles, styled } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite'; 

import { getGeburtsOrt } from './search.js'
import { getGeburtsLand } from './search.js';
import { getBild } from './search.js';
import { getGeburtsDatum } from './search.js';
import { getBeruf } from './search.js';
import { getFName } from './search.js';
import { getLName } from './search.js';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const Zentrum = styled(Paper)(({ theme }) => ({  
  textAlign: 'left',  
}));

export function App() { 
  
  const [suchWert, setSuchWert] = useState("")
  const [geburtsDatum, setDatum] = useState("")
  const [geburtsLand, setGLand] = useState("")
  const [bild, setBild] = useState("")  
  const [geburtsOrt, setGOrt] = useState("") 
  const [beruf, setBeruf] = useState("") 
  const [fName, setFName] = useState("") 
  const [lName, setLName] = useState("") 

  function suche(){
    getGeburtsDatum(suchWert).then((value)=>{
      setDatum(value)          
      console.log(geburtsDatum)
    })   
    
    getGeburtsLand(suchWert).then((value)=>{      
        setGLand(value)
        console.log(geburtsLand)
    }) 

    getBild(suchWert).then((value)=>{
      setBild(value)      
      console.log(bild)
    })

    getGeburtsOrt(suchWert).then((value)=>{
      setGOrt(value)      
      console.log(geburtsOrt)
    })

    getBeruf(suchWert).then((value)=>{
      setBeruf(value)      
      console.log(beruf)
    })

    getFName(suchWert).then((value)=>{
      setFName(value)      
      console.log(fName)
    })

    getLName(suchWert).then((value)=>{
      setLName(value)      
      console.log(lName)
    })
  }  
  
  function textFeldchanged(val){
    setSuchWert(val.target.value)    
  } 
  

  return (
    <div className="App">
      <header className="App-header">       

        <Typography>
          Leichte Sprache THB          
        </Typography>      
 
      <Grid container spacing={1} style={{ margin: 20 }} justifyContent="center">
        <Grid item xs={10} md={6}>
          <TextField 
              id="sucheEingeben" 
              label="🔍 Suche eingeben" 
              variant="outlined" 
              onChange={textFeldchanged} 
              style={{ margin: 8 }} 
              placeholder="Suche nach einer Person. 🔍"
              fullWidth
          >    
          </TextField> 
        </Grid>

        <Grid item xs={10} md={2} >
          <Button         
            id="sucheStarten" 
            variant="contained" 
            color="primary" 
            style={{ margin: 8 }}
            size= "large"
            onClick={suche}            
            disableElevation          
          >
            Suche Starten
          </Button>          
        </Grid>
      </Grid>          

      <Grid container spacing={1} style={{ margin: 10 }} justifyContent="center">        
        <Grid item xs={10} md={6}>
          <Zentrum>
          <Box id="textA" component="span" display="block" p={1} m={1} bgcolor="background.paper">
           Ausgabe 1

          <h2>{fName} {lName} ist am {geburtsDatum} geboren.</h2>

          <h2>{fName} {lName} ist in {geburtsOrt} Geboren und das liegt in {geburtsLand} .</h2>

          <h2>Ihr Beruf ist {beruf}in.</h2>     

          </Box>
          </Zentrum>
        </Grid>

        <Grid item xs={10} md={2} >
          <Zentrum>
            <Box id="bildA" component="span" display="block" p={1} m={1} bgcolor="background.paper">
            Ausgabe 2 

            <img src={bild} alt="" height="390" width="270"/>                  
                    
            </Box>  
          </Zentrum>    
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ margin: 10 }} justifyContent="center">        
        <Grid item xs={8} md={6}>         
          <TextField         
            id="bewertungSchriftlich"
            label="✍ Bewertung"
            style={{ margin: 8 }}
            placeholder="Gib hier deine Bewertung zum Text ein. ✍"          
            fullWidth
            margin="normal"          
            variant="outlined"
            multiline        
          />   
        </Grid>

        <Grid item xs={8} md={2} >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="center"
          >    
            <Box id="bewertungHerz" component="fieldset" mb={3} borderColor="transparent">        
            <StyledRating
              name="customized-color"
              defaultValue={3}    
              icon={<FavoriteIcon fontSize="inherit" />}            
            />
            </Box>

            <Button 
              id="bewertungAbgeben" 
              variant="contained" 
              color="primary" 
              size= "large" 
              style={{ marginTop: 10}}              
            >
              Bewertung Abgeben
            </Button> 
          </Grid>                      
        </Grid>
      </Grid>               
              
      <ButtonGroup id="impB" variant="text" color="primary" aria-label="small outlined button group" size="small" style={{ margin: 100 }}>
        <Button href="#">
          Impressum
        </Button>

        <Button href="#">
          Infos Projekt
        </Button>
      </ButtonGroup>   

      </header>
    </div>
  );  
}
export default App;
