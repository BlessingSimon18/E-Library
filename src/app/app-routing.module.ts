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

const routes: Routes = [
  {path:"*", component:HomeComponent},
  {path:"navbar", component:NavbarComponent},
  {path:"footer", component:FooterComponent},
  {path:"blog", component:BlogComponent},
  {path:"news", component:NewsComponent},
  {path:"about", component:AboutComponent},
  {path:"book", component:BookMediaComponent},
  {path:"adminlog", component:AdminLoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"userlog", component:UserLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
