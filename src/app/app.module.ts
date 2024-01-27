import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';

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
import { UserServiceService } from './Services/user-service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Modules/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { UpdatePopupComponent } from './pages/update-popup/update-popup.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { VideoComponent } from './file-library/video/video.component';
import { PicturesComponent } from './file-library/pictures/pictures.component';
import { AudioComponent } from './file-library/audio/audio.component';
import { PdfComponent } from './file-library/pdf/pdf.component';
import { FileContentDialogComponent } from './file-content-dialog/file-content-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MessagesComponent } from './messages/messages.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CancelSelectionComponent } from './cancel-selection/cancel-selection.component';
import { MatBadgeModule } from '@angular/material/badge';

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
    RolesComponent,
    // PagesComponent,
    UpdatePopupComponent,
    BookDetailsComponent,
    VideoComponent,
    PicturesComponent,
    AudioComponent,
    PdfComponent,
    FileContentDialogComponent,
    MessagesComponent,
    CancelSelectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    HttpClientModule,
    CommonModule,
    MatProgressBarModule,
    MatBadgeModule,
    ToastrModule.forRoot()
  ],
  // schemas:[ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    UserServiceService,
    { provide: DomSanitizer, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
