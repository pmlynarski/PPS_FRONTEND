import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AboutusComponent } from './aboutus/aboutus.component';
import { routing } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthorizedModule } from './authorized/authorized.module';
import { HomeGuard } from './core/home.guard';
import { LoginGuard } from './core/login.guard';
import { TokenInterceptor } from './core/token.interceptor';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './homepage/login/login.component';
import { LoginService } from './homepage/login/login.service';
import { RegisterResultComponent } from './homepage/register-result/register-result.component';
import { RegisterComponent } from './homepage/register/register.component';
import { RegisterService } from './homepage/register/register.service';

@NgModule({
  declarations: [AppComponent, HomepageComponent, AboutusComponent, LoginComponent, RegisterComponent, RegisterResultComponent],
  imports: [BrowserModule, HttpClientModule, routing, FormsModule, ReactiveFormsModule, AuthorizedModule],
  providers: [
    RegisterService,
    LoginService,
    LoginGuard,
    HomeGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
