import { Component } from '@angular/core';

import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signup',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm: FormGroup;
  isLoading: boolean = false;
  errorMessage: null | string = null;
  
  constructor(private fb: FormBuilder,  private http: HttpClient) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      full_name: ['', Validators.required],
      email: ['',   Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });
  }

  onSubmit(): void {
    if (this.signupForm.invalid) {
      return;
    }
    this.isLoading = true;
    this.errorMessage = null;
    const formData = this.signupForm.value;

    this.http.post(`${environment.apiBaseUrl}/user/signup`, formData).subscribe({
      next: (response) => {
        console.log('Signup successful:', response);
        // Optionally, you might navigate to the login page or show a success message.
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.errorMessage = 'Signup failed. Please try again.';
        this.isLoading = false;
      }
    });
  }
}
