import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams,Platform,AlertController,Nav} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Storage } from '@ionic/storage';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker } from '@ionic-native/google-maps';
import { LocationAccuracy } from '@ionic-native/location-accuracy';
import { Calories } from './calories_burned';

declare let google;
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html'
})
export class ActivityPage{
  @ViewChild('map') mapElement;
  @ViewChild(Nav) nav: Nav;
   map:any;
   currentTimer:any;
   flag:boolean;
   mytimeout:any;
   minutes:number=0;
   seconds:number=0;
   hours:number=0;
   count:number=0;
  distance:number=0;
  distanceTravelled:number=0;
  caloriesburned:number=0;
  userName:string;
 userAge:number;
 userGender:string;
 userHeight:number;
 userWeight:number;
 inputArray:Array<number>=[];
 totalAccInSecond:number=0;
 velCount:number=0;
 velocityPerSec:number=0;
 origin:any;
 destination:any;
  constructor(public navCtrl: NavController,public calories:Calories,public locationAccuracy: LocationAccuracy,public platform: Platform,public geolocation: Geolocation,public storage: Storage,public alertCtrl: AlertController) {
    // If we navigated to this page, we will have an item available as a nav param
    platform.ready().then(() => {
      this.currentTimer="00:00:00"
        //this.initMap();
     this.storage.get('info').then((val)=>{
        if(val!=null){
          this.userName=val.name;
          this.userAge=parseInt(val.age);
          this.userGender=val.gender;
          this.userHeight=parseInt(val.height);
          this.userWeight=parseInt(val.weight);;
         };
       });
      //this.initMap()   ;
     });
  }
  
  startTimer(){
    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
              //console.log(resp.coords.latitude+", "+resp.coords.longitude); 
              this.counter();
              this.origin=new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
            }).catch((error) => {
              console.log('Error requesting location permissions')        
            });
    /*this.locationAccuracy.canRequest().then((canRequest: boolean) => {

      if(canRequest) {
        // the accuracy option will be ignored by iOS
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(
          () => {
            console.log('Request successful');
            this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
              console.log(resp.coords.latitude+", "+resp.coords.longitude); 
              this.counter();
            }).catch((error) => {
              console.log('Error requesting location permissions')        
            });
          },
          error =>{this.showAlert('Error getting location');} 
        );
      }
    })*/;
    
  }
  counter(){
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

        if(this.seconds%5==0){
          this.getDistance();
        }
        
        this.currentTimer=("0"+this.hours).slice(-2)+':'+("0"+this.minutes).slice(-2)+':'+("0"+this.seconds).slice(-2);
      }, 1000);  
      
    }else{
      clearInterval(this.mytimeout);
    }
  }
   
  convertToKm(disance){
    return this.roundToNumber(disance/1000,1);
  }
  roundToNumber(value, precision) {
    let multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
    
  getDistance(){
  
  this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
    //console.log(resp.coords.latitude+", "+resp.coords.longitude);
    let location = new LatLng(resp.coords.latitude, resp.coords.longitude);
    //let origin = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    let origin=this.origin;
    let destination =this.destination= new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
    let thisRefer=this;
    let service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: 'WALKING',
        avoidHighways: true,
        avoidTolls: true,
      }, callback);
    //console.log(this);
    function callback(response, status) {
      if(status=="OK"){
        let val=parseInt(response.rows[0].elements[0].distance.text.split(' ')[0]);
        thisRefer.origin=thisRefer.destination;
        thisRefer.distance=thisRefer.distance + (val >0 ? val : 0);
        thisRefer.distanceTravelled=thisRefer.convertToKm(thisRefer.distance);
        thisRefer.caloriesburned=thisRefer.calories.compute_cals(thisRefer.distanceTravelled,thisRefer.hours,thisRefer.minutes,thisRefer.seconds,this.userWeight,'WALKING')
      }
    }

  }).catch((error) => {
    //this.showAlert('Error getting location');
  });

}
showAlert(msg){
    //console.log(this.nav,this);
     let alert = this.alertCtrl.create({
            title: msg,
            buttons: [{
              text: 'Ok',
              handler: () => {
                // user has clicked the alert button
                // begin the alert's dismiss transition
                ///console.log(this.nav,this);
                alert.dismiss();
               // let navTransition =

                // start some async method
                // someAsyncOperation().then(() => {
                //   // once the async operation has completed
                //   // then run the next nav transition after the
                //   // first transition has finished animating out

                //   navTransition.then(() => {
                //     this.nav.pop();
                //   });
                // });
                return false;
              }
            }]
          });

        alert.present();
  }  
}


