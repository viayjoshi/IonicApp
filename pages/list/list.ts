import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams,Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('map') mapElement;
   map:any;
  constructor(public navCtrl: NavController,private platform: Platform,private geolocation: Geolocation) {
    // If we navigated to this page, we will have an item available as a nav param
    platform.ready().then(() => {

      // get current position
      geolocation.getCurrentPosition().then(pos => {
        this.initMap(pos.coords.latitude,pos.coords.longitude);
        console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
      });      

    });
  }

  initMap(latitude,longitude){
    
    let lat= new google.maps.LatLng(latitude,longitude);
    let mapOptions = {
          zoom: 15,
          center: {lat: latitude, lng: longitude}
        };
    this.map=new google.maps.Map(this.mapElement.nativeElement,mapOptions)
  }
}
