import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { BlogComponent } from './blog/blog.component';
import { NewsComponent } from './news/news.component';
import { AboutComponent } from './about/about.component';
import { BookMediaComponent } from './book-media/book-media.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CommonModule } from '@angular/common';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { RolesComponent } from './pages/roles/roles.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';
import { UserListComponent } from './pages/user-list/user-list.component';

const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"navbar", component:NavbarComponent},
  {path:"footer", component:FooterComponent},
  {path:"blog", component:BlogComponent},
  {path:"news", component:NewsComponent},
  {path:"about", component:AboutComponent},
  {path:"book", component:BookMediaComponent},
  {path:"adminlog", component:AdminLoginComponent,
  children:[
    {path:'addUser', component:AddUserComponent},
    {path:'role', component:RolesComponent},
    {path:'adminDash', component:AdminDashboardComponent},
    {path:'adminLayout', component:AdminLayoutComponent}
  ]
  },
  {path:"register", component:RegisterComponent},
  {path:"userlog", component:UserLoginComponent,
  children:[
    {path:'userDash', component:UserDashboardComponent},
    {path:'userLayout', component:UserLayoutComponent},
    {path:'userList', component:UserListComponent}
  ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes), 
    CommonModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
