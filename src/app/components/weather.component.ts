import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CityWeather } from '../models';
import { WeatherService } from '../service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  constructor(private weatherSvc: WeatherService,
              private activatedRoute: ActivatedRoute) { }

  cityWeather: CityWeather = {
    city: "",
    main: "",
    description: "",
    icon: "",
    temp: 0,
    feelsLike: 0
  }

  ngOnInit(): void {
    const city = this.activatedRoute.snapshot.params['city'];
    console.info(">>>>> city component: " + city)
    this.weatherSvc.getWeather(city)
      .then(result => {
        // console.info(">>>>> result: " + JSON.stringify(result))
        const weatherArr = result.weather;
        // console.info(">>>>> weatherArr: " + JSON.stringify(weatherArr))

          weatherArr.map((v: any) => {
            // console.info(">>>> JsonObj in JsonArr: " + JSON.stringify(v))
            // console.info(">>> main: " + JSON.stringify(v.main))
            // this.cityWeather.main = JSON.stringify(v.main)
            this.cityWeather.main = v.main;
            // console.info(">>>>> cityWeatherMain: " + this.cityWeather.main)
            this.cityWeather.description = v.description;
            this.cityWeather.icon = v.icon;
          })
            const mainObj = result.main;
            this.cityWeather.temp = mainObj.temp;
            this.cityWeather.feelsLike = mainObj.feels_like;
            this.cityWeather.city = city;

            this.weatherSvc.getWeahterSub.next(this.cityWeather);
            console.log(">>>> description: " + this.cityWeather.description)
            console.log(">>>>> inside Promise then ")
      })
      .catch(error => {
        console.info(error);
      })
  }
}
