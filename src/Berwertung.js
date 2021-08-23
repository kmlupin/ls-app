import './App.css';

import React from 'react';
import { Button, TextField, Box, Grid } from '@material-ui/core';
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

export function Bewertung() { 
  
   return (

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
  );  
}
export default Bewertung;
