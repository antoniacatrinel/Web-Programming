import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-destinations',
  templateUrl: './show-destinations.component.html',
  styleUrls: ['./show-destinations.component.css']
})
export class ShowDestinationsComponent implements OnInit {
  destinations: any[] = [];
  currentPage: number = 0;
  totalPages: number = 0;
  
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.getDestinations();
  }

  getDestinations(): void {
    const limit: number = 4;
    const offset: number = this.currentPage * limit;
    this.http.get<any>('http://localhost/webprogramming/vacationdestinations/php/getAll.php', { params: { limit: limit.toString(), offset: offset.toString() } })
      .subscribe(data => {
        this.destinations = data.destinations;
        this.totalPages = Math.ceil(data.total / limit);
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
