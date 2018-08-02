import React from 'react'
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
//import Marker from "./Marker";
import './App.css'

export class MapContainer extends React.Component {
  render() {
    return (
      <Map  google={this.props.google}
      style={{width: '100%', height: '100%', position: 'relative'}}

          initialCenter={{
            lat: 47.610378,
            lng: -122.200676
          }}

          zoom={15}
          onClick={this.onMapClicked}>

        <Marker onClick={this.onMarkerClick}
                name={'Current location'} />

        <InfoWindow onClose={this.onInfoWindowClose}>
            <div>
              <h1>test</h1>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDbZWOCkFfYw6UOJE6OTy1B87GxwbhWvH8'
})(MapContainer)
