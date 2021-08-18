//TEST AUSLAGERUNG
import { getGeburtsOrt } from './search.js'
import { getGeburtsLand } from './search.js';
import { getBild } from './search.js';
import { getGeburtsDatum } from './search.js';
import { getBeruf } from './search.js';
import { getFName } from './search.js';
import { getLName } from './search.js';



export function textFeldchanged(val){
    setSuchWert(val.target.value)    
  } 

export function suche(){
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


