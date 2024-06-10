import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from './pages/layout/layout.component';
import { TaskService } from './services/task/task.service';
import { TaskComponent } from './pages/task/task.component';
import { TasksListComponent } from './pages/tasks-list/tasks-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalAddComponent } from './pages/modal-add/modal-add.component';
import { DatePipe } from '@angular/common';
import { ModalEditComponent } from './pages/modal-edit/modal-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LayoutComponent,
    LoginComponent,
    NavComponent,
    TaskComponent,
    TasksListComponent,
    ModalAddComponent,
    ModalEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule
  ],
  providers: [TaskService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
