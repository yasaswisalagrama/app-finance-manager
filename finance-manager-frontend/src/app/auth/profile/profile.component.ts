import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { CommonModule, DatePipe } from '@angular/common';

export interface UserProfile {
  username: string;
  email: string;
  full_name: string;
  id: number;
  created_at: Date;
  updated_at: Date;
}


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  imports: [
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    DatePipe
   ]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  user!: UserProfile;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // Load user profile and then initialize the form.
    this.authService.getProfile().subscribe((user: UserProfile) => {
      console.log('User profile:', user);
      this.user = user;
      this.initializeForm();
    });
  }

  /**
   * Initialize the profile form with user data.
   */
  initializeForm(): void {
    this.profileForm = this.fb.group({
      email: [{ value: this.user.email, disabled: true }, [Validators.required, Validators.email]],
      name: [this.user.full_name, Validators.required]
    });
  }

  /**
   * Called when the form is submitted.
   */
  onSubmit(): void {
    if (this.profileForm.valid) {
      // Implement update profile logic here (e.g., send update request to backend)
      console.log('Profile updated:', this.profileForm.value);
    }
  }
}
