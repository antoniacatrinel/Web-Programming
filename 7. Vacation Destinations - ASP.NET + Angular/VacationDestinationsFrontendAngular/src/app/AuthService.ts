import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getToken(): string | null {
    // Retrieve the token from storage
    return localStorage.getItem('token');
  }
}
