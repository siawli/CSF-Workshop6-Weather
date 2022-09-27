import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ignoreElements } from 'rxjs';
import { CityWeather } from '../models';
import { WeatherService } from '../service';

@Component({
  selector: 'app-list-countries',
  templateUrl: './list-countries.component.html',
  styleUrls: ['./list-countries.component.css']
})
export class ListCountriesComponent implements OnInit {

  countries!: string[] | undefined;

  cityWeather: CityWeather = {
    city: "",
    main: "",
    description: "",
    icon: "",
    temp: 0,
    feelsLike: 0
  }

  form!: FormGroup

  constructor(private fb: FormBuilder, private weatherSvc: WeatherService) { }

  ngOnInit(): void {
      this.form = this.createForm();
      this.countries = localStorage.getItem("countries")?.split(',')
  }

  createForm() {
    return this.fb.group({
      city: this.fb.control<string>('', [Validators.required, Validators.minLength(3)])
    })
  }

  processForm() {
    const city = this.form.get("city")?.value
    if (!this.countries?.includes(city)) 
      this.countries = [...this.countries || [], city]
    localStorage.setItem("countries", this.countries.toString())
    // console.info(">>>>>> city: " + city);
    this.form.reset();
  }
}
