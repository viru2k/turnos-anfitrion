import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { ROUTES } from './app.routes';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS,HttpClientModule  } from '@angular/common/http';
import {   LOCALE_ID, Injector} from '@angular/core';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { SocketIoModule } from 'ngx-socket-io';

import { NgxElectronModule } from 'ngx-electron';



import {DialogModule} from 'primeng/dialog';

import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { PopupConexionComponent } from './shared/popup-conexion/popup-conexion.component';
import {MenuItem, MessageService, DialogService, SelectItem} from 'primeng/api';



@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    PopupConexionComponent
  ],
  imports: [NgxElectronModule, FormsModule ,
  
 BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule ,    
    DialogModule,
    DynamicDialogModule,
    HttpClientModule ,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    
    RouterModule.forRoot( ROUTES, { useHash: true } ),
  ],
  entryComponents: [
   PopupConexionComponent,
   ],
  providers: [
     { provide: LOCALE_ID, useValue: 'es-Ar' },
    {
     provide: HTTP_INTERCEPTORS,
     useFactory: function(injector: Injector) {
         return new JwtInterceptor(injector);
     },
     multi: true,
     deps: [Injector]
   },
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
     bootstrap: [AppComponent]
   })
   export class AppModule { }
   