import { Routes } from '@angular/router';
import { TestsComponent } from './tests/tests.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'tests', component: TestsComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: "/home", pathMatch: "full"}
];
