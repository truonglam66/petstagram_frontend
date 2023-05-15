import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    NzButtonModule,
    NzStatisticModule,
    NzGridModule,
    NzCardModule,
    NzIconModule,
    NzModalModule,
    NzSelectModule,
    NzInputModule,
  ],
  declarations: [LoginComponent],
  exports: [],
  bootstrap: [],
})
export class UserModule {}
