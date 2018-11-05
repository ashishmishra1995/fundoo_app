import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotesComponent } from './components/notes/notes.component';
import { TrashComponent } from './components/trash/trash.component';
import { ArchieveComponent } from './components/archieve/archieve.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ReminderComponent } from './components/reminder/reminder.component';
import { AuthGuard } from "./auth.guard";
import { NavigationComponent } from "./components/navigation/navigation.component";
import { UpdateNotesComponent } from "./components/update-notes/update-notes.component";
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo:'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'resetpassword/:id', component: ResetPasswordComponent },
  { path: 'update-notes', component: UpdateNotesComponent },
  { path: 'home',  component: HomeComponent, canActivate:[AuthGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo:'notes' },
      { path: 'notes', component: NotesComponent  },
      { path: 'archieve', component: ArchieveComponent  },
      { path: 'trash', component: TrashComponent },
      { path: 'reminder', component: ReminderComponent },
      { path: 'search', component: SearchComponent }
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
