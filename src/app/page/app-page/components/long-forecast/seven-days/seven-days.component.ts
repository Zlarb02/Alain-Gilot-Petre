import { Component, Input, SimpleChanges } from '@angular/core';
import { WeatherService } from 'src/app/services/weather.service';
import { Router } from '@angular/router';
import { Daily } from 'src/app/models/weather';

@Component({
  selector: 'app-seven-days',
  templateUrl: './seven-days.component.html',
  styleUrls: ['./seven-days.component.scss']
})
export class SevenDaysComponent {
  @Input() public currentLocation: any | undefined;
  @Input() public chosenLocation: any | undefined;
  @Input() public weather: any | undefined;
  @Input() public getDailyForecast: any;
  @Input() public dailyForecast!: Daily;
  @Input() public dates!: string[];
  @Input() public sevenWeather!: number[];
  @Input() public sevenWeatherDescriptions!: string[];
  @Input() public sevenWeatherIcons!: string[];
  @Input() public sevenWeatherTempMin!: number[];
  @Input() public sevenWeatherTempMax!: number[];
  @Input() public sevenWeatherApparentTempMin!: number[];
  @Input() public sevenWeatherApparentTempMax!: number[];
  @Input() public sevenWeatherPrecipitationProbabilityMean!: number[]

  constructor(private weatherService: WeatherService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentLocation'] && changes['currentLocation'].currentValue) {
      this.getDailyForecast();
    }
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