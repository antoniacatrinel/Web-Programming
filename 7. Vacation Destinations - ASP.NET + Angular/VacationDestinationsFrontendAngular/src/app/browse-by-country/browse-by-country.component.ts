import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';
import { Destination } from '../destination';

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

  currentPage: number = 0;
  totalPages: number = 0;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    // Retrieve the token from AuthService
    const token = this.authService.getToken(); 
  
    // Include the token in the request headers
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}` 
    });
  
    this.http.get<any[]>('https://localhost:7114/api/Destinations/countries', { headers }).subscribe((data: any[]) => {
      this.countries = data;
    });
  }  

  loadDestinations(): void {
    const limit: number = 4;
    const offset: number = this.currentPage * limit;

    // Retrieve the token from AuthService
    const token = this.authService.getToken(); 

    // Include the token in the request headers
    const headers = {
      Authorization: `Bearer ${token}` 
    };

    this.http.get<number>(`https://localhost:7114/api/Destinations/filter/count/${limit}?country=${this.selectedCountry}`, { headers })
    .subscribe((totalPages: number) => {
      this.totalPages = totalPages;
    }, (error) => {
      console.error(error);
    });

    this.http.get<any>(`https://localhost:7114/api/Destinations/filter/${this.currentPage}/${limit}?country=${this.selectedCountry}`, { headers })
      .subscribe((data: Destination[]) => {
        this.destinations = data;
      }, (error) => {
        console.error(error);
      });
  }

  onCountryChange(country: string): void {
    this.selectedCountry = country;
    this.offset = 0;
    this.disablePrevious = true;
    this.loadDestinations();
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadDestinations();
    }
  }

  onPrevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadDestinations();
    }
  }
}