import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../user';

interface LoginResponse {
  foundUser: User;
  token: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {}

  login() {
    const errors: string[] = [];

    if (!this.username) {
      errors.push('Please enter a username.');
    }

    if (!this.password) {
      errors.push('Please enter a password.');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    const postData = {
      username: this.username,
      password: this.password
    };

    this.http.post<LoginResponse>('https://localhost:7114/api/Users/login', postData)
      .subscribe(
        response => {
          // Store the token and user information in local storage or a secure storage mechanism
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.foundUser));

          if (response.foundUser == null) {
            errors.push('Invalid username or password.');
            alert(errors.join('\n'));
            return;
          }

          this.router.navigate(['/showAll']);
        },
        (error: HttpErrorResponse) => {
          if (error.status === 401) {
            errors.push('Invalid username or password.');
          } else {
            errors.push('An error occurred during login.');
          }
          alert(errors.join('\n'));
          console.error(error);
        }
      );
  }
}