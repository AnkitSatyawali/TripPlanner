import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { MatDialog } from '@angular/material/dialog';
import { ApisService } from '../../services/apis.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { LoaderComponent } from '../loader/loader.component';
@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css']
})
export class InputBoxComponent implements OnInit {
words=['P','L','A','N',' ','Y','O','U','R',' ','D','A','Y'];
place:String;
show=true;
lati;
long;
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
data2;
isNavOpen=true;
locations=[];

cafeloc={
	lat:Number,
	long:Number
};
funloc={
	lat:Number,
	long:Number
};
lunchloc={
	lat:Number,
	long:Number
};
shoppingloc={
	lat:Number,
	long:Number
};
dinnerloc={
	lat:Number,
	long:Number
};
publoc={
	lat:Number,
	long:Number
};
op;
cafeimage;
funimage;
lunchimage;
shoppingimage;
dinnerimage;
pubimage;
map: mapboxgl.Map;
  constructor(public dialog: MatDialog,private snackBar: MatSnackBar,private latiLangService:ApisService) { 
  		this.op=new Array(7);
  		for (var i = 0; i < this.op.length; i++) { 
    this.op[i] = new Array(2); 
} 
console.log(typeof(this.op));

  }
  
  style = 'mapbox://styles/mapbox/dark-v10';
  lat = 0;
  lng = 0;
  ngOnInit() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
      this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 1,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());
    this.map.addControl(new mapboxgl.GeolocateControl({
positionOptions: {
enableHighAccuracy: true
},
trackUserLocation: true
}));
  }
  onSubmit(){
  	console.log(this.place);
  	this.latiLangService.findLatLan(this.place).subscribe(data=>{
  		if(data.features.length>0){
  		this.lati = data.features[0].center[0];
  		this.long = data.features[0].center[1];
  		console.log(this.lati,this.long);
  		this.data2={
  			longitude:this.long,
  			latitude:this.lati
  		}
  		var d = {
  			lat:this.long,
  			long:this.lati
  		}
  		this.op[0][1]=this.long;
  		this.op[0][0]=this.lati;
  		this.locations.push(d);
  		this.show=false;
  		this.getData(this.place);
  		this.drawline();
  		const dialogRef = this.dialog.open(LoaderComponent,{
  			data:{latitude:this.lati,longitude:this.long}
  		});
	    dialogRef.afterClosed().subscribe(result => {
	      console.log("The dialog was closed");
	    });
        }
        else{
        	this.snackBar.open("Enter a valid place name" , "close",{duration: 5000});
        }
  	},err=>{
  		console.log(err);
  	});
  }
getData(place){
  	this.pubname="pop";
  	this.latiLangService.findCafe(this.data2).subscribe(data => {
      	
      	
      	var nm = data.response.groups[0].items[0].venue.name;
      	this.cafeaddress = data.response.groups[0].items[0].venue.location.address;
      	// console.log(this.cafename); 
      	this.cafename=nm;
      	this.cafeloc.lat=data.response.groups[0].items[0].venue.location.lat;
      	this.cafeloc.long=data.response.groups[0].items[0].venue.location.lng;
      	this.locations.push(this.cafeloc);
      	this.op[1][1]=this.cafeloc.lat;
      	this.op[1][0]=this.cafeloc.long;
      	var id = data.response.groups[0].items[0].venue.id;
      	console.log(data);
      },err => {
      	console.log(err);
      })
      this.latiLangService.findFunPlaces(this.data2).subscribe(data => {
        this.funname = data.response.groups[0].items[0].venue.name;
      	this.funaddress = data.response.groups[0].items[0].venue.location.address;
      	console.log(data);
      	this.funloc.lat=data.response.groups[0].items[0].venue.location.lat;
      	this.funloc.long=data.response.groups[0].items[0].venue.location.lng;
      	this.locations.push(this.funloc);
      	this.op[2][1]=this.funloc.lat;
      	this.op[2][0]=this.funloc.long;
      })
      this.latiLangService.findLunch(this.data2).subscribe(data =>{
      	this.lunchname = data.response.groups[0].items[0].venue.name;
      	this.lunchaddress = data.response.groups[0].items[0].venue.location.address;
      	// console.log(this.lunch);
      	this.lunchloc.lat=data.response.groups[0].items[0].venue.location.lat;
      	this.lunchloc.long=data.response.groups[0].items[0].venue.location.lng;
      	this.locations.push(this.lunchloc);
      	this.op[3][1]=this.lunchloc.lat;
      	this.op[3][0]=this.lunchloc.long;
      })
      this.latiLangService.findShopping(this.data2).subscribe(data =>{
      	this.shoppingname = data.response.groups[0].items[0].venue.name;
      	this.shoppingaddress = data.response.groups[0].items[0].venue.location.address;
      	// console.log(this.shopping);
      	this.shoppingloc.lat=data.response.groups[0].items[0].venue.location.lat;
      	this.shoppingloc.long=data.response.groups[0].items[0].venue.location.lng;
      	this.locations.push(this.shoppingloc);
      	this.op[4][1]=this.shoppingloc.lat;
      	this.op[4][0]=this.shoppingloc.long;
      })
      this.latiLangService.findDinner(this.data2).subscribe(data => {
      	this.dinnername = data.response.groups[0].items[0].venue.name;
      	this.dinneraddress = data.response.groups[0].items[0].venue.location.address;
      	// console.log(this.dinner);
      	this.dinnerloc.lat=data.response.groups[0].items[0].venue.location.lat;
      	this.dinnerloc.long=data.response.groups[0].items[0].venue.location.lng;
      	this.locations.push(this.dinnerloc);
      	this.op[5][1]=this.dinnerloc.lat;
      	this.op[5][0]=this.dinnerloc.long;
      })
      this.latiLangService.findPub(this.data2).subscribe(data => {
      	this.pubname = data.response.groups[0].items[0].venue.name;
      	this.pubaddress = data.response.groups[0].items[0].venue.location.address;
      	console.log(this.pubname);
      	console.log(this.pubaddress);
      	this.publoc.lat=data.response.groups[0].items[0].venue.location.lat;
      	this.publoc.long=data.response.groups[0].items[0].venue.location.lng;
      	this.locations.push(this.publoc);
      	console.log(this.locations);
      	this.op[6][1]=this.publoc.lat;
      	this.op[6][0]=this.publoc.long;
      	console.log(data);
      })
  }
  openclosenav(){
	this.isNavOpen = !this.isNavOpen;
  }
  drawline()
  {
  	
  	var array = new Array(7);
  	for(var i=0;i<array.length;i++)
  	{
  		array[i] = new Array(2);
  		array[i] = this.op[i];
  	}
  	console.log(typeof(array))
  	console.log(array);

  	this.map.flyTo({center:[this.op[0][0],this.op[0][1]],zoom:13});
  	this.map.addLayer({
"id": "route",
"type": "line",
"source": {
"type": "geojson",
"data": {
"type": "Feature",
"properties": {},
"geometry": {
"type": "LineString",
"coordinates":  [ [77.2, 28.7],
[77.20171940298643, 28.681587650228284],
[77.15818948026143, 28.703045378352055],
[77.20494771461874, 28.693244735370346],
[77.2029447555542, 28.684488757456002],
[77.20494771461874, 28.693244735370346],
[77.18524530855996, 28.69657730583533]]
}
}
},
"layout": {
"line-join": "round",
"line-cap": "round"
},
"paint": {
"line-color": "green",
"line-width": 8
}
});
  }
}
