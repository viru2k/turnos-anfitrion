import { SocketIoConfig } from 'ngx-socket-io';
export class ConexionPath {



    URL_SERVICIOS: string;
    config: SocketIoConfig;
    URL_ARCHIVO: string;

    constructor(
        URL_SERVICIOS: string,
        config: SocketIoConfig,
        URL_ARCHIVO: string) {
        this.URL_SERVICIOS = URL_SERVICIOS;
        this.config = config;
        this.URL_ARCHIVO = URL_ARCHIVO;

   }
}