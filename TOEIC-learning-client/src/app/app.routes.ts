import { Routes } from '@angular/router';
import { TestsComponent } from './pages/tests/tests.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { authGuard } from './guards/auth.guard';
import { DotestComponent } from './pages/dotest/dotest.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { TestByCategoryComponent } from './pages/test-by-category/test-by-category.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'tests', component: TestsComponent/*, canActivate: [authGuard]*/},
    {path: 'tests/category/:catename', component: TestByCategoryComponent/*, canActivate: [authGuard]*/},
    {path: 'tests/:id/:title', component: DotestComponent},
    {path: 'login', component: LoginComponent, canActivate: [loggedInGuard]},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: "/home", pathMatch: "full"}
];
