import { BrowserModule }      from '@angular/platform-browser';
import { NgModule }           from '@angular/core';
import { FormsModule }        from '@angular/forms';
import { HttpModule }         from '@angular/http';

import { Brolog }             from 'brolog'
import { AppComponent }       from './app.component';
import { AppRoutingModule }   from './app-routing.module';

import { WechatyModule }      from '@chatie/angular'

import { AuthService }        from './auth.service'
import { AuthGuardService }   from './auth-guard.service';

import { NotFoundComponent }  from './not-found/not-found.component';
import { LoginComponent }     from './login/login.component';
import { AboutComponent }     from './about/about.component';
import { BotieComponent }     from './botie/botie.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LoginComponent,
    AboutComponent,
    BotieComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    WechatyModule,
    // Routing should be last
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    AuthGuardService,
    { provide: Brolog,
      useFactory() { return Brolog.instance('silly') },
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
