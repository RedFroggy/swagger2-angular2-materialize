import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing }   from './app.routing';
import {Home} from "./home/home";
import {Settings} from "./settings/settings";
import {ApiDocService} from "../../services/apidoc.service";
import {HttpModule} from "@angular/http";
import {MainModule} from "../main/main.module";
import {SharedModule} from "../shared.module";
import {CommonModule, LocationStrategy, HashLocationStrategy} from "@angular/common";
import {MaterializeModule} from "../materialize/materialize.module";
import {FormsModule} from "@angular/forms";

@NgModule({
    declarations: [AppComponent, Home, Settings],
    imports:      [BrowserModule, CommonModule, HttpModule, FormsModule, routing, MaterializeModule, MainModule],
    bootstrap:    [AppComponent],
    providers:    [ApiDocService, {provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppModule {}