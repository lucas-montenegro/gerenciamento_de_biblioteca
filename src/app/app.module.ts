import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookCardComponent } from './book-card/book-card.component';
import { UserCardComponent } from './user-card/user-card.component';
import { MyBooksComponent } from './my-books/my-books.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { ListBooksComponent } from './list-books/list-books.component';
import { SingleBookComponent } from './single-book/single-book.component';
import { UserService } from './user.service';
import { AvailableBooksService } from './available-books.service';
import { BookCreationComponent } from './book-creation/book-creation.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';


const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'all-books', component: ListBooksComponent },
  { path: 'book/:$key', component: SingleBookComponent },
  { path: 'my-books', component: MyBooksComponent },
  { path: 'user/:$key', component:  UserCardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'create-book', component: BookCreationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    BookCardComponent,
    UserCardComponent,
    MyBooksComponent,
    LoginComponent,
    RegisterComponent,
    ListBooksComponent,
    SingleBookComponent,
    BookCreationComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    AvailableBooksService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
