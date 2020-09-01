import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/api';
import { ConexionService } from './../../services/conexion.service';

import { ConexionPath } from './../../models/conexion-path.model';

@Component({
  selector: 'app-popup-conexion',
  templateUrl: './popup-conexion.component.html',
  styles: []
})
export class PopupConexionComponent implements OnInit {

_config;
  _URL_SERVICIOS;
  _URL_ARCHIVO;
  constructor(private ref: DynamicDialogRef, private conexionService: ConexionService) { }

  ngOnInit() {
    
    const conexion = JSON.parse(localStorage.getItem('conexion'));
    console.log(conexion);
    if (conexion !== null) {
      this._URL_SERVICIOS = conexion.URL_SERVICIOS;
      this._config = conexion.config.url;
      this._URL_ARCHIVO = conexion.URL_ARCHIVO;
      this.conexionService.setConexion(this._URL_SERVICIOS, this._config, this._URL_ARCHIVO);
    } else {
      
    }
  }

  confirmarDatos(){
    // tslint:disable-next-line: max-line-length
    const cnp = new ConexionPath(this._URL_SERVICIOS, { url: this._config, options: {} }, this._URL_ARCHIVO);
    localStorage.setItem('conexion', JSON.stringify(cnp));
    this.conexionService.setConexion(this._URL_SERVICIOS, this._config, this._URL_ARCHIVO);
    this.ref.close(cnp);
  }

}