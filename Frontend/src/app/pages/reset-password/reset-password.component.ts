import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
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

constructor(private formBuilder: FormBuilder, private passwordService: PasswordServiceService, private userService: UsersService
  )  {
    this.form = this.formBuilder.group({
      Password: ['', [Validators.required, Validators.minLength(12), this.passwordPatternValidator]],
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
        },
        (error) => {
          // Handle error response or show error message
          console.error('Password change failed:', error);
        }
      );
    }
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
    const password = group.get('Password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
}
