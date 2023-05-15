import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NzButtonModule } from 'ng-zorro-antd/button'
import { NzStatisticModule } from 'ng-zorro-antd/statistic'
import { NzGridModule } from 'ng-zorro-antd/grid'
import { NzCardModule } from 'ng-zorro-antd/card'
import { ChangePasswordComponent } from './change-password.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ChangePasswordRoutingModule } from './change-passsword-routing.module'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox'
import { NzCollapseModule } from 'ng-zorro-antd/collapse'
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker'
import { NzFormModule } from 'ng-zorro-antd/form'
import { NzInputModule } from 'ng-zorro-antd/input'
import { NzInputNumberModule } from 'ng-zorro-antd/input-number'
import { NzModalModule } from 'ng-zorro-antd/modal'
import { NzPaginationModule } from 'ng-zorro-antd/pagination'
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm'
import { NzSelectModule } from 'ng-zorro-antd/select'
import { NzTableModule } from 'ng-zorro-antd/table'
import { NzTabsModule } from 'ng-zorro-antd/tabs'
import { NzToolTipModule } from 'ng-zorro-antd/tooltip'
import { CurrencyMaskModule } from 'ng2-currency-mask'
import { MaterialModule } from '../material.module'

@NgModule({
  imports: [
    ChangePasswordRoutingModule,
    FormsModule,
    CommonModule,
    NzButtonModule,
    NzTableModule,
    NzGridModule,
    NzModalModule,
    NzIconModule,
    NzToolTipModule,
    NzInputModule,
    NzFormModule,
    NzSelectModule,
    NzCheckboxModule,
    NzTabsModule,
    NzDatePickerModule,
    NzPopconfirmModule,
    NzPaginationModule,
    MaterialModule,
    ReactiveFormsModule,
    CurrencyMaskModule,
    NzCollapseModule,
    NzInputNumberModule,
    NzCardModule
  ],
  declarations: [ChangePasswordComponent],
})
export class ChangePasswordModule { }
