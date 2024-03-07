import React from 'react';
import logo from './logo.svg';
import './App.css';
import ContextProvider from './WalletContext'

function App() {
  return (
    <div >
<ContextProvider>
       
      </ContextProvider>
      {/* <ContextProvider /> */}
    </div>
  );
}

export default App;
