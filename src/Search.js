import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import * as Data from './Data';

export default class Search extends React.Component {

  constructor(props) {
    super(props);

    //search is the variable which contains the currently used search term in the search bar
    this.state = {
      search: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectMarker = this.selectMarker.bind(this);
  };

  //The user clicks a marker from the search bar
  selectMarker(event) {
    this.props.onSelectMarker(event.target.id);
  }

  //The user changed the search term in the search bar 
  handleChange(event){
    this.setState({
      search: event.target.value
    });
  }

  render() {
    let filteredPlaces = Data.markers.filter((place) => {
      return place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    return (
      <div>

        <div className="ui category search" role="search" style={{background: 'white'}}>
          <br/>
          <div className="ui icon input">
            <input
              aria-label="Input filter places:"
              className="prompt"
              type="text"
              value={this.state.search}
              onChange={this.handleChange}
              placeholder="Search places..." />
            <i className="search icon"></i>
          </div>
          <div className="ui middle aligned divided list">
            {(filteredPlaces.length === 0) ?
              <p>No places found</p> :
              filteredPlaces.map((place) =>
                <div className="item" key={place.id}>
                  <div className="content">
                    <i className="marker icon"></i>
                    <button className="bt" id={place.id} onClick={this.selectMarker}>{place.name}</button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}
