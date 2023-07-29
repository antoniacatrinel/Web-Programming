import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-delete-destination',
  templateUrl: './delete-destination.component.html',
  styleUrls: ['./delete-destination.component.css']
})
export class DeleteDestinationComponent implements OnInit {
  destinationId: string | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
    this.route.queryParams.subscribe(params => {
      this.destinationId = params['id'];
      console.log(this.destinationId);
    });
  }

  ngOnInit(): void {
  }

  onDeleteConfirmed(): void {
    // Retrieve the token from AuthService
    const token = this.authService.getToken(); 

    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.delete(`https://localhost:7114/api/Destinations/${this.destinationId}`, { headers })
      .subscribe(() => {
    
    });
    this.router.navigate(['/showAll']);
  }

  onCancel(): void {
    this.router.navigate(['/showAll']);
  }

}
