import './App.css';

import React, {useState} from 'react';
import { ButtonGroup, Typography, Button, TextField, Box, Grid, Paper} from '@material-ui/core';
import { withStyles, styled } from '@material-ui/core/styles';
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

const Zentrum = styled(Paper)(({ theme }) => ({  
  textAlign: 'center',  
}));

function App() {
  const [suche, getSuche] = useState(null);
  const [print, setPrint] = useState(false)

  function getData(val){
    getSuche(val.target.value)
    setPrint(false)
  }

  return (
    <div className="App">
      <header className="App-header">       

        <Typography>
          Leichte Sprache THB          
        </Typography>  

        {print ?
          <h1>{suche}</h1>
        :null}      
 
      <Grid container spacing={1} style={{ margin: 10 }} justifyContent="center">
        <Grid item xs={8} md={6}>
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
        </Grid>

        <Grid item xs={8} md={2} >
          <Button         
            id="sucheS" 
            variant="contained" 
            color="primary" 
            style={{ margin: 8 }} 
            onClick={()=> setPrint(true)}          
          >
            Suche Starten
          </Button>          
        </Grid>
      </Grid>          

      <Grid container spacing={1} style={{ margin: 10 }} justifyContent="center">        
        <Grid item xs={8} md={6}>
          <Zentrum>
          <Box id="textA" component="span" display="block" p={1} m={1} bgcolor="background.paper">
           Ausgabe 1
          </Box>
          </Zentrum>
        </Grid>

        <Grid item xs={8} md={2} >
          <Zentrum>
          <Box id="bildA" component="span" display="block" p={1} m={1} bgcolor="background.paper">
           Ausgabe 2
          </Box>  
          </Zentrum>    
        </Grid>
      </Grid>

      <Grid container spacing={1} style={{ margin: 10 }} justifyContent="center">        
        <Grid item xs={8} md={6}>         
          <TextField         
            id="bewertung"
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
          <Box id="bewertungH" component="fieldset" mb={3} borderColor="transparent">        
            <StyledRating
              name="customized-color"
              defaultValue={3}    
              icon={<FavoriteIcon fontSize="inherit" />}            
            />
          </Box>             
        </Grid>
      </Grid>

      <Button id="bewertungA" variant="contained" color="primary" style={{ marginTop: 0}} >
        Bewertung Abgeben
      </Button>          
              
      <ButtonGroup id="impB" variant="text" color="primary" aria-label="small outlined button group" size="small" style={{ margin: 180 }}>
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
