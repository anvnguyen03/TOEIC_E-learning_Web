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
import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { ManageTestComponent } from './pages/admin/manage-test/manage-test.component';
import { ManageQuestionComponent } from './pages/admin/manage-question/manage-question.component';

export const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'tests', component: TestsComponent},
    {path: 'tests/:id/:title', component: TestDetailsComponent},
    {path: 'tests/:id/:title/start', component: DotestComponent, canActivate: [authGuard]},
    {path: 'tests/:id/results/:resultid', component: TestResultComponent, canActivate: [authGuard]},
    {path: 'login', component: LoginComponent, canActivate: [loggedInGuard]},
    {path: 'logout', component: LogoutComponent},
    {path: 'register', component: RegisterComponent, canActivate: [loggedInGuard]},
    {path: 'admindashboard', component: AdminLayoutComponent, canActivate: [authGuard],
        children: [
            {path: '', redirectTo: 'tests', pathMatch: 'full'},
            {path: 'tests', component: ManageTestComponent, canActivate: [authGuard]},
            {path: 'tests/:id/questions', component: ManageQuestionComponent, canActivate: [authGuard]}
        ]
    },
    {path: 'refresh', redirectTo: "/home"},
    {path: '', redirectTo: "/home", pathMatch: "full"}
];
