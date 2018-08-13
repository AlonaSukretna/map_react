import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//import Marker from "./Marker";
import './App.css'

import { withGoogleMap, GoogleMap} from 'google-maps-react';
const google = window.google;

//https://medium.com/@eighteen0seven/writing-a-google-maps-react-component-fae411588a91
//https://developers.google.com/maps/documentation/javascript/examples/infowindow-simple

var markers = [{id: 1, name: 'Downtown park', lat: 47.6127, lng: -122.2042},
               {id: 2, name: 'Robinswood park', lat:47.587, lng: -122.1391},
               {id: 3, name: 'Crossroads park', lat:47.6175, lng: -122.1229},
               {id: 4, name: 'Lake Hills park', lat:47.5987, lng: -122.1222},
               {id: 5, name: 'Bellevue Botanical Garden', lat:47.6081, lng: -122.1785}];

export class MapContainer extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        selectedMarker: '',
        selectedLat: 0,
        selectedLng: 0,
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {},
        markerObjects: []
      }

      this.onMarkerMounted = element => {
        //console.log(element);
        this.setState(prevState => ({
          markerObjects: [...prevState.markerObjects, element.marker]
        }))
      };
    }

    onMarkerClick = (props, marker, e) => {
      //console.log('fnsksfbnksnfksn');
      console.log(marker.id);

      let filteredMarkers = markers.filter((st) => {
        return st.id == marker.id;
      });

      var mySelectedMarker = filteredMarkers[0];


      this.setState({
        selectedPlace: {name: props.name},
        activeMarker: marker,
        selectedMarker: mySelectedMarker.id,
        selectedLat: mySelectedMarker.lat,
        selectedLng: mySelectedMarker.lng,
        showingInfoWindow: true
      });
    };

    onMapClicked = (props) => {
      if (this.state.showingInfoWindow) {
        this.setState({
          showingInfoWindow: false,
          activeMarker: null,
          selectedMarker: 0,
        })
      }
    };

    componentWillReceiveProps(props){
      console.log(props.selectedMarker);
      console.log('---------------');
      console.log(this.state.markerObjects);

      let filteredMarkers = markers.filter((st) => {
        return st.id == props.selectedMarker;
      });

      var mySelectedMarker = filteredMarkers[0];
      //console.log(filteredMarkers);

      let filteredMarkers2 = this.state.markerObjects.filter((st2) => {
        return st2.name == mySelectedMarker.name;
      });

      var mySelectedMarker2 = filteredMarkers2[0];

      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      //let lat = 47.587;
      //let lng = -122.1391;
      let pos = new maps.LatLng(mySelectedMarker.lat, mySelectedMarker.lng);

      let marker = new maps.Marker({
        position: pos
      });

      this.setState({
        selectedMarker: props.selectedMarker,
        selectedLat: mySelectedMarker.lat,
        selectedLng: mySelectedMarker.lng,
        selectedPlace: {name: mySelectedMarker.name},
        activeMarker: mySelectedMarker2,
        showingInfoWindow: true
      });
    }

    render() {
      return (
      <Map  google={this.props.google} ref="map"
      style={{width: '100%', height: '100%', position: 'relative'}}

          initialCenter={{
            lat: 47.6051,
            lng: -122.1655
          }}
          zoom={13}
          onClick={this.onMapClicked}>

        {markers.map((item, i) =>
          <Marker ref={this.onMarkerMounted}
                  onClick={this.onMarkerClick}
                  key={item.id}
                  id={item.id}
                  title={item.name}
                  name={item.name}
                  position={{lat: item.lat, lng: item.lng}}
                  animation={(this.state.selectedMarker == item.id) ? this.props.google.maps.Animation.DROP : null} />
        )}

        <InfoWindow
          position={{lat: this.state.selectedLat, lng: this.state.selectedLng}}
          pixelOffset={{height: -40, width: 0}}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>

      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDbZWOCkFfYw6UOJE6OTy1B87GxwbhWvH8'
})(MapContainer)
