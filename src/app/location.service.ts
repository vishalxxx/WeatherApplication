import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


// Api used here are 
// ipify for getting ip of clint
// ip-api.com for getting city from ip address
// Openweather for getting weather from city name


@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http:HttpClient) { }

  
  API:string="fc499d451e009cfdbd6638c3907abc4c";
  city="";
  constcity:string="hello";
  url="https://api.openweathermap.org/data/2.5/weather?q="+this.city+"&appid="+this.API;
  ipfyurl="https://api.ipify.org?format=json";
 
  
  ip:any;
  

  getLocation(city:any,lat?:any,lon?:any){
    
    if(lat){

      return this.http.get("api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+this.API);
    }
      
      return this.http.get("https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+this.API);
    
  }

  getip(){
      
    return this.http.get(this.ipfyurl);
      
      //  this.http.get(this.ipapiurl+this.ip).subscribe(data=>{

      //    this.city = JSON.parse(JSON.stringify(data)).city;
      //     // this.getLocation(this.city);
      //     // const citydata = this.city;
            
          
      //  });
    
  
   
    
  }




}
