import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';

var markers = [{id: 1, name: 'Downtown park', lat: 47.6127, lng: -122.2042},
               {id: 2, name: 'Robinswood park', lat:47.587, lng: -122.1391},
               {id: 3, name: 'Crossroads park', lat:47.6175, lng: -122.1229},
               {id: 4, name: 'Lake Hills park', lat:47.5987, lng: -122.1222},
               {id: 5, name: 'Bellevue Botanical Garden', lat:47.6081, lng: -122.1785}];

export default class Search extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.selectMarker = this.selectMarker.bind(this);
  };

  selectMarker(event) {
    this.props.onSelectMarker(event.target.id);
  }

  handleChange(event){
    this.setState({
      search: event.target.value
    });
  }

  render() {
    let filteredPlaces = markers.filter((place) => {
      return place.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1;
    });
    return (
      <div>
        <br/>
        <div className="ui category search">
          <div className="ui icon input">
            <input className="prompt" type="text" value={this.state.search} onChange={this.handleChange} placeholder="Search places..." />
            <i className="search icon"></i>
          </div>
          <div className="ui middle aligned divided list">
            {(filteredPlaces.length === 0) ?
              <p>No places found</p> :
              filteredPlaces.map((place) =>
                <div className="item" key={place.id}>
                  <div className="content">
                    <i className="marker icon"></i>
                    <button id={place.id} onClick={this.selectMarker}>{place.name}</button>
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
