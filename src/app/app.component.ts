import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { CityWeather } from './models';
import { WeatherService } from './service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'w6Weather';

  form!: FormGroup;
  cityWeather: CityWeather = {
    city: "",
    main: "",
    description: "",
    icon: "",
    temp: 0,
    feelsLike: 0
  }

  constructor(private fb: FormBuilder, private weatherSvc: WeatherService) { }

  ngOnInit(): void {
      this.form = this.createForm();
  }

  createForm() {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required, Validators.minLength(3)])
    })
  }

  processForm() {
    const city = this.form.get("city")?.value;
    // console.info(">>>>>> city: " + city);
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
      })
      .catch(error => {
        console.info(error);
      })
      this.form.reset();
  }

  
}
