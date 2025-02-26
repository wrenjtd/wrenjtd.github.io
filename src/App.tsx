import React from 'react';
import '../src/assets/css/App.css';
import { BrowserRouter } from 'react-router-dom';
import MainBoxComponent from './components/UI_Sections/MainBox.component';
import HeaderContentComponent from './components/UI/HeaderContent.component';
import SidebarBoxComponent from './components/UI_Sections/SidebarBox.component';






function App() {

  

  return (
    <React.Fragment>
    <BrowserRouter>
    
    <HeaderContentComponent></HeaderContentComponent>
    <div id="main_flex_container">
    
      <SidebarBoxComponent></SidebarBoxComponent>
      <MainBoxComponent></MainBoxComponent>
      </div>
    </BrowserRouter>
    
  </React.Fragment>
  )

}

export default App

