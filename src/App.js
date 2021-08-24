import './App.css';

import React, {useState} from 'react';
import { Typography, Box, Grid, Paper } from '@material-ui/core';
import {styled } from '@material-ui/core/styles';
import Suche from './Suche';
import Bewertung from './Berwertung';
import Info from './Info';

const Zentrum = styled(Paper)(({ theme }) => ({  
  textAlign: 'left',  
}));

export function App() { 
  
  const [geburtsDatum, setDatum] = useState("")
  const [geburtsLand, setGLand] = useState("")
  const [bild, setBild] = useState("")  
  const [geburtsOrt, setGOrt] = useState("") 
  const [beruf, setBeruf] = useState("") 
  const [fName, setFName] = useState("") 
  const [lName, setLName] = useState("") 
  const [type, setType] = useState("") 
  const [geschlecht, setGeschlecht] = useState("") 
  const [sterbeDatum, setSterbeDatum] = useState("") 
  const [sterbeOrt, setSterbeOrt] = useState("")
  const [sterbeLand, setSterbeLand] = useState("")
  const [wikiID, setWikiId] = useState("")
  const [todesUrsache, setTodesUrsache] = useState("")
  const [todesArt, setTodesArt] = useState("")
  const [vater, setVater] = useState("")
  
  let callback = (values) => { 
    setWikiId(values.wikiID)   
    setDatum(values.geburtsDatum);    
    setGLand(values.geburtsLand)
    setBild(values.bild)
    setGOrt(values.geburtsOrt)
    setBeruf(values.beruf)
    setFName(values.fName)
    setLName(values.lName)
    setType(values.type)
    setGeschlecht(values.geschlecht)
    setSterbeDatum(values.sterbeDatum)
    setSterbeOrt(values.sterbeOrt)
    setSterbeLand(values.sterbeLand)
    setTodesUrsache(values.todesUrsache)
    setTodesArt(values.todesArt)
    setVater(values.vater)
  }

  //Inhalte für die Ausgabe für Mensch
   
  let geburtsOrtAusgabe = "";
  let berufAusgabe ="";
  let todesOrtAusgeben ="";
  let todesUrsacheAusgeben="";
  let todesArtAusgeben="";
  let vaterAusgabe="";
  let bild1 = "";

  //Wenn Mensch
  if (type === "Mensch"){
    //Ausgabe GeburtsOrt
    if (geburtsDatum !== null){
      geburtsOrtAusgabe = <h3>{fName} {lName} ist am {geburtsDatum} in "{geburtsOrt}" geboren.<br /><br />
                              "{geburtsOrt}" ist ein Ort der in "{geburtsLand}" liegt.</h3>;              
    }
    //Ausgabe Beruf.
    if (beruf !== null){
      //Ausgabe Beruf weiblich
      if (geschlecht === "weiblich"){
        if(sterbeDatum === null){
          berufAusgabe = <h3>Sie Arbeitet als {beruf}in.</h3>
        }  
        //Ausgabe Beruf wenn weiblich und verstorben.  
        else {
          berufAusgabe = <h3>Sie hat als {beruf}in gearbeitet.</h3>
        }       
      }    
      //Ausgabe Beruf männlich  
      else if (geschlecht === "männlich"){        
        if(sterbeDatum === null){
          berufAusgabe = <h3>Er Arbeitet als {beruf}.</h3>
        }
        //Ausgabe Beruf wenn mänlich und verstorben.
        else{
          berufAusgabe = <h3>Er hat als {beruf} gearbeitet.</h3>
        }
      }
    }   
    //Ausgabe SterbeOrt
    if (sterbeDatum !== null && sterbeOrt !== null){
      todesOrtAusgeben = <h3>Am {sterbeDatum} ist {fName} {lName} in "{sterbeOrt}" gestorben.<br /><br />
                         "{sterbeOrt}" ist ein Ort der in "{sterbeLand}" liegt.</h3>; 
    }
    //Ausgabe des TodesGrundes und TodesArt
    if(todesArt !== null){
      if(geschlecht === "weiblich"){
        todesArtAusgeben = <h3>Sie ist an einem "{todesArt}" gestorben.</h3>        
      }
      else{
        todesArtAusgeben = <h3>Er ist an einem "{todesArt}" gestorben.</h3>        
      }

      if(todesUrsache !== null){          
          todesUrsacheAusgeben = <h3>Die genaue Todesursache war eine "{todesUrsache}".</h3>
      }      
    }    
    //Ausgabe der Eltern
    if(vater !== null){
      if(geschlecht === "weiblich")
      vaterAusgabe = <h3>Ihr Vater ist "{vater}"</h3>

      else{
        vaterAusgabe = <h3>Sein Vater ist "{vater}"</h3>
      }
    }

     //Ausgabe Bild wenn vorhanden und menschlich ist.
    if (bild !== null){
      bild1 = <img src={bild} alt="" height="390" width="270"/>;  
    }
    
  } 

  return (
    <div className="App">
      <header className="App-header">       

        <Typography>
          Leichte Sprache THB      
        </Typography>      

        <Suche callback={callback}/>   

         <Grid container spacing={1} style={{ margin: 10 }} justifyContent="center">        
          <Grid item xs={10} md={6}>
            <Zentrum>
            <Box id="textA" component="span" display="block" p={1} m={1} bgcolor="background.paper">

            Ausgabe 1      
            {wikiID}
            {geburtsOrtAusgabe} 
            {todesOrtAusgeben}
            {todesArtAusgeben} 
            {todesUrsacheAusgeben}
            {berufAusgabe}    
            {vater}     

            </Box>
            </Zentrum>
          </Grid>

          <Grid item xs={10} md={2} >
            <Zentrum>
              <Box id="bildA" component="span" display="block" p={1} m={1} bgcolor="background.paper">
              Ausgabe 2 

              {bild1}                
                      
              </Box>  
            </Zentrum>    
          </Grid>
        </Grid>

        <Bewertung/>               
                
        <Info/>  

      </header>
    </div>
  );  
}
export default App;
