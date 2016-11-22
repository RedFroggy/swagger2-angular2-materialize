import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { RoutesModule }   from './app.routing';
import {HomeComponent} from './home/home';
import {SettingsComponent} from './settings/settings';
import {ApiDocService} from '../../services/apidoc.service';
import {HttpModule} from '@angular/http';
import {MainModule} from '../main/main.module';
import {CommonModule, LocationStrategy, HashLocationStrategy} from '@angular/common';
import {MaterializeModule} from '../materialize/materialize.module';
import {FormsModule} from '@angular/forms';
import {HeaderComponent} from './header/header';

@NgModule({
    declarations: [AppComponent, HomeComponent, SettingsComponent, HeaderComponent],
    imports:      [BrowserModule, CommonModule, HttpModule, FormsModule, RoutesModule, MaterializeModule, MainModule],
    bootstrap:    [AppComponent],
    providers:    [ApiDocService, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule {}
