import { Injectable } from '@angular/core';

import swal from 'sweetalert2';
import { SocketIoConfig } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class ConexionService {
URL_SERVICIOS;
config: SocketIoConfig;
URL_ARCHIVO = '';

  constructor() { 
      this.URL_SERVICIOS = '';
      this.config = { url: '', options: {} };
      this.URL_ARCHIVO = '';
  }

public setConexion(URL_SERVICIOS: string, config: SocketIoConfig, URL_ARCHIVO: string) {

    this.URL_SERVICIOS = URL_SERVICIOS;
    this.config = config;
    this.URL_ARCHIVO = URL_ARCHIVO;
}

public getConexion(){
    const conexion =   JSON.parse(localStorage.getItem('conexion'));
    if (conexion == null) {
        return '';
    }
    return conexion;
}

public getURL_SERVICIOS(){
    
    const conexion =   JSON.parse(localStorage.getItem('conexion'));
    if (conexion == null) {
        return '';
    }
    return conexion.URL_SERVICIOS;
}

public getconfig(){
    const conexion =   JSON.parse(localStorage.getItem('conexion'));
    if (conexion == null) {
        return '';
    }
    return conexion.config;
}

public getURL_ARCHIVO(){
    const conexion =   JSON.parse(localStorage.getItem('conexion'));
    if (conexion == null) {
        return '';
    }
    return conexion.URL_ARCHIVO;
}
}