import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      email: ['', [Validators.email]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', Validators.minLength(6)],
      fullname: ['', [Validators.required]],
      addresses: this.fb.array([this.getAddressGroup()]),
      newsletter: true,
    });
  }

  onAddAddress() {
    (this.form.controls as any).addresses.push(this.getAddressGroup());
  }

  getAddressGroup() {
    return this.fb.group({
      street: '',
      city: '',
      state: '',
      zip: '',
    });
  }

  errorMessage: string = '';

  onSubmit() {
    // Send the form data to the server
    this.http
      .post('http://localhost:4000/api/v1/auth/signup', this.form.value, {
        withCredentials: true,
      })
      .subscribe(
        (response) => {
          console.log('Server response:', response);
          // Handle successful response here
        },
        (error: any) => {
          console.error('Server error:', error);
          // Handle errors here
        }
      );
  }

  ngOnInit(): void {}
}
