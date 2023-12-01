import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { SearchComponent } from './search/search.component';
import { BookMediaComponent } from './book-media/book-media.component';
import { NewsComponent } from './news/news.component';
import { BlogComponent } from './blog/blog.component';
import { AboutComponent } from './about/about.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './pages/register/register.component';

import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    SearchComponent,
    BookMediaComponent,
    NewsComponent,
    BlogComponent,
    AboutComponent,
    AdminLoginComponent,
    UserLoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    AddUserComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    UserDashboardComponent,
    UserListComponent,
    RolesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  // schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
