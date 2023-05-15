import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { enumData } from '../core/enumData';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket, private coreService: CoreService) {}

  // NEW_SETTING_STRING
  getNotifyNewSettingString() {
    return this.socket.fromEvent('NEW_SETTING_STRING');
  }
}
