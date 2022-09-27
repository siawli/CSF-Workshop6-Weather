import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { Router, RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { WeatherComponent } from './components/weather.component';
import { WeatherService } from './service';
import { ListCountriesComponent } from './components/list-countries.component';

const appRoutes: Routes = [
  {path: '', component: ListCountriesComponent},
  {path: 'weather/:city', component: WeatherComponent},
  {path: '**', redirectTo: '/', pathMatch: 'full'}
]


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ListCountriesComponent
  ],
  imports: [
    BrowserModule, FormsModule,
    ReactiveFormsModule, HttpClientModule,
    RouterModule.forRoot(appRoutes)
    
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
