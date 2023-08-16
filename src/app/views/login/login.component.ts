import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  user: any = null;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private userService: UserService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email]],
      password: ['', Validators.minLength(6)],
    });
  }

  onSubmit() {
    // Send the form data to the server
    this.http
      .post('http://localhost:4000/api/v1/auth/login', this.form.value, {
        withCredentials: true,
      })
      .subscribe(
        (response: any) => {
          console.log('Server response:', response);
          this.userService.setUser(response.user); // Assuming the response contains user data

          // Handle successful response here
          // location.assign('/');
        },
        (error: any) => {
          console.error('Server error:', error.error);
          // Handle errors here
        }
      );
  }
  ngOnInit(): void {}
}
