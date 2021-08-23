import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//import Raiting from './Raiting';

ReactDOM.render(
    <App />,
  document.getElementById('root')  
);
/*ReactDOM.render(
  <React.StrictMode>
    <Raiting />
  </React.StrictMode>,
  document.getElementById('root2')  
);*/

//ReactDOM.render(<Raiting />, document.querySelector('#root2'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
