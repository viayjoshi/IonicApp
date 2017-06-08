import { Component ,ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import { NavController,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 userName:string;
 userAge:number;
 userGender:string;
 userHeight:string;
 userWeight:number;
  constructor(public navCtrl: NavController,private platform: Platform,public storage: Storage) {
   
    platform.ready().then(() => {
      this.storage.get('info').then((val)=>{
        if(val!=null){
          this.userName=val.name;
          this.userAge=parseInt(val.age);
          this.userGender=val.gender;
          this.userHeight=val.height;
          this.userWeight=val.weight;
         }
       });
     });
  }

  save(){
    if(this.userName && this.userAge && this.userGender && this.userHeight && this.userWeight){
      let obj={
        name:this.userName,
        age:this.userAge,
        gender:this.userGender,
        height:this.userHeight,
        weight:this.userWeight
      }
      this.storage.set('info',obj);
      this.storage.get('info').then((val)=>{
        console.log(val);
      });
    }    
  }

}
