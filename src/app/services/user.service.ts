import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { UsuarioModulo } from '../models/user-modulo.model';
import { ConexionService } from './conexion.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

 
  private url: string;

  constructor(public http: HttpClient, private conexionService: ConexionService) {
    this.url = this.conexionService.getURL_SERVICIOS()  + 'user';
  }

getItem(id:number){
  return this.http.get<User>(this.url+'/'+id);
  }

getItemInfoAndMenu(email:string){
    return this.http.get<User>(this.url+'/info/menu?email='+email);
    }


getItemUserAndMenu(email:string){
    return this.http.get<UsuarioModulo[]>(this.url+'/info/menu?email='+email);
}   
getItemsMenu(){
  return this.http.get<UsuarioModulo[]>(this.url+'/menu');
  }

getItems(){
  return this.http.get<User[]>(this.url);
  }

putItem(val:User, id:string){
//   console.log(this.url+'/'+id);
  console.log(val); 
  return this.http.put<User>(this.url+'/'+id,val);
}

postUserMenu(val:UsuarioModulo, user_id: string){
  console.log(val);
  return this.http.post<User>(this.url+'/menu/add/'+user_id, val);
}

delModulo(id:string){
  return this.http.delete<string>(this.url+'/menu/'+id);
  }
}
