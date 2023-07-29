import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-edit-destination',
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.css']
})
export class EditDestinationComponent implements OnInit {
  destinationId: string | undefined;
  location: string = '';
  country: string = '';
  description: string = '';
  touristTargets: string = '';
  cost: number | undefined;
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    this.route.queryParams.subscribe(params => {
      this.destinationId = params['id'];
      console.log(this.destinationId);
      this.getDestination(this.destinationId);
    });
  }

  ngOnInit(): void {
  }

  getDestination(id: string | undefined): void {
    // Retrieve the token from AuthService
    const token = this.authService.getToken(); 

    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get(`https://localhost:7114/api/Destinations/${id}`, { headers }).subscribe((response: any) => {
      this.location = response.location;
      this.country = response.country;
      this.description = response.description;
      this.touristTargets = response.touristTargets;
      this.cost = response.cost;
    }, (error: any) => {
      alert(error.message);
    });
  }

  editDestination(): void {
    const errors = [];

    if (!this.location) {
      errors.push('Please enter a location.');
    }

    if (!this.country) {
      errors.push('Please enter a country.');
    }

    if (!this.description) {
      errors.push('Please enter a description.');
    }

    if (!this.touristTargets) {
      errors.push('Please enter tourist targets.');
    }

    if (!this.cost) {
      errors.push('Please enter a cost.');
    } else if (this.cost != undefined && isNaN(this.cost)) {
      errors.push('Please enter a valid cost.');
    } else if (parseFloat(this.cost.toString()) < 0) {
      errors.push('Please enter a positive cost.');
    }
    
    /*if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }*/

    // Retrieve the token from AuthService
    const token = this.authService.getToken(); 

    // Include the token in the request headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const putData = JSON.stringify({
      id: this.destinationId,
      location: this.location,
      country: this.country,
      description: this.description,
      touristTargets: this.touristTargets,
      cost: this.cost
    });

    this.http.put(`https://localhost:7114/api/Destinations/${this.destinationId}`, putData, { headers }).subscribe(
      (response: any) => {
        console.log(this.destinationId);
        this.router.navigate(['/showAll']);
      }, 
      (error) => {
        console.log(error);
        alert(error.message);
      }
  
  );}
}
