import './App.css';

import React, {useState} from 'react';
import { Button, TextField, Grid } from '@material-ui/core';

import { getGeburtsOrt } from './search.js'
import { getGeburtsLand } from './search.js';
import { getBild } from './search.js';
import { getGeburtsDatum } from './search.js';
import { getBeruf } from './search.js';
import { getFName } from './search.js';
import { getLName } from './search.js';
import { getType } from './search.js';
import { getGeschlecht } from './search.js';
import { getSterbeDatum } from './search.js';
import { getSterbeLand } from './search.js';
import { getSterbeOrt } from './search.js';
import { getWikiId } from './search.js';

export function Suche(props) { 
  
  const [suchWert, setSuchWert] = useState("")
  const [wikiID, setWikiId] = useState("")
  const [geburtsDatum, setDatum] = useState("")
  const [geburtsLand, setGLand] = useState("")
  const [bild, setBild] = useState("")  
  const [geburtsOrt, setGOrt] = useState("") 
  const [beruf, setBeruf] = useState("") 
  const [fName, setFName] = useState("") 
  const [lName, setLName] = useState("") 
  const [type, setType] = useState("") 
  const [geschlecht, setGeschlecht] = useState("") 
  const [sterbeDatum, setSterbeDatum] = useState ("")
  const [sterbeOrt, setSterbeOrt] = useState("")
  const [sterbeLand, setSterbeLand] = useState("")


  function uebergebeWerteAnApp() {
      props.callback({
        geburtsDatum: geburtsDatum, 
        geburtsLand: geburtsLand, 
        bild: bild,   
        geburtsOrt: geburtsOrt, 
        beruf: beruf,
        fName: fName,
        lName: lName,
        type: type,  
        geschlecht: geschlecht, 
        sterbeDatum: sterbeDatum,
        sterbeOrt:sterbeOrt,
        sterbeLand:sterbeLand,
        wikiID:wikiID        
      })
  } 

  function suche(){

    getWikiId(suchWert).then((value)=>{
      setWikiId(value) 
      console.log(wikiID)     
      uebergebeWerteAnApp()
    })

    getGeschlecht(wikiID).then((value)=>{
      setGeschlecht(value)      
      uebergebeWerteAnApp()
    })
    
    getType(wikiID).then((value)=>{
      setType(value) 
      uebergebeWerteAnApp()     
    })

    getGeburtsDatum(wikiID).then((value)=>{
        setDatum(value) 
        uebergebeWerteAnApp()         
    })
    
    getSterbeDatum(wikiID).then((value)=>{
        setSterbeDatum(value)               
        uebergebeWerteAnApp()
        console.log(sterbeDatum)          
    })
    
    getGeburtsLand(wikiID).then((value)=>{      
        setGLand(value)
        uebergebeWerteAnApp()
    }) 

    getBild(wikiID).then((value)=>{
      setBild(value)   
      uebergebeWerteAnApp()  
    })

    getGeburtsOrt(wikiID).then((value)=>{
      setGOrt(value)   
      uebergebeWerteAnApp()  
    })

    getBeruf(wikiID).then((value)=>{
      setBeruf(value)      
      uebergebeWerteAnApp()
    })

    getFName(wikiID).then((value)=>{
      setFName(value)      
      uebergebeWerteAnApp()
    })

    getLName(wikiID).then((value)=>{
      setLName(value)      
      uebergebeWerteAnApp()
    })  

    getSterbeLand(wikiID).then((value)=>{
      setSterbeLand(value)      
      uebergebeWerteAnApp()
    }) 

    getSterbeOrt(wikiID).then((value)=>{
      setSterbeOrt(value)      
      uebergebeWerteAnApp()
    })
  }  
  
  function textFeldchanged(val){
    setSuchWert(val.target.value)    
  }  

  return (
 
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

  );  
}
export default Suche;
