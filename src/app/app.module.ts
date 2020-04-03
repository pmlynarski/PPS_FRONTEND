import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { routing } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { LoginComponent } from './homepage/login/login.component';
import { RegisterComponent } from './homepage/register/register.component';
import { RegisterService } from './homepage/register/register.service';
import { RegisterResultComponent } from './homepage/register-result/register-result.component';
import { LoginService } from './homepage/login/login.service';
import { TokenInterceptor } from './homepage/login/token.interceptor';
import { LoginGuard } from './homepage/login/login.guard';
import { HomeGuard } from './home.guard';
import { AuthorizedModule } from './authorized/authorized.module';



@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AboutusComponent,
    LoginComponent,
    RegisterComponent,
    RegisterResultComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    routing,
    FormsModule,
    ReactiveFormsModule,
    AuthorizedModule
  ],
  providers: [RegisterService, LoginService, LoginGuard, HomeGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
