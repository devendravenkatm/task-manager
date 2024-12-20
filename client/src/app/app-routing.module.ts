import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TasksComponent } from './tasks/tasks.component'; // Task management component
import { HomepageComponent } from './homepage/homepage.component'; // Homepage component


import { AuthGuard } from './guards/auth.guard'; // AuthGuard for authentication protection

export const routes: Routes = [
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },  // Default route redirects to homepage
  { path: 'homepage', component: HomepageComponent },  // route for  homepage
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'tasks', component: TasksComponent, canActivate: [AuthGuard] }, // Protect tasks route
  { path: '**', redirectTo: '/homepage' }  // Wildcard route to handle invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
