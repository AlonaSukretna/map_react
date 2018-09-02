import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from "./Map";
import Search from "./Search";
import 'semantic-ui-css/semantic.min.css';

document.addEventListener('DOMContentLoaded', function(event) {
  //Maps error handling is implemented in Google Maps API
  let scriptTag = document.getElementsByTagName('SCRIPT').item(1);
  scriptTag.onerror = function(e) {
    console.log('Oops! Something went wrong! This page did not load Google Maps correctly.');
  }
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedMarker: ''
    }

    this.selectMarker = this.selectMarker.bind(this);
  }

  selectMarker(id) {
    this.setState({
      selectedMarker: id
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 tabIndex="0" className="App-title">Maps using React</h1>
        </header>

        <div className="ui equal height horizontally padded grid" >
          <div className="left aligned two wide column" style={{padding: '0px', margin: '0px', width: '100vh'}}>
            <Search onSelectMarker={this.selectMarker} />
          </div>
          <div className="fourteen wide column" style={{padding: '0px', margin: '0px', height: '100vh'}}>
            <MapContainer selectedMarker={this.state.selectedMarker} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
