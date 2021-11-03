import { Component, OnInit } from "@angular/core";
import { DynamicDialogRef } from "primeng/api";
import { ConexionPath } from "./../../models/conexion-path.model";
import { ConexionService } from "../../services/conexion.service";

@Component({
  selector: "app-popup-conexion",
  templateUrl: "./popup-conexion.component.html",
})
export class PopupConexionComponent implements OnInit {
  _config;
  _URL_SERVICIOS;
  _URL_ARCHIVO;
  constructor(
    private ref: DynamicDialogRef,
    private conexionService: ConexionService
  ) {}

  ngOnInit() {
    const conexion = JSON.parse(localStorage.getItem("conexion"));
    console.log(conexion);
    if (conexion !== null) {
      this._URL_SERVICIOS = conexion.URL_SERVICIOS;
      this._config = conexion.config.url;
      this._URL_ARCHIVO = conexion.URL_ARCHIVO;
      this.conexionService.setConexion(
        this._URL_SERVICIOS,
        this._config,
        this._URL_ARCHIVO
      );
    } else {
    }
  }

  confirmarDatos() {
    const _URL_SERVICIOS =
      "http://" + this._URL_SERVICIOS + "/api-turnos/public/api/";
    const _config = "http://" + this._URL_SERVICIOS + ":4444";
    const _URL_ARCHIVO =
      "http://" + this._URL_SERVICIOS + "/api-turnos/public/";

    const cnp = new ConexionPath(
      _URL_SERVICIOS,
      { url: _config, options: {} },
      _URL_ARCHIVO
    );
    localStorage.setItem("conexion", JSON.stringify(cnp));
    this.conexionService.setConexion(
      _URL_SERVICIOS,
      this._config,
      _URL_ARCHIVO
    );
    this.ref.close(cnp);
  }
}
