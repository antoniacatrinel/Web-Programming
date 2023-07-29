import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-destination',
  templateUrl: './delete-destination.component.html',
  styleUrls: ['./delete-destination.component.css']
})
export class DeleteDestinationComponent implements OnInit {
  destinationId: string | undefined;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      this.destinationId = params['id'];
      console.log(this.destinationId);
    });
  }

  ngOnInit(): void {
  }

  onDeleteConfirmed(): void {
    this.http.delete(`http://localhost/webprogramming/vacationdestinations/php/delete.php?id=${this.destinationId}`).subscribe(() => {
    
    });
    this.router.navigate(['/showAll']);
  }

  onCancel(): void {
    this.router.navigate(['/showAll']);
  }

}
