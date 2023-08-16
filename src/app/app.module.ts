import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-root/app.component';
import { GreetComponent } from './cmps/greet/greet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './views/signup/signup.component';
import { TestComponent } from './cmps/test/test.component';
import { LoginComponent } from './views/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './views/admin-panel/admin-panel.component';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { RestaurantEditComponent } from './views/edit/edit.component';
import { LoaderComponent } from './cmps/loader/loader.component';

const appRoute: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'secret', component: AdminPanelComponent },
  { path: 'edit/:id', component: RestaurantEditComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    GreetComponent,
    SignupComponent,
    TestComponent,
    LoginComponent,
    AdminPanelComponent,
    RestaurantEditComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute),
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
