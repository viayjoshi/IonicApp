import { Component ,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController } from 'ionic-angular';
//import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	 
  constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion) {
    this.deviceMotion.getCurrentAcceleration().then(
  (acceleration: DeviceMotionAccelerationData) => console.log(acceleration),
  (error: any) => console.log(error));

  }

  


}
