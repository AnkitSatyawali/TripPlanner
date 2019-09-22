import { Component, OnInit } from '@angular/core';
import { SubService } from '../../services/sub.service';
import { ApisService } from '../../services/apis.service';
import {ChangeDetectorRef} from '@angular/core'
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
places=[1,2,3,4,5,6];
cafename;
cafeaddress;
funname;
funaddress;
lunchname;
lunchaddress;
shoppingname;
shoppingaddress;
dinnername;
dinneraddress;
pubname;
pubaddress:any;
show=false;
data;
  constructor(private ref: ChangeDetectorRef,private apiService: ApisService,private subService : SubService) { }

  ngOnInit() {
  	this.subService.userInfo.subscribe(data =>{
  	  console.log("what");
      this.data=data;
      this.getData();
  })
      
      
      console.log(this.show);
   
  }
  getData(){
  	this.pubname="pop";
  	this.apiService.findCafe(this.data).subscribe(data => {
      	
      	
      	var nm = data.response.groups[0].items[0].venue.name;
      	this.cafeaddress = data.response.groups[0].items[0].venue.location.address;
      	// console.log(this.cafename); 
      	this.cafename=nm;
      	
      	
      },err => {
      	console.log(err);
      })
      this.apiService.findFunPlaces(this.data).subscribe(data => {
        this.funname = data.response.groups[0].items[0].venue.name;
      	this.funaddress = data.response.groups[0].items[0].venue.location.address;
      	// console.log(this.fun);
      })
      this.apiService.findLunch(this.data).subscribe(data =>{
      	this.lunchname = data.response.groups[0].items[0].venue.name;
      	this.lunchaddress = data.response.groups[0].items[0].venue.location.address;
      	// console.log(this.lunch);
      })
      this.apiService.findShopping(this.data).subscribe(data =>{
      	this.shoppingname = data.response.groups[0].items[0].venue.name;
      	this.shoppingaddress = data.response.groups[0].items[0].venue.location.address;
      	// console.log(this.shopping);
      })
      this.apiService.findDinner(this.data).subscribe(data => {
      	this.dinnername = data.response.groups[0].items[0].venue.name;
      	this.dinneraddress = data.response.groups[0].items[0].venue.location.address;
      	// console.log(this.dinner);
      })
      this.apiService.findPub(this.data).subscribe(data => {
      	this.pubname = data.response.groups[0].items[0].venue.name;
      	this.pubaddress = data.response.groups[0].items[0].venue.location.address;
      	console.log(this.pubname);
      	
      })
  }

}
