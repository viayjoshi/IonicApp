import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams,Platform} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

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
   flag1:boolean=true;
   mytimeout:any;
   minutes:number=0;
   seconds:number=0;
   hours:number=0;
   count:number=0;
   originLat:any;
   originLog:any;
   destLat:any;
   destLog:any;
   flag2:boolean=false;
  subscription:any;  
  acceleration:string="";
  distance :number=0;
  distanceTravelled:number=0;
  constructor(public navCtrl: NavController,private deviceMotion: DeviceMotion,private platform: Platform,public geolocation: Geolocation) {
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
    
    //let lat= new google.maps.LatLng(latitude,longitude);
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
    this.showAccelaration();
  }
  showAccelaration(){
    let options={
      frequency:3000
    }
    if(this.flag){
      this.subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
        this.acceleration=acceleration.toString();
        this.distance+= 0.5 * (acceleration.x) * Math.pow(2,2);
        this.distanceTravelled=this.convertToKm(this.distance);
    });  
    }else{
      this.subscription.unsubscribe();
    }
  }

  getCalories(){
    
  }
  convertToKm(disance){
    return this.roundToNumber(disance/1000,1);
  }
  roundToNumber(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
}
 //  calculateDistance(){

 //    function toRad (val) {
 //     return val * Math.PI / 180;
 //    }
 //    this.geolocation.getCurrentPosition().then(pos => {
 //      this.destLat=pos.coords.latitude;
 //      this.destLog=pos.coords.longitude;              
 //      let R = 6371; // km
 //      let dLat = toRad(this.destLat - this.originLat);
 //      let dLon = toRad(this.destLog - this.originLog); 
 //      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
 //              Math.cos(toRad(this.originLat)) * Math.cos(toRad(this.destLat)) * 
 //              Math.sin(dLon / 2) * Math.sin(dLon / 2); 
 //      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
 //      let d = R * c;
      
 //      this.distanceTravelled=(d).toString();
 //   }); 
 // }

//   startTimer(){
// //calculateDistance( 24.4998354, 54.370907499999994 ,24.4998354,  54.370907499999994);
//     this.flag=!this.flag;
//     if(this.flag){
//      // this.geolocation.getCurrentPosition().then(pos => {
//      //    //this.initMap(pos.coords.latitude,pos.coords.longitude);
//      //    //console.log('lat: ' + pos.coords.latitude + ', lon: ' + pos.coords.longitude);
//      //    this.originLat=pos.coords.latitude;
//      //    this.originLog=pos.coords.longitude;
//      // });     

//       this.mytimeout=setInterval(() => {
//         if(this.seconds>=59){
//           this.seconds-=59;
//           this.minutes++;
//           if(this.minutes>=59){
//             this.hours++;
//             this.minutes-=59;
//           }
//         }else{
//           this.seconds++;
//         }
//         this.currentTimer=("0"+this.hours).slice(-2)+':'+("0"+this.minutes).slice(-2)+':'+("0"+this.seconds).slice(-2);
        
//         // if(this.seconds%10==0){
//         //   //this.distanceTravelled=0;
//         //   if(!this.flag1){
//         //       this.originLat=this.destLat;
//         //       this.originLog=this.destLog;
//         //   }
//         //   this.flag1=false;
//         //   //this.calculateDistance();
//         // }
//       }, 1000);  
//     }else{
//       clearInterval(this.mytimeout);
//     }
//   }

