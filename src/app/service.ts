import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, Subject } from "rxjs";
import { CityWeather } from "./models";

@Injectable()
export class WeatherService {

    constructor(private httpClient: HttpClient) { }

    cityWeather!: CityWeather

    getWeahterSub = new Subject<CityWeather>();

    public getWeather(city: string): Promise<any> {

        const params = new HttpParams()
            .set("q", city)
            .set("appid", "cab540c91275ff0c863c36f0cc9ee214")

        const url = "https://api.openweathermap.org/data/2.5/weather"

        console.info(">>>> in weather service")

        return firstValueFrom(
            this.httpClient.get<any>(url, {params})
                // .pipe(
                //     result => {
                //         const weatherArr = result.weather;
                //         weatherArr.map((v: any) => {
                //             this.cityWeather.main = v.main
                //             this.cityWeather.description = v.description;
                //             this.cityWeather.icon = v.icon;
                //         })
                //         const mainObj = result.main;
                //         this.cityWeather.temp = mainObj.temp;
                //         this.cityWeather.feelsLike = mainObj.feels_like;

                //         return this.cityWeather;
                //     }
                // )
        )

    }

}