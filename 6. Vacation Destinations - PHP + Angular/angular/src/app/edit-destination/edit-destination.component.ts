import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  tourist_targets: string = '';
  cost: number | undefined;
  
  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.destinationId = params['id'];
      this.getDestination(this.destinationId);
    });
  }

  ngOnInit(): void {
  }

  getDestination(id: string | undefined): void {
    this.http.get(`http://localhost/webprogramming/vacationdestinations/php/get.php?id=${id}`).subscribe((response: any) => {
      this.location = response.location;
      this.country = response.country;
      this.description = response.description;
      this.tourist_targets = response.tourist_targets;
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

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const putData = JSON.stringify({
      location: this.location,
      country: this.country,
      description: this.description,
      tourist_targets: this.tourist_targets,
      cost: this.cost
    });

    this.http.put(`http://localhost/webprogramming/vacationdestinations/php/edit.php?id=${this.destinationId}`, putData, httpOptions).subscribe({
      next: (response: any) => {
        alert(response.message);
        this.router.navigate(['/showAll']);
      }, 
      error: (error) => {
        console.log(error);
        alert(error.message);
      },
      complete: () => {
        console.log('Reqeuest completed.');
      }
  
  });}
}
