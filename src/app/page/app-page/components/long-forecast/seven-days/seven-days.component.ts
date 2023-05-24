import { Component, Input, SimpleChanges } from '@angular/core';
import { Daily } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seven-days',
  templateUrl: './seven-days.component.html',
  styleUrls: ['./seven-days.component.scss']
})
export class SevenDaysComponent {
  @Input() currentLocation: any | undefined;
  @Input() public chosenLocation: any | undefined;
  @Input() public weather: any | undefined;
  public dailyForecast!: Daily;
  public dates!: string[];
  public sevenWeather!: number[];
  public sevenWeatherDescriptions!: string[];
  public sevenWeatherIcons!: string[];
  public sevenWeatherTempMin!: number[];
  public sevenWeatherTempMax!: number[];
  public sevenWeatherApparentTempMin!: number[];
  public sevenWeatherApparentTempMax!: number[];
  public sevenWeatherPrecipitationProbabilityMean!: number[]


  constructor(private weatherService: WeatherService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] && changes['currentLocation'].currentValue) {
      this.getDailyForecast();
    }
  }

  getDailyForecast() {
    this.weatherService.getWeatherForecast(this.currentLocation.lat, this.currentLocation.lon)
      .subscribe(
        (weather) => {
          this.dates = weather.daily.time;
          this.sevenWeatherTempMin = weather.daily.temperature_2m_min;
          this.sevenWeatherTempMax = weather.daily.temperature_2m_max;
          this.sevenWeatherApparentTempMin = weather.daily.apparent_temperature_min;
          this.sevenWeatherApparentTempMax = weather.daily.apparent_temperature_max;
          this.sevenWeatherPrecipitationProbabilityMean = weather.daily.precipitation_probability_mean;
          this.sevenWeatherDescriptions = weather.daily.weathercode.map(code => this.weatherService.getWeatherDescription(code));
          this.sevenWeatherIcons = weather.daily.weathercode.map(code => this.weatherService.getWeatherIcon(code));
          return this.dailyForecast = weather.daily;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  formatDate(date: string): string {
    const weekdays = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];

    const dateObj = new Date(date);
    const dayOfWeek = weekdays[dateObj.getDay()];
    const dayOfMonth = dateObj.getDate();
    const month = months[dateObj.getMonth()];

    return `${dayOfWeek} ${dayOfMonth} ${month}`;
  }

  navigateToDay(i: number) {
    const dayIndex = i + 1;
    this.router.navigateByUrl('/day/' + dayIndex);
  }
}