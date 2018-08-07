import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from "./Map";
import Search from "./Search";
import 'semantic-ui-css/semantic.min.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maps using React</h1>
        </header>

        <div className='ui horizontal segments'>
          <div className='ui segment'>
            <Search />
          </div>
          <div className='ui segment'>
            <MapContainer />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
