import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  user$: Observable<any> = this.UserService.user$;

  constructor(
    private http: HttpClient,
    private UserService: UserService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  logout() {
    this.UserService.logout();
  }

  goBack() {
    this.location.back();
  }
}
