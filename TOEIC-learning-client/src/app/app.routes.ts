import { Routes } from '@angular/router';
import { TestsComponent } from './pages/tests/tests.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { DotestComponent } from './pages/dotest/dotest.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { TestDetailsComponent } from './pages/test-details/test-details.component';
import { authGuard } from './guards/auth.guard';
import { TestResultComponent } from './pages/test-result/test-result.component';
import { FogotPasswordComponent } from './pages/fogot-password/fogot-password.component';
import { ProfileComponent } from './pages/profile/profile.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'tests', component: TestsComponent},
    {path: 'tests/:id/:title', component: TestDetailsComponent},
    {path: 'tests/:id/:title/start', component: DotestComponent, canActivate: [authGuard]},
    {path: 'tests/:id/results/:resultid', component: TestResultComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent, canActivate: [loggedInGuard]},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterComponent, canActivate: [loggedInGuard]},
    { path: 'my-profile', component: ProfileComponent}, // Define the route for the profile page
    {path: 'my-fogot-password/:email/:code', component: FogotPasswordComponent}, // sửa dùng chữ r đi
    {path: 'my-fogot-password',component: FogotPasswordComponent},  // sửa dùng chữ r đi
    {path: '', redirectTo: "/home", pathMatch: "full"},
];
