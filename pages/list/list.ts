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
   currentTimer:any;
   flag:boolean;
   mytimeout:any;
   minutes:number=0;
   seconds:number=0;
   hours:number=0;
   count:number=0;
  constructor(public navCtrl: NavController,private platform: Platform,private geolocation: Geolocation) {
    // If we navigated to this page, we will have an item available as a nav param
    platform.ready().then(() => {
      this.currentTimer="00:00:00"
      
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
  startTimer(){
    this.flag=!this.flag;
    if(this.flag){
      this.mytimeout=setInterval(() => {
        if(this.seconds>=59){
          this.seconds-=59;
          this.minutes++;
          if(this.minutes>=59){
            this.hours++;
            this.minutes-=59;
          }
        }else{
          this.seconds++;
        }
        this.currentTimer=("0"+this.hours).slice(-2)+':'+("0"+this.minutes).slice(-2)+':'+("0"+this.seconds).slice(-2);
      }, 1000);  
    }else{
      clearInterval(this.mytimeout);
    }
  }
}
