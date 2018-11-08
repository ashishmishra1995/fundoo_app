import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FlexLayoutModule } from "@angular/flex-layout";
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule, MatCheckboxModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { HomeComponent } from './components/home/home.component';
import { HttpService } from './service/http/http.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatSnackBarModule } from "@angular/material";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { MatToolbarModule } from "@angular/material";
import { MatSidenavModule, MatListModule, MatGridListModule, MatMenuModule } from "@angular/material";
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NotesComponent } from './components/notes/notes.component';
import { ArchieveComponent } from './components/archieve/archieve.component';
import { TrashComponent } from './components/trash/trash.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReminderComponent } from './components/reminder/reminder.component';
import { MatExpansionModule } from "@angular/material";
import { MatTooltipModule } from "@angular/material";
import { AddReminderComponent } from './components/add-reminder/add-reminder.component';
import { CollaboratorComponent } from './components/collaborator/collaborator.component';
import { ChangeColorComponent } from './components/change-color/change-color.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { AddArchiveComponent } from './components/add-archive/add-archive.component';
import { MoreComponent } from './components/more/more.component';
import { AddNoteComponent } from './components/add-note/add-note.component';
import { AuthGuard } from './auth.guard';
import { NoteCollectionComponent } from './components/note-collection/note-collection.component';
import {MatDialogModule} from '@angular/material/dialog';
import { UpdateNotesComponent } from './components/update-notes/update-notes.component';
import { AddLabelComponent } from './components/add-label/add-label.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SearchComponent } from './components/search/search.component';
import { ChecklistModule } from "angular-checklist";
import {MatChipsModule} from '@angular/material/chips';
import { FilterLabelPipe } from './pipes/filter-label.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from "@angular/material";
import { LoggerService } from './service/logger/logger.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavigationComponent,
    ToolbarComponent,
    SidebarComponent,
    NotesComponent,
    ArchieveComponent,
    TrashComponent,
    DashboardComponent,
    ReminderComponent,
    AddReminderComponent,
    CollaboratorComponent,
    ChangeColorComponent,
    AddPhotoComponent,
    AddArchiveComponent,
    MoreComponent,
    AddNoteComponent,
    NoteCollectionComponent,
    UpdateNotesComponent,
    AddLabelComponent,
    FilterPipe,
    SearchComponent,
    FilterLabelPipe,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    FlexLayoutModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatProgressBarModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatExpansionModule,
    MatTooltipModule,
    MatDialogModule,
    ChecklistModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpService, AuthGuard, LoggerService],
  bootstrap: [AppComponent],
  entryComponents: [AddLabelComponent]

})
export class AppModule { }
