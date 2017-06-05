import { Component ,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
//import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  flag:boolean=false;
  subscription:any;	
  acceleration:string="";
  distance :number=0;
  constructor(public navCtrl: NavController,private platform: Platform, private deviceMotion: DeviceMotion) {
   
    platform.ready().then(() => {
   		
   	// 	this.deviceMotion.getCurrentAcceleration().then(
  		// (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
  		// (error: any) => console.log(error));   

     });
    console.log(this.deviceMotion);

  }

  showAccelaration(){
  	this.flag=!this.flag;
  	let options={
  		frequency: 20000
  	}
  	if(this.flag){
  		this.subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
	  		console.log(acceleration);
	  		this.acceleration=acceleration.toString();
	  		this.distance+= 0.5 * (acceleration.x) * Math.pow(2,2);
		});	
  	}else{
  		this.subscription.unsubscribe();
  	}
	
  }


}
