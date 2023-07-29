import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-browse-by-country',
  templateUrl: './browse-by-country.component.html',
  styleUrls: ['./browse-by-country.component.css']
})
export class BrowseByCountryComponent {
  countries: any[] = [];
  destinations: any[] = [];
  selectedCountry: string = '';
  limit: number = 4;
  offset: number = 0;
  disablePrevious: boolean = true;
  disableNext: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost/webprogramming/vacationdestinations/php/getCountries.php').subscribe((data: any[]) => {
      this.countries = data;
    });
  }

  loadDestinations(): void {
    this.http
      .get<any[]>(`http://localhost/webprogramming/vacationdestinations/php/getByCountry.php?country=${this.selectedCountry}&limit=${this.limit}&offset=${this.offset}`)
      .subscribe((data: any[]) => {
        this.destinations = data;
        this.disableNext = data.length < this.limit;
      });
  }

  onCountryChange(country: string): void {
    this.selectedCountry = country;
    this.offset = 0;
    this.disablePrevious = true;
    this.loadDestinations();
  }

  nextPage(): void {
    this.offset += this.limit;
    this.disablePrevious = false;
    this.loadDestinations();
  }

  previousPage(): void {
    this.offset -= this.limit;
    if (this.offset <= 0) {
      this.offset = 0;
      this.disablePrevious = true;
    }
    this.loadDestinations();
  }
}