import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BookComponent } from './pages/book/book.component';
import { AboutComponent } from './pages/about/about.component';
import { AuthorComponent } from './pages/author/author.component';
import { UserComponent } from './pages/user/user.component';
import { FirstStepsComponent } from './pages/firstSteps/firstSteps.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'book',
    component: BookComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'author',
    component: AuthorComponent,
  },
  {
    path: 'user',
    component: UserComponent,
  },
  {
    path: 'firstSteps',
    component: FirstStepsComponent,
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
