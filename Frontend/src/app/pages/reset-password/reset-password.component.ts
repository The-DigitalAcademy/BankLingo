import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as e from 'express';
import { PasswordServiceService } from 'src/app/services/password-service.service';
import { UsersService } from 'src/app/services/users.services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  form!: FormGroup<any>;

  newPassword!: string;

constructor(private formBuilder: FormBuilder, private passwordService: PasswordServiceService, private userService: UsersService,private router:Router
  )  {
    this.form = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(12), this.passwordPatternValidator]],
      confirmPassword: ['', Validators.required],
    }, { validators: this.passwordMatchValidator });
  }

  
  onSubmit() {
    if (this.form.valid) {
      const newPassword = this.form.get('Password')?.value;
      // Call the password service to perform the password change/reset logic
      this.passwordService.changePassword(newPassword).subscribe(
        (response) => {
          // Handle the response or show success message
          console.log('Password changed successfully.');
          this.router.navigate(['/resetpassword'])
        },
        (error) => {
          // Handle error response or show error message
          console.error('Password change failed:', error);
        }
      );
    }
  }

  changePassword() {
    this.passwordService.changePassword(this.newPassword).subscribe(
      () => {
        // Password changed successfully, handle success or redirect to login page
      },
      (error) => {
        // Handle error (e.g., show error message)
      }
    );
  }

  // Custom validator to check password pattern
  private passwordPatternValidator(control: any) {
    const password = control.value;
    if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
      return { invalidPattern: true };
    }
    return null;
  }

  // Custom validator to check if passwords match
  private passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
