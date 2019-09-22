import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApisService {

  constructor(private http:HttpClient) { }
  findLatLan(loc):Observable<any>
  {
  	var replaced = loc.split(' ').join('+');
  	console.log(loc);
  	return this.http.get<any>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${replaced}.json?access_token=pk.eyJ1Ijoic3Vtc3RkIiwiYSI6ImNqdTE2emlveDA1eWs0NGxucDBhaTg2am0ifQ.Y0KAJe1Xi13MU1G9e7vV-w`)
  }
  findCafe(loc):Observable<any>
  {
  	return this.http.get<any>(`https://api.foursquare.com/v2/venues/explore?client_id=S2GJL4EXHEBHUOB4NPHBZWVUMT15SEO5E1FYWUFIECLF2JA5&client_secret=SPBX024IS1MKRJQGGXZ12BQTF2TGRKXGRZ5P003M0W2ZVQBT&v=20180323&limit=1&ll=${loc.longitude},${loc.latitude}&query=breakfast&intent=browse&%20radius=500`);
  }
  findFunPlaces(loc):Observable<any>
  {
  	return this.http.get<any>(`https://api.foursquare.com/v2/venues/explore?client_id=S2GJL4EXHEBHUOB4NPHBZWVUMT15SEO5E1FYWUFIECLF2JA5&client_secret=SPBX024IS1MKRJQGGXZ12BQTF2TGRKXGRZ5P003M0W2ZVQBT&v=20180323&limit=1&ll=${loc.longitude},${loc.latitude}&query=fun&intent=browse&%20radius=500`);
  }
  findLunch(loc):Observable<any>
  {
  	return this.http.get<any>(`https://api.foursquare.com/v2/venues/explore?client_id=S2GJL4EXHEBHUOB4NPHBZWVUMT15SEO5E1FYWUFIECLF2JA5&client_secret=SPBX024IS1MKRJQGGXZ12BQTF2TGRKXGRZ5P003M0W2ZVQBT&v=20180323&limit=1&ll=${loc.longitude},${loc.latitude}&query=lunch&intent=browse&%20radius=500`);
  }
  findShopping(loc):Observable<any>
  {
  	return this.http.get<any>(`https://api.foursquare.com/v2/venues/explore?client_id=S2GJL4EXHEBHUOB4NPHBZWVUMT15SEO5E1FYWUFIECLF2JA5&client_secret=SPBX024IS1MKRJQGGXZ12BQTF2TGRKXGRZ5P003M0W2ZVQBT&v=20180323&limit=1&ll=${loc.longitude},${loc.latitude}&query=shopping&intent=browse&%20radius=500`);
  }
  findDinner(loc):Observable<any>
  {
  	return this.http.get<any>(`https://api.foursquare.com/v2/venues/explore?client_id=S2GJL4EXHEBHUOB4NPHBZWVUMT15SEO5E1FYWUFIECLF2JA5&client_secret=SPBX024IS1MKRJQGGXZ12BQTF2TGRKXGRZ5P003M0W2ZVQBT&v=20180323&limit=1&ll=${loc.longitude},${loc.latitude}&query=dinner&intent=browse&%20radius=500`);
  }
  findPub(loc):Observable<any>
  {
  	return this.http.get<any>(`https://api.foursquare.com/v2/venues/explore?client_id=S2GJL4EXHEBHUOB4NPHBZWVUMT15SEO5E1FYWUFIECLF2JA5&client_secret=SPBX024IS1MKRJQGGXZ12BQTF2TGRKXGRZ5P003M0W2ZVQBT&v=20180323&limit=1&ll=${loc.longitude},${loc.latitude}&query=nightlife&intent=browse&%20radius=500`);
  }
}
