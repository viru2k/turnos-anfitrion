import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Paciente } from '../../models/paciente.model';
import { timer } from 'rxjs';
import swal from 'sweetalert2';
import { AuthenticationService } from './../../services/authentication.service';
import { UserService } from './../../services/user.service';
import { User } from './../../models/user.model';

import { formatDate } from '@angular/common';
import { IcuPlaceholder } from '@angular/compiler/src/i18n/i18n_ast';
import { TurnoService } from '../../services/turno.service';
import { IpcService } from '../../services/ipc-service.service';


import { ElectronService } from 'ngx-electron';
import { PopupConexionComponent } from './../../shared/popup-conexion/popup-conexion.component';
import { DialogService } from 'primeng/api';
import { MenuItem, MessageService } from 'primeng/api';
@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [MessageService, DialogService]
})
export class PrincipalComponent implements OnInit {

  @ViewChild('myDiv', {static: false}) myDiv: ElementRef;
  @ViewChild('bubbly', {static: false}) bubbly: ElementRef;
 documento = '';
 loading: boolean;
 existe: boolean;
 horario: any;
 elementoTurno: any = null;
 elemento: User = null;
 elementoModulo:[] = null;
 user: User;
 username: string;
 loggedIn = false;
 imprimir = false;
 nuevo = false;
 estado = 'CONECTANDO CON EL SERVIDOR';
 turno: any;


  constructor(
              private authenticationService: AuthenticationService, private miServico: UserService,
              public dialogService: DialogService,
              private turnoService: TurnoService,
              private ipcService: IpcService,
              private _electronService: ElectronService) {

   }


  


  ngOnInit() {


    const conexion = JSON.parse(localStorage.getItem('conexion'));
    console.log(conexion);
    if (conexion == null ) {
         console.log('sin ruta de acceso');
         this.configurarRuta();
         // tslint:disable-next-line: max-line-length
       
       } else {
      //   this.configurarRuta();
         console.log('parametros de acceso');
         console.log('URL_SERVICIO: '+ conexion.URL_SERVICIO);
         let currentUser = JSON.parse(localStorage.getItem('currentUser'));
         console.log(currentUser);
         if (currentUser) {
            let userData = JSON.parse(localStorage.getItem('userData'));
            console.log(userData);
            console.log('usuario logueado');
            this.loggedIn = true;
            this.username = userData.username;
            console.log(userData.access_list);
            this.asignarModulos(userData.access_list);      
          }else{
            this.onSubmit();
          }
          this.onSubmit();
        }
  

  

  
  }

animateButton(event){

event.preventDefault;
//reset animation
event.target.classList.remove('animate');

event.target.classList.add('animate');
setTimeout(function(){
  event.target.classList.remove('animate');
},1000);


var bubblyButtons = document.getElementsByClassName("bubbly-button");



}
  

  agregarCaracter(numero:string){
    this.documento = this.documento+numero;
  }

  borrarCaracter(){
    this.documento= this.documento.substring(0, this.documento.length - 1);
  }

  onSubmit() {

    this.loading = true;
    this.estado = 'AUTENTICANDO APLICACION';
    this.authenticationService.login('admin','1234')
       // .pipe(first())
        .subscribe(
            data => {
              this.user = data;
              const us = new User('', '', '', '', '', 'admin', '1234', []);
              localStorage.setItem('userData', JSON.stringify(us));
              localStorage.setItem('currentUser', JSON.stringify(this.user));
              this.loadUser();
            },
            error => {              
              this.loading = false;
            });
  }

loadUser(){

  this.loading = true;
  try {
    this.miServico.getItemInfoAndMenu('admin')
      .subscribe(resp => {
      this.elemento = resp;

      const currentUser =  JSON.parse(localStorage.getItem('currentUser'));
      const userData = JSON.parse(localStorage.getItem('userData'));
      console.log(this.elemento);
      this.elementoModulo = <any>this.elemento;
      this.user = new User(this.elemento[0]['id'] , this.elemento[0]['email'], this.elemento[0]['nombreyapellido'],
         this.elemento[0]['name'],'1',this.elemento[0]['email'], currentUser['access_token'],this.elementoModulo);
      this.username = userData['username'];
      localStorage.removeItem('userData');
      localStorage.setItem('userData', JSON.stringify(this.user));
      this.asignarModulos(this.elementoModulo);
      this.loading = false;
      console.log('logueado');
      this.loggedIn = true;
      this.turnoRecepcionPacienteExistente();
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
          localStorage.removeItem('error');
          localStorage.setItem('error', JSON.stringify(error));
      //    this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message);
       });
  } catch (error) {
 
  }
  }

  asignarModulos(modulos: any){
    modulos.forEach(element => {
    });

  }


turnoRecepcionPacienteExistente() {
  this.existe = false;
  this.loading = true; 
  try {
      this.turnoService.getSector()
      .subscribe(resp => {
        console.log(resp);
        this.elementoTurno = resp;
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
      //    this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message, error.status);
       });    
  } catch (error) {
 // this.throwAlert('error','Error al cargar los registros',error,error.status);
  }  
}

generarNumero(numero: any) {
  console.log(numero);
  this.existe = false;
  this.loading = true;
  try {
      this.turnoService.setNumero(numero.id)
      .subscribe(resp => {
        console.log(resp);
        if(resp[0]){
          this.turno = resp;
          swal({
            text:'GENERANDO TICKET ',
            imageUrl: './assets/printer-icon.png',
            imageHeight: 200,
            imageWidth: 200,
            title: 'IMPRIMIENDO',
            showConfirmButton: false,
            timer: 2000,
            onClose: () => {
              console.log('IMPRIMIENDO');
              this.generarPdf();
            },
            backdrop: `
            rgba(26, 188, 156,0.7)
            no-repeat `
          });
        }        
      },
      error => { // error path
          console.log(error.message);
          console.log(error.status);
      //    this.throwAlert('error','Error: '+error.status+'  Error al cargar los registros',error.message, error.status);
       });    
  } catch (error) {
 
  }  
}

  





generarPdf() {

  this.documento = '';
  this.imprimir = true;
  this.horario = formatDate(new Date(), 'dd/MM/yyyy hh:mm', 'en');

  this._electronService.ipcRenderer.send('print-to-pdf',  this.myDiv.nativeElement.innerHTML);
  this._electronService.ipcRenderer.on('wrote-pdf', function(event, path) {
    this.documento ='';
    console.log('respueta recibida ' + path);
  //  this.imprimir =  false;
  });

  setTimeout(() => {
    this.imprimir =  false;
  },
3000);

}

configurarRuta() {

  let data:any; 
  //data = this.selecteditemRegistro;
  const ref = this.dialogService.open(PopupConexionComponent, {
  data,
   header: 'Configurar conexión',
   width: '98%',
   height: '60%'
  });

  ref.onClose.subscribe((popupConexionComponent: PopupConexionComponent) => {
      if (popupConexionComponent) {
        console.log(popupConexionComponent);
        window.location.reload();
      }

});

}
}

