//TEST AUSLAGERUNG
import { getGeburtsDatum } from "./search";
import { getGeburtsLand } from "./search";
import { getGeburtsOrt } from "./search";
import { getWikiId } from "./search";
import { getBild } from "./search";


const [suchWert, setSuchWert] = null
const [datum, setDatum] = null
const [land, setLand] = null
const [ort, setOrt] = null
const [id, setID] = null
const [bild, setBild] = null

export function textFeldchanged(val){
    setSuchWert(val.target.value)    
  }

export function suche(){
    getGeburtsDatum(suchWert).then((value)=>{
        setDatum(value)      
    }) 
    getGeburtsLand(suchWert).then((value)=>{
        setLand(value)      
    })
    getGeburtsOrt(suchWert).then((value)=>{
        setOrt(value)      
    })
    getWikiId(suchWert).then((value)=>{
        setID(value)      
    })
    getBild(suchWert).then((value)=>{
        setBild(value)      
    })   
}

