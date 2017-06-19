import { Component,ViewChild} from '@angular/core';
import { NavController, NavParams,Platform,AlertController,Nav} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';
import { Storage } from '@ionic/storage';


declare var google;
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  @ViewChild('map') mapElement;
  @ViewChild(Nav) nav: Nav;
   map:any;
   currentTimer:any;
   flag:boolean;
   //flag1:boolean=true;
   mytimeout:any;
   minutes:number=0;
   seconds:number=0;
   hours:number=0;
   count:number=0;
  subscription:any;  
  acceleration:string="";
  distance :number=0;
  distanceTravelled:number=0;
  caloriesburned:number=0;
  userName:string;
 userAge:number;
 userGender:string;
 userHeight:number;
 userWeight:number;
 x:number;
 y:number;
 z:number;
 inputArray:Array<number>=[];
 totalAccInSecond:number=0;
 velCount:number=0;
 velocityPerSec:number=0;
  constructor(public navCtrl: NavController,private deviceMotion: DeviceMotion,private platform: Platform,public geolocation: Geolocation,public storage: Storage,public alertCtrl: AlertController) {
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
     });
  }
  
  startTimer(){
    if(!this.userName && !this.userAge  && !this.userGender &&  !this.userHeight  && !this.userWeight){
      this.showAlert('Please fill personal info first');
      return;
    }
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
        //this.getCalories();
        this.currentTimer=("0"+this.hours).slice(-2)+':'+("0"+this.minutes).slice(-2)+':'+("0"+this.seconds).slice(-2);
      }, 1000);  
      
    }else{
      clearInterval(this.mytimeout);
    }
    this.showAccelaration();
    //this.getCalor.ies();
  }
  showAccelaration(){
    let options={
      frequency:100
    }
    if(this.flag){
      this.subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => {
        //this.totalAccInSecond=0; 
        this.acceleration=acceleration.toString();
        
        this.x=parseFloat((acceleration.x).toFixed(2));
        this.y=parseFloat((acceleration.y).toFixed(2));
        this.z=parseFloat((acceleration.z).toFixed(2));
        if(this.count >= 9){
          let avg=parseFloat((this.totalAccInSecond/(10*1000)).toFixed(2));
          //if(avg > 0.99){
             this.velocityPerSec=parseFloat(((9806.65*avg)/(2*3.14*1)).toFixed(2));//this.getAccl2mms(avg,1);

             //if (this.velCount >= 9) {
             //this.velocityPerSec=this.velocityPerSec/10;
       
             this.distanceTravelled = this.distanceTravelled + parseFloat((this.velocityPerSec*0.1).toFixed(2));
             //if(v>1){
              
             //}
             //this.velocityPerSec=0;
             //this.velCount=0;
           //}
           //}  
          this.velocityPerSec=0;              
          this.count=0;   
          this.totalAccInSecond=0;
          //this.velCount++;
        }else{

          let valuep=parseFloat(Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z).toFixed(2));
          if(valuep < 0){
            valuep=valuep - (valuep*2);  
          }
          this.totalAccInSecond+=valuep;

          this.count++;  
        }
    
    });  
    }else{
      this.subscription.unsubscribe();
    }
  }
  getAccl2mms(acc,freq){
     let result = 0;
      let gravity=9806.65;
      let PI=3.14;
      result = (gravity*acc)/(2*PI*freq);
      return result;
  }
  getCalories(){
   // men =10 weigh + 6.25 heigh -5 age + 5
   // women=10 weigh + 6.25 heigh -5 age + 161

   let bmr;
     if (this.userGender=="m") {
            bmr = (13.75* this.userWeight) + (5*this.userHeight) - (6.76*this.userAge) + 66;
     }
    else if (this.userGender== "f") {
           bmr = (9.56* this.userWeight) + (1.85*this.userHeight) - (4.68*this.userAge) + 655;
    }
     
    let time = (this.hours*60+this.minutes + (this.seconds/60))/(60);
     
     this.caloriesburned += Math.round((bmr/24)*time*6.0);
  }
  
  convertToKm(disance){
    return this.roundToNumber(disance/1000,1);
  }
  roundToNumber(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
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
  initMap(){
  //this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
    //console.log(resp.coords.latitude+", "+resp.coords.longitude);
    //let location = new LatLng(resp.coords.latitude, resp.coords.longitude);

  //   this.map = new GoogleMap('map', {
      
  //     'controls': {
  //       'compass': true,
  //       'myLocationButton': true,
  //       'indoorPicker': true,
  //       'zoom': true
  //     },
  //     'camera': {
  //       'latLng': location,
  //       'tilt': 30,
  //       'zoom': 15,
  //       'bearing': 50
  //     }
  //   });

  //   this.map.on(GoogleMapsEvent.MAP_READY).subscribe(() => {
  //     //console.log('Map is ready!');
  //     this.showAlert('map is ready')
  //   });
  // }).catch((error) => {
  //   this.showAlert('map loading error')
  //   console.log('Error getting location', error);
  // });
}
  
}
// <option value="6.0">jog/walk combination (jogging component of less than 10 minutes)</option>
//   <option value="4.5">jogging on a mini-tramp</option>
//   <option value="7.0">jogging, general</option>
//   <option value="8.0">jogging, in place</option>
//   <option value="16.0">running, 10 mph (6 min/mile)</option>
//   <option value="18.0">running, 10.9 mph (5.5 min/mile)</option>
//   <option value="8.0">running, 5 mph (12 min/mile)</option>
//   <option value="9.0">running, 5.2 mph (11.5 min/mile)</option>
//   <option value="10.0">running, 6 mph (10 min/mile)</option>
//   <option value="11.0">running, 6.7 mph (9 min/mile)</option>
//   <option value="11.5">running, 7 mph (8.5 min/mile)</option>
//   <option value="12.5">running, 7.5 mph (8 min/mile)</option>
//   <option value="13.5">running, 8 mph (7.5 min/mile)</option>
//   <option value="14.0">running, 8.6 mph (7 min/mile)</option>
//   <option value="15.0">running, 9 mph (6.5 min/mile)</option>
//   <option value="9.0">running, cross country</option>
//   <option value="10.0">running, on a track, team practice</option>
//   <option value="15.0">running, stairs, up</option>
//   <option value="8.0">running, training, pushing a wheelchair</option>
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

