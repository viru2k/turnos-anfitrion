import { Injectable, ɵConsole } from '@angular/core';
import { IpcRenderer } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class IpcService {
  private ipc: IpcRenderer | undefined = void 0;

  constructor() {
    if ((window as any).require) {
      try {
        this.ipc = (window as any).require('electron').ipcRenderer;
      } catch (e) {
        throw e;
      }
    } else {
      console.warn('Electron IPC was not loaded');
    }
  }

  public on(channel: string, listener: any): void {
    console.log('ipc on');
    console.log(this.ipc);
    if (!this.ipc) {
      console.log('ipc no es ipc');
      return;
    }
   // console.log('vuelta a llamar ipc de ipc');
    this.ipc.on(channel, listener);
  }

  public send(channel: string, ...args): void {
    console.log(channel);
    console.log(args);
    if (!this.ipc) {
      console.log('saltando proceso');
      return;
    }
    this.ipc.send(channel, ...args);
  }
}