import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LlamadorSectorComponent } from './pages/llamador/llamador-sector/llamador-sector.component';
import { LlamadorColaComponent } from './pages/llamador/llamador-cola/llamador-cola.component';

@NgModule({
  declarations: [
    AppComponent,
    LlamadorSectorComponent,
    LlamadorColaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
