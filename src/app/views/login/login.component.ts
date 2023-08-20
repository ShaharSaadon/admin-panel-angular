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
    this.userService.login(this.form.value).subscribe({
      next: (response: any) => {
        console.log('Server response:', response);
        this.userService.setUser(response.user);
      },
      error: (error: any) => {
        console.error('Server error:', error.error);
      },
    });
  }

  ngOnInit(): void {}
}
