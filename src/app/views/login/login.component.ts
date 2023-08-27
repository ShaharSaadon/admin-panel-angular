import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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
    private userService: UserService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.minLength(6)],
    });
  }

  onSubmit() {
    this.userService.login(this.form.value).subscribe({
      next: (response: any) => {
        this.userService.setUser(response.user);
        this.router.navigate(['/secret']);
      },
      error: (error: any) => {
        console.error('Server error:', error.error);
      },
    });
  }

  ngOnInit(): void {}
}
