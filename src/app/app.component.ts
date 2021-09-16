import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

import { Component, OnInit } from '@angular/core';

import { LocationService } from './location.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  //Properties Declaration
  title = 'Weather';
  
  Api = "fc499d451e009cfdbd6638c3907abc4c";
  city="";
  url="https://api.openweathermap.org/data/2.5/weather?q="+this.city+"&appid="+this.Api;
  ipapiurl="http://ip-api.com/json/";
  Ip="";
  response:any;
  lat:any;
  lon:any;
 
  src="";
  
  desc:string="";
  windspeed:any;
  humidity:any;
  place:any;
  placehead:any;


  constructor(private service:LocationService, private http:HttpClient){   
    
      this.getbyiplocation();

   }

  //Image Array
    images:{start:number,end:number,src:string}[]=[

      {start:200,end:232,src:"../assets/images/tstorm.png"},//thunderstorm
      {start:300,end:321,src:"../assets/images/Rain.png"},//Drizzle
      {start:500,end:531,src:"../assets/images/Rain.png"},//Rain
      {start:600,end:622,src:"../assets/images/snow.png"},//Snow
      {start:701,end:781,src:"../assets/images/overcast.png"},//Atmosphere
      {start:800,end:800,src:"../assets/images/sunny.png"},//Clear
      {start:801,end:804,src:"../assets/images/cloudy.png"}//Clouds
      


    ]



  ngOnInit(){

    // this.service.getLocation().subscribe(data=>{

    //     this.id = JSON.parse(JSON.stringify(data)).weather[0].id;
      
    //     console.log(this.id);
         
    // })

        

    
        

  }

  buttonclick(input:string){

    this.city = input;
    console.log(this.city);
    this.url="https://api.openweathermap.org/data/2.5/weather?q="+this.city+"&appid="+this.Api;
    this.getbycity();
    
  
    
  }


  getbycity(city?:any,lat?:any,Lon?:any){
    

    if(city){

      
        this.service.getLocation(city).subscribe(data=>{
       
        this.response = JSON.parse(JSON.stringify(data));
        this.showicon(this.response.weather[0].id);
        this.desc=this.response.weather[0].description;
        this.windspeed = this.response.wind.speed;
        this.humidity = this.response.main.humidity;
        this.place = this.response.name;

        this.placehead = "You Are Here";
       
        
        
      });


    }
    
      
    else{
    this.service.getLocation(this.city).subscribe(data=>{

      this.response = JSON.parse(JSON.stringify(data));
      this.showicon(this.response.weather[0].id);
      this.desc=this.response.weather[0].description;
      this.windspeed = this.response.wind.speed;
      this.humidity = this.response.main.humidity;
      this.place = this.response.name;
      this.placehead = "Place";
     



    }, error=>{
          this.src = "../assets/what.png";    
          this.desc = "--";
          this.windspeed="--";
          this.humidity="--";
          this.place="Not Known";
            
  
          });

    }

      // this.http.get(this.url).subscribe(data=>{
        
      //       this.response = JSON.parse(JSON.stringify(data));
      //       this.showicon(this.response.weather[0].id);
      //       this.desc=this.response.weather[0].description;
      //       this.windspeed = this.response.wind.speed;
      //       this.humidity = this.response.main.humidity;
            
      //       console.log(this.response);
      //       console.log(this.response.weather[0].description);

      // });
      
      
  }

  getbyiplocation(){


      this.service.getip().subscribe(ip=>{

        this.Ip = JSON.parse(JSON.stringify(ip)).ip;
        this.http.get(this.ipapiurl + this.Ip).subscribe(city=>{

          const cityget = JSON.parse(JSON.stringify(city)).city;
          const lat = JSON.parse(JSON.stringify(city)).lat;
          const lon = JSON.parse(JSON.stringify(city)).lon;


          this.getbycity(cityget,lat,lon);
        });
      });

      
  }
      

     


  showicon(id:any){

    let i:number=0;
      while(i<this.images.length){

          if( id >= this.images[i].start && id <= this.images[i].end ){this.src=this.images[i].src;}
          i++;

      }
    

  }



}
