import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../AuthService';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css']
})
export class AddDestinationComponent implements OnInit {
  location: string = '';
  country: string = '';
  description: string = '';
  touristTargets: string = '';
  cost: number | undefined;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
  }

  addDestination(): void {
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

    const postData = {
      location: this.location,
      country: this.country,
      description: this.description,
      touristTargets: this.touristTargets,
      cost: this.cost
    };

    // Retrieve the token from AuthService
    const token = this.authService.getToken(); 

    // Include the token in the request headers
    const headers = {
      Authorization: `Bearer ${token}` 
    };

    this.http.post('https://localhost:7114/api/Destinations', postData, { headers }).subscribe(
    (response: any) => {
      
      this.router.navigate(['/showAll']);
    },
    (error) => {
      alert(error.error);
      alert(error.message);
      console.error(error);
    }
  );
  
  }
}
