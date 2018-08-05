import React, { Component } from 'react';
import Form from './Form.jsx';

import './App.css';
import './grid.css';

class App extends Component {
  render() {
    return (
      <main data-ts="Main">
      <div className="App grid-container">
      
        <header className="App-header">
          <h2>Triangle Challenge</h2>
          <h4>Enter the length of the sides:</h4>
        </header>
        <Form/> 

      </div>
      </main>
    );
  }
}

export default App;
