import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from './component/Main';
import SearchPage from './component/SearchPage';
import DenseAppBar from './component/DenseAppBar';


function App() {
  
  return (
    <>
    <DenseAppBar></DenseAppBar>
      <Routes>
      <Route path='/' element={<Main></Main> } />
       <Route path='/SearchPage' element={<SearchPage></SearchPage> } />
    
        
        
      </Routes>
    </>
  );
}

export default App;