import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AceModule } from 'ngx-ace-wrapper';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LearnComponent } from './learn/learn.component';
import { DeveloperComponent } from './developer/developer.component';
import { NetworkComponent } from './network/network.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './services/auth/auth.component';
import { ChainComponent } from './services/chain/chain.component';
import { TerminalComponent } from './terminal/terminal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LearnComponent,
    DeveloperComponent,
    NetworkComponent,
    RegisterComponent,
    AuthComponent,
    ChainComponent,
    TerminalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
