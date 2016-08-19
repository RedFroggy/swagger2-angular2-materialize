import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { routing }   from './app.routing';
import { FormsModule } from "@angular/forms";
import {Home} from "./components/home/home";
import {Settings} from "./components/settings/settings";
import {ApiDocService} from "./services/apidoc.service";
import {HttpModule} from "@angular/http";
import {MainModule} from "./components/main/main.module";
import {SharedModule} from "./shared.module";

@NgModule({
    declarations: [AppComponent, Home, Settings],
    imports:      [BrowserModule, FormsModule, HttpModule, routing, MainModule, SharedModule],
    bootstrap:    [AppComponent],
    providers:    [ApiDocService]
})
export class AppModule {}