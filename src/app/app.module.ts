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
import { AppHeaderComponent } from './cmps/app-header/app-header.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmDialogComponent } from './cmps/confirm-dialog/confirm-dialog.component';
import { AuthGuard } from './guards/auth-guard';
import { ReverseAuthGuard } from './guards/reverse-guard';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

const appRoute: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'secret', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: 'edit', component: RestaurantEditComponent },
  { path: 'edit/:id', component: RestaurantEditComponent },
  { path: '', component: LoginComponent, canActivate: [ReverseAuthGuard] },
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
    AppHeaderComponent,
    ConfirmDialogComponent,
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
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
