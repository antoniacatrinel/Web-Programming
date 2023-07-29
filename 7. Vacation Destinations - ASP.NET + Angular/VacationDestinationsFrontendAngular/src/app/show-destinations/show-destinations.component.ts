import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../AuthService';
import { Destination } from '../destination';

@Component({
  selector: 'app-show-destinations',
  templateUrl: './show-destinations.component.html',
  styleUrls: ['./show-destinations.component.css']
})
export class ShowDestinationsComponent implements OnInit {
  destinations: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  
  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.getDestinations();
  }

  getDestinations(): void {
    const limit: number = 4;
    const offset: number = this.currentPage * limit;

    // Retrieve the token from AuthService
    const token = this.authService.getToken(); 

    // Include the token in the request headers
    const headers = {
      Authorization: `Bearer ${token}` 
    };

    this.http.get<number>(`https://localhost:7114/api/Destinations/count/${limit}`, { headers })
    .subscribe((totalPages: number) => {
      this.totalPages = totalPages;
    }, (error) => {
      console.error(error);
    });

    this.http.get<any>(`https://localhost:7114/api/Destinations/${this.currentPage}/${limit}`, { headers })
      .subscribe((data: Destination[]) => {
        this.destinations = data;
      }, (error) => {
        console.error(error);
      });
  }

  onAddClick(): void {
    this.router.navigate(['/add']);
  }

  onDeleteClick(destinationId: string): void {
    this.router.navigate(['/delete', destinationId]);
  }

  onBrowseClick(): void {
    this.router.navigate(['/browseByCountry']);
  }

  onNextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getDestinations();
    }
  }

  onPrevPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.getDestinations();
    }
  }
}
