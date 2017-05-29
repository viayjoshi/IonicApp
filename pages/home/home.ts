import { Component ,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	 currentTime: string;
	 flag:boolean;
	 mytimeout:any;
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {
  }

  startTimer(flag){
  	this.flag=!this.flag;
  	if(!flag){
  		this.mytimeout=setInterval(() => {
      	this.currentTime=new Date().getHours().toString() + ':' + 
  					new Date().getMinutes().toString() + ':' +new Date().getSeconds().toString()
    	}, 1000);	
  	}else{
  		clearInterval(this.mytimeout);
  	}
  	
  }

}
