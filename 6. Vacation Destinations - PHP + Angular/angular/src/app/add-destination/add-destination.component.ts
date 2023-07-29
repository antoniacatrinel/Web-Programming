import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import * as $ from 'jquery';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css']
})
export class AddDestinationComponent implements OnInit {
  location: string = '';
  country: string = '';
  description: string = '';
  tourist_targets: string = '';
  cost: number | undefined;

  constructor(private http: HttpClient, private router: Router) {}

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

    if (!this.tourist_targets) {
      errors.push('Please enter tourist targets.');
    }

    if (!this.cost) {
      errors.push('Please enter a cost.');
    } else if (this.cost != undefined && isNaN(this.cost)) {
      errors.push('Please enter a valid cost.');
    } else if (parseFloat(this.cost.toString()) < 0) {
      errors.push('Please enter a positive cost.');
    }
    
    if (errors.length > 0) {
        alert(errors.join('\n'));
        return;
    }

    const postData = {
      location: this.location,
      country: this.country,
      description: this.description,
      tourist_targets: this.tourist_targets,
      cost: this.cost
    };

    this.http.post('http://localhost/webprogramming/vacationdestinations/php/add.php', postData).subscribe((response: any) => {
      alert(response.message);
      this.router.navigate(['/showAll']);
    }, (error) => {
      console.error(error);
    });
  
  }
}
