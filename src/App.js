import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import MapContainer from "./Map";
import Search from "./Search";
import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedMarker: ''
    }

    this.selectMarker = this.selectMarker.bind(this);
  }

  selectMarker(id) {
    console.log(id);

    this.setState({
      selectedMarker: id
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maps using React</h1>
        </header>

        <div className="ui equal height horizontally padded grid" style={{height: '100vh'}}>
          <div className="left aligned two wide column">
            <Search onSelectMarker={this.selectMarker} />
          </div>
          <div className="fourteen wide column">
            <MapContainer selectedMarker={this.state.selectMarker} />
          </div>
        </div>

      </div>
    );
  }
}

export default App;
