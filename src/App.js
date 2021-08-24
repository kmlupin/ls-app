import './App.css';

import React, {useState} from 'react';
import { Box, Grid, Paper } from '@material-ui/core';
import {styled } from '@material-ui/core/styles';
import Suche from './Suche';
import Bewertung from './Berwertung';
import Info from './Info';
import Ueberschrift from './Ueberschrift';

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
  const [mutter, setMutter] = useState("")
  const [sprache, setSprache] = useState("")
  const [ethnischeGruppe, setEthnischeGruppe] = useState("")
  const [religion, setReligion] = useState("")
  const [religionBeschreibung, setReligionBeschreibung] = useState("")
  const [todesUrsacheBeschreibung, setTodesUrsacheBeschreibung] = useState("")
  
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
    setMutter(values.mutter)
    setSprache(values.sprache)
    setEthnischeGruppe(values.ethnischeGruppe)
    setReligion(values.religion)
    setReligionBeschreibung(values.religionBeschreibung)
    setTodesUrsacheBeschreibung(values.todesUrsacheBeschreibung)
  }

  //Inhalte für die Ausgabe für Mensch
   
  let geburtsOrtAusgabe = "";
  let geburtsLandAusgebe = "";
  let geburtsDatumAusgabe = "";
  let berufAusgabe ="";
  let todesOrtAusgeben = "";
  let todesUrsacheAusgeben = "";
  let todesArtAusgeben = "";
  let vaterAusgabe = "";
  let mutterAusgabe = "";
  let bild1 = "";
  let spracheAusgabe = "";
  let ethnischeGruppeAusgabe = "";
  let religionAusgabe = "";
  let religionBeschreibungAusgabe = "";
  let todesUrsacheBeschreibungAusgabe = "";

  //Wenn Mensch
  if (type === "Mensch"){
    //Ausgabe GeburtsDatum
    if (geburtsDatum !== null){
      geburtsDatumAusgabe = <h3>{fName} {lName} hat am {geburtsDatum} Geburtstag.</h3>              
    }

    //Ausgabe GeburtsOrt
    if (geburtsOrt !== null){
      if (geschlecht === "weiblich"){
        geburtsOrtAusgabe = <h3>Sie ist in {geburtsOrt} geboren.</h3>       
      }
      else{
        geburtsOrtAusgabe = <h3>Er ist in {geburtsOrt} geboren.</h3>        
      }           
    }
    //Ausgabe GeburtsLand
    if (geburtsLand !== null){
      geburtsLandAusgebe = <h3>"{geburtsOrt}" ist ein Ort der in "{geburtsLand}" liegt.</h3> 
    }  

    //Ausgabe Beruf.
    if (beruf !== null){
      //Ausgabe Beruf weiblich
      if (geschlecht === "weiblich"){
        if (sterbeDatum === null){
          berufAusgabe = <h3>Sie Arbeitet als {beruf}in.</h3>
        }  
        //Ausgabe Beruf wenn weiblich und verstorben.  
        else {
          berufAusgabe = <h3>Sie hat als {beruf}in gearbeitet.</h3>
        }       
      }    
      //Ausgabe Beruf männlich  
      else {        
        if (sterbeDatum === null){
          berufAusgabe = <h3>Er Arbeitet als {beruf}.</h3>
        }
        //Ausgabe Beruf wenn mänlich und verstorben.
        else {
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
    if (todesArt !== null){
      if (geschlecht === "weiblich"){
        todesArtAusgeben = <h3>Sie ist an einem "{todesArt}" gestorben.</h3>        
      }
      else{
        todesArtAusgeben = <h3>Er ist an einem "{todesArt}" gestorben.</h3>        
      }

      if (todesUrsache !== null){          
          todesUrsacheAusgeben = <h3>Die genaue Todesursache war eine "{todesUrsache}".</h3>
          if (todesUrsacheBeschreibung !== null){
            todesUrsacheBeschreibungAusgabe = <h3>"{todesUrsache}" bedeutet: <br/>{todesUrsacheBeschreibung}.</h3>
          }
      }      
    }   

    //Ausgabe der Eltern
    //Ausgabe Vater
    if (vater !== null){
      if(geschlecht === "weiblich"){
      vaterAusgabe = <h3>Ihr Vater heißt "{vater}".</h3>
      }
      else{
        vaterAusgabe = <h3>Sein Vater heißt "{vater}".</h3>
      }   
      if (mutter === null){
        mutterAusgabe = <h3>Der Name der Mutter kennt man nicht.</h3>
      }      
    }      
    //Ausgabe Mutter
    if (mutter !== null){
      if (geschlecht === "weiblich"){
      mutterAusgabe = <h3>Ihre Mutter heißt "{mutter}".</h3>
      }
      else{
        mutterAusgabe = <h3>Seine Mutter heißt "{mutter}".</h3>
      }   
      if (vater ===null){
        vaterAusgabe = <h3>Der Name vom Vater kennt man nicht.</h3>
      }       
    } 

    //Ausgabe der GesprochenenSprache
    if (sprache !== null){
      if (geschlecht === "weiblich"){
        spracheAusgabe = <h3>Ihre natürliche sprache ist "{sprache}".</h3>
      }
      else {
        spracheAusgabe = <h3>Seine natürliche sprache ist "{sprache}".</h3>
      }      
    }

    //Ausgabe der Religion
    if (religion !== null){
      if (geschlecht === "weiblich"){
        religionAusgabe = <h3>Sie gehört der {religion} Religion an.</h3>
      }
      else {
        religionAusgabe = <h3>Er gehört der {religion} Religion an.</h3>
      }
    }
    
    //Ausgabe ReligionBeschreibung
    if (religionBeschreibung !== null){
      religionBeschreibungAusgabe = <h3>{religion} bedeutet: {religionBeschreibung}.</h3>
    }


    //Ausgabe der EthnischeGruppe
    if (ethnischeGruppe !== null){
      if (geschlecht === "weiblich"){
        ethnischeGruppeAusgabe = <h3> Sie gehört der ethnischen Gruppe der {ethnischeGruppe} an.</h3>
      }
      else {
        ethnischeGruppeAusgabe = <h3> Er gehört der ethnischen Gruppe der {ethnischeGruppe} an.</h3>
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

        <Ueberschrift/>      

        <Suche callback={callback}/>   

         <Grid container spacing={1} style={{ margin: 10 }} justifyContent="center">        
          <Grid item xs={10} md={6}>
            <Zentrum>
            <Box id="textA" component="span" display="block" p={1} m={1} bgcolor="background.paper">

            Ausgabe 1      
            {geburtsDatumAusgabe}
            {geburtsOrtAusgabe}
            {geburtsLandAusgebe} 
            {todesOrtAusgeben}
            {todesArtAusgeben} 
            {todesUrsacheAusgeben}
            {todesUrsacheBeschreibungAusgabe}
            {berufAusgabe}    
            {vaterAusgabe} 
            {mutterAusgabe} 
            {spracheAusgabe}   
            {ethnischeGruppeAusgabe}
            {religionAusgabe}
            {religionBeschreibungAusgabe}

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
