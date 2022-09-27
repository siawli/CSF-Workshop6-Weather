import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CityWeather } from '../models';
import { WeatherService } from '../service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  constructor(private weatherSvc: WeatherService) { }

  weatherSvcSub$!: Subscription
  cityWeather!: CityWeather

  ngOnInit(): void {
    this.weatherSvcSub$ = this.weatherSvc.getWeahterSub.subscribe(
      result => this.cityWeather = result
    )
  }

  ngOnDestroy(): void {
    this.weatherSvcSub$.unsubscribe()
  }

}
