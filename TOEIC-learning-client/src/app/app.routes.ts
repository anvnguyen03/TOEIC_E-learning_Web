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

import { AdminLayoutComponent } from './pages/admin/admin-layout/admin-layout.component';
import { ManageTestComponent } from './pages/admin/manage-test/manage-test.component';
import { ManageQuestionComponent } from './pages/admin/manage-question/manage-question.component';
import { TestByCategoryComponent } from './pages/test-by-category/test-by-category.component';
import { UserLayoutComponent } from './pages/user-layout/user-layout.component';
import { MyAccountComponent } from './pages/my-account/my-account.component';
import { MyAccountSettingsComponent } from './pages/my-account-settings/my-account-settings.component';


export const routes: Routes = [

    {   // user routes
        path: '', component: UserLayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'tests', component: TestsComponent },
            { path: 'tests/:catename', component: TestByCategoryComponent },
            { path: 'tests/:id/:title', component: TestDetailsComponent },
            { path: 'tests/:id/:title/start', component: DotestComponent, canActivate: [authGuard] },
            { path: 'tests/:id/results/:resultid', component: TestResultComponent, canActivate: [authGuard] },
            { path: 'login', component: LoginComponent, canActivate: [loggedInGuard] },
            { path: 'logout', component: LogoutComponent },
            { path: 'register', component: RegisterComponent },
            { path: 'my-account', component: MyAccountComponent, canActivate: [authGuard]},
            { path: 'my-account/settings', component: MyAccountSettingsComponent, canActivate: [authGuard]},
            { path: 'my-profile', component: ProfileComponent }, // Define the route for the profile page
            { path: 'my-fogot-password/:email/:code', component: FogotPasswordComponent }, // sửa dùng chữ r đi
            { path: 'my-fogot-password', component: FogotPasswordComponent },  // sửa dùng chữ r đi
        ]
    },
    {   // admin routes
        path: 'admindashboard', component: AdminLayoutComponent, canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'tests', pathMatch: 'full' },
            { path: 'tests', component: ManageTestComponent, canActivate: [authGuard] },
            { path: 'tests/:id/questions', component: ManageQuestionComponent, canActivate: [authGuard] }
        ]
    },
    {   // refreshing
        path: 'refresh', redirectTo: "/home" 
    }
];
