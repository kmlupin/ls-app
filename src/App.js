import './App.css';

import React, {useState} from 'react';
import { ButtonGroup, Typography, Button, TextField, Box} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import FavoriteIcon from '@material-ui/icons/Favorite';

const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

var wikidatanpm = require("wikidatanpm");
const wkd = require('wikidatanpm');
await wkd.getWikiId('Miguel de Cervantes');

function App() {
  const [suche, getSuche] = useState(null);
  const [print, setPrint] = useState(false)

  function getData(val){
    getSuche(val.target.value)
    setPrint(false)
  }


const axios = require('axios').default;
const baseURL =
    'https://query.wikidata.org/sparql?format=json&query=';

const getWikiId = (suche, language) => {
    const lang = language || 'de';
    const query = `
    SELECT * WHERE {
        SERVICE wikibase:mwapi {
            bd:serviceParam wikibase:endpoint "www.wikidata.org";
                            wikibase:api "EntitySearch";
                            mwapi:search "${suche}";
                            mwapi:language "${lang}".
            ?item wikibase:apiOutputItem mwapi:item.
            ?num wikibase:apiOrdinal true.
        }
        ?item (wdt:P279|wdt:P31) ?type
      } ORDER BY ASC(?num) LIMIT 1
    `;
    return axios.get(baseURL + encodeURI(query)).then((res, err) => {
        if (err) return null;

        return res &&
            res.data &&
            res.data.results.bindings &&
            res.data.results.bindings[0] &&
            res.data.results.bindings[0].item &&
            res.data.results.bindings[0].item.value
            ? res.data.results.bindings[0].item.value.replace(
                  'http://www.wikidata.org/entity/',
                  '',
              )
            : null;
    });
};

  return (
    <div className="App">
      <header className="App-header">
        <Typography>
          Leichte Sprache THB          
        </Typography>  

        {print ?
          <h1>{suche}</h1>
        :null}

        <TextField 
          id="sucheE" 
          label="🔍 Suche eingeben" 
          variant="outlined" 
          onChange={getData} 
          style={{ margin: 8 }} 
          placeholder="Suche nach einer Berühmten person. 🔍"
          fullWidth
        >    
        </TextField> 

        <Button         
          id="sucheS" 
          variant="contained" 
          color="primary" 
          style={{ margin: 30 }} 
          onClick={()=> setPrint(true)}          
        >
          Suche Starten
        </Button>

        <Box id="textA" component="span" display="block" p={1} m={1} bgcolor="background.paper">
          Ausgabe 1
        </Box>

        <Box id="bildA" component="span" display="block" p={1} m={1} bgcolor="background.paper">
          Ausgabe 2
        </Box>

        <TextField
          id="bewertung"
          label="✍ Bewertung"
          style={{ margin: 30 }}
          placeholder="Gib hier deine Bewertung zum Text ein. ✍"          
          fullWidth
          margin="normal"          
          variant="outlined"
        />   

        <Box id="bewertungH" component="fieldset" mb={3} borderColor="transparent">        
          <StyledRating
            name="customized-color"
            defaultValue={3}    
            icon={<FavoriteIcon fontSize="inherit" />}            
          />
        </Box>    

        <Button id="bewertungA" variant="contained" color="primary" style={{ margin: 15 }} >
          Bewertung Abgeben
        </Button>          
                
        <ButtonGroup id="impB" variant="text" color="primary" aria-label="small outlined button group" size="small">
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
