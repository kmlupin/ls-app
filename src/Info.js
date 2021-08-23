import './App.css';

import React from 'react';
import { ButtonGroup, Button } from '@material-ui/core';


export function Info() {  

  return (
    <ButtonGroup id="impB" variant="text" color="primary" aria-label="small outlined button group" size="small" style={{ margin: 100 }}>
          <Button href="#">
            Impressum
          </Button>

          <Button href="#">
            Infos Projekt
          </Button>
        </ButtonGroup>     
  );  
}
export default Info;
