import React from 'react';
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import MainBoxComponent from './components/UI_Sections/MainBox.component';






function App() {

  

  return (
    <React.Fragment>
    <BrowserRouter>
    
    
    <div id="main_flex_container">
    
      
      <MainBoxComponent></MainBoxComponent>
      </div>
    </BrowserRouter>
    
  </React.Fragment>
  )

}

export default App

