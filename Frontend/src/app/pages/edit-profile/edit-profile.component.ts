import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, FormBuilder,} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/types/users';
import { UsersService } from 'src/app/services/users.services';
import { HttpClient } from '@angular/common/http';
import { SessionsService } from 'src/app/services/sessions.service';
import Swal from 'sweetalert2';
import { UploadImageService } from 'src/app/services/uploadImage.service';
import { Observable, Observer } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  files: File[] = [];
  user!: any;
  profileForm!: FormGroup;
  selectedImage!: File;


  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private session: SessionsService,
    private router: Router,
    private uploadService: UploadImageService,
    private titlePage : Title
  ) {}

  ngOnInit() {
    this.titlePage.setTitle("Edit profile")
    // Retrieve the user data from session storage
    this.user = this.session.getLoggedUser();

    this.imagePreviewUrl = this.user.profile_picture;

    // Check if the user variable contains valid user data before initializing the form
    if (this.user && Object.keys(this.user).length > 0) {
      this.initializeForm();
    } else {
      // Handle the case when the user data is not available
      console.log('User data not found in session storage');
      // You can take appropriate actions, such as redirecting the user to the login page.
    }
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      age: [this.user.age, Validators.required],
      contact_number: [this.user.contact_number],
      email: [this.user.email, [Validators.required, Validators.email]],
      profile_picture: [this.user.profile_picture || ''],
    });
  }

  onImageSelected(event: any) {
    // Get the selected image from the input field
    this.selectedImage = event.target.files[0];
  }

  onUpload(): void {
    if (!this.selectedImage) {
      alert('Please select an image to upload.');
      return;
    }

    this.uploadService.uploadSignature(this.selectedImage).subscribe(
      (response: any) => {
        // The response should contain the Cloudinary URL
        const profilePictureUrl = response.secure_url;

        // Set the profile_picture value in the form with the Cloudinary URL
        this.profileForm.get('profile_picture')?.setValue(profilePictureUrl);

        // Now, submit the form with the updated profile_picture value
        this.updateUser();
      },
      (error: any) => {
        console.error('Error uploading profile picture:', error);
      }
    );
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.selectedImage = inputElement.files[0];

      // Create a FileReader to read the image and set its preview URL
      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImage);
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };

    }
  }

  updateUser() {
    if (this.profileForm.valid) {
      const updatedData = this.profileForm.value;

      if (!this.user.userId) {
        console.error('User ID is not defined.' + this.user.userId);
        return;
      }

      
      console.log('Updating profile with ID:', this.user.userId);
      console.log('Updated data:', updatedData);

      this.usersService
        .updateProfile(this.user.userId, updatedData)
        .subscribe((res) => {
          // Merge the updatedData with the existing user object
          this.user = { ...this.user, ...res };

          // Save the updated user data to session storage
          this.session.saveLoggedUser(this.user);
          Swal.fire({
            icon: 'success',
            title: 'Profile Updated Successfully!',
            confirmButtonColor: '#38A3A5',
            showConfirmButton: false,
            timer: 1400,
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/profile']);
            }
          });
        });
     
    }
  }
}
