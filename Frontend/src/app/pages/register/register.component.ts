import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/types/users';
import { UsersService } from 'src/app/services/users.services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  fb!: FormGroup;
  users!: Users;
  regInvalid = false;
  name: any;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private formb: FormBuilder
  ) {
    this.fb = this.formb.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      surname: [null, [Validators.required, Validators.minLength(3)]],
      age: [null, [Validators.required, this.ageValidator]],
      email: [null, [Validators.required, Validators.email]],
      password: [
        null,
        [Validators.required, Validators.minLength(8), this.passwordValidator],
      ],
    });
  }

  ngOnInit() {
    this.regInvalid = false;
  }

  passwordValidator(control: FormControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);

    if (!hasSymbol || !hasNumber || !hasLetter) {
      return { invalidPassword: true };
    }
    return null;
  }

  ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value;
    // Check if the value is numeric and has exactly 3 digits
    if (!/^\d{2,3}$/.test(value)) {
      return { invalidAge: true };
    }
    return null;
  }

  onSubmit() {
    this.registerUser();
  }

  registerUser() {
    if (this.fb.valid) {
      this.usersService.createUser(this.fb.value).subscribe((res) => {
        this.users = res;
        console.log(res);
      });
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        //text: 'You can now login',
        confirmButtonColor: '#38A3A5',
        showConfirmButton: false,
        timer: 1400,
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/home']);
        }
      });
    } else {
      this.regInvalid = true;
      console.log('form invalid');
    }
  }
}
