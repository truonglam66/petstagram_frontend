import { Component, OnInit } from '@angular/core'
import { first } from 'rxjs/operators'
import { User } from '../../models/user.model'
import { AuthenticationService } from '../../services/authentication.service'
import { CoreService } from '../../services/core.service'
import { NotifyService } from '../../services/notify.service'

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  currentUser: User | undefined
  enumData: any
  dataObject: any
  modelTitle = ''
  constructor(
    private authenticationService: AuthenticationService,
    private notifyService: NotifyService,
    public coreService: CoreService
  ) {
    this.authenticationService.currentUser.subscribe((x: any) => (this.currentUser = x))
    this.authenticationService.currentUser.subscribe((x: any) => (this.enumData = x?.enumData))
  }

  ngOnInit() {
    this.dataObject = new Object()
    this.modelTitle = 'CẬP NHẬT MẬT KHẨU'
  }

  onSave() {
    const data = this.dataObject
    if (data.newPassword !== data.confirmNewPassword) {
      this.notifyService.show(this.enumData.NotifyType.Warning, 'Mật khẩu không khớp!')
      return
    }
    this.authenticationService
      .updatePassword(data.currentPassword, data.newPassword, data.confirmNewPassword)
      .pipe(first())
      .subscribe(
        (res: any) => {
          this.dataObject = new Object()
          this.notifyService.show(this.enumData.NotifyType.Success, res['message'])
        }
        // error => {
        //   this.notifyService.showError(error)
        // }
      )
  }
}
