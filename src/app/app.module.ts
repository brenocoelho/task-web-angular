import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { AuthInterceptor } from './authconfig.interceptor';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskListComponent } from './components/tasks/task-list/task-list.component';
import { TaskDetailComponent } from './components/tasks/task-detail/task-detail.component';
import { TagDetailComponent } from './components/tags/tag-detail/tag-detail.component';
import { TagListComponent } from './components/tags/tag-list/tag-list.component';
import { TagItemComponent } from './components/tags/tag-item/tag-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { TagDirective } from './directives/tag.directive';
import { TaskItemComponent } from './components/tasks/task-item/task-item.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers } from './store/index'
import { TaskEffects } from './store/task/task.effects';
import { TagEffects } from './store/tag/tag.effects';

import { environment } from '../environments/environment';
import { HomeComponent } from './components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Angular CLI environment

@NgModule({
  declarations: [
    AppComponent,
    TaskListComponent,
    TaskDetailComponent,
    TagDetailComponent,
    TagListComponent,
    TagItemComponent,
    SignupComponent,
    LoginComponent,
    UserComponent,
    TagDirective,
    TaskItemComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMomentDateModule,
    MatListModule,
    MatGridListModule,
    MatMenuModule,
    MatSnackBarModule,
    MatDialogModule,
    MatBadgeModule,
    MatCheckboxModule,

    FlexLayoutModule,

    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([TaskEffects, TagEffects]),

    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    NgbModule,
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},  
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },     
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
