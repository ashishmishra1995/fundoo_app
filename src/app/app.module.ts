import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ErrorHandler } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InterceptorService } from "./core/service/Interceptor/interceptor.service";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from "@angular/flex-layout";
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatCardModule,
  MatTableModule,
  MatIconModule,
  MatRadioModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatGridListModule,
  MatMenuModule,
  MatExpansionModule,
  MatTooltipModule,
  MatDialogModule,
  MatChipsModule,
  MatDatepickerModule,
  DateAdapter,
  MatNativeDateModule,
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LayoutModule } from '@angular/cdk/layout';
import { ChecklistModule } from "angular-checklist";
import { ImageCropperModule } from "ngx-image-cropper";
import { RatingModule } from "ngx-rating";
import { BarRatingModule } from "ngx-bar-rating";
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';


import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/login/login.component';
import { SignupComponent } from '@components/signup/signup.component';
import { ForgotPasswordComponent } from '@components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from '@components/reset-password/reset-password.component';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { ToolbarComponent } from '@components/toolbar/toolbar.component';
import { SidebarComponent } from '@components/sidebar/sidebar.component';
import { NotesComponent } from '@components/notes/notes.component';
import { ArchieveComponent } from '@components/archieve/archieve.component';
import { TrashComponent } from '@components/trash/trash.component';
import { DashboardComponent } from '@components/dashboard/dashboard.component';
import { ReminderComponent } from '@components/reminder/reminder.component';
import { AddReminderComponent } from '@components/add-reminder/add-reminder.component';
import { CollaboratorComponent } from '@components/collaborator/collaborator.component';
import { ChangeColorComponent } from '@components/change-color/change-color.component';
import { AddPhotoComponent } from '@components/add-photo/add-photo.component';
import { AddArchiveComponent } from '@components/add-archive/add-archive.component';
import { MoreComponent } from '@components/more/more.component';
import { AddNoteComponent } from '@components/add-note/add-note.component';
import { NoteCollectionComponent } from '@components/note-collection/note-collection.component';
import { UpdateNotesComponent } from '@components/update-notes/update-notes.component';
import { AddLabelComponent } from '@components/add-label/add-label.component';
import { LabelComponent } from "@components/label/label.component";
import { CropImageComponent } from '@components/crop-image/crop-image.component';
import { PinComponent } from '@components/pin/pin.component';
import { SlidePanelComponent } from '@components/slide-panel/slide-panel.component';
import { CollaboratorPopupComponent } from '@components/collaborator-popup/collaborator-popup.component';
import { SearchComponent } from '@components/search/search.component';


import { HttpService } from '@service/http/http.service';
import { AuthGuard } from '@service/Authguard/auth.guard';
import { FilterPipe } from '@pipes/filter.pipe';
import { FilterLabelPipe } from '@pipes/filter-label.pipe';
import { LoggerService } from '@service/logger/logger.service';
import { MessagingService } from "@service/messaging-service/messaging.service";
import { ErrorHandlerService } from "@service/error-handler/error-handler.service";
import { QuestionAndAnswerComponent } from './components/question-and-answer/question-and-answer.component';


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
    LabelComponent,
    CropImageComponent,
    PinComponent,
    SlidePanelComponent,
    CollaboratorPopupComponent,
    QuestionAndAnswerComponent,
    


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
    ImageCropperModule,
    RatingModule,
    BarRatingModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [HttpService, AuthGuard, LoggerService, MessagingService, InterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: ErrorHandlerService,
    }],
  bootstrap: [AppComponent],
  entryComponents: [AddLabelComponent, CropImageComponent, CollaboratorPopupComponent]

})
export class AppModule { }
