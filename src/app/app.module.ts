import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PoDialogService, PoFieldModule, PoModule, PoNotificationService } from '@po-ui/ng-components';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import { PoTemplatesModule } from '@po-ui/ng-templates';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { BookComponent } from './pages/book/book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './pages/about/about.component';
import { IndexComponent } from './pages/index/index.component';
import { AuthorComponent } from './pages/author/author.component';
import { UserComponent } from './pages/user/user.component';
import { FirstStepsComponent } from './pages/firstSteps/firstSteps.component';

export function momentAdapterFactory() {
  return adapterFactory(moment);
}

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    IndexComponent,
    BookComponent,
    AboutComponent,
    AuthorComponent,
    UserComponent,
    FirstStepsComponent    
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    PoModule,
    HttpClientModule,
    RouterModule.forRoot([]),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: momentAdapterFactory,
    }),
    PoTemplatesModule,
    BrowserAnimationsModule,
    PoFieldModule, 
    FormsModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    PoDialogService,
    PoNotificationService 
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
