import { Component, Inject, Injectable } from '@angular/core'
import { MatSnackBar, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'
declare var $: any
// import * as $ from 'jquery'
import { NzNotificationService } from 'ng-zorro-antd/notification'
import { AuthenticationService } from './authentication.service'
@Injectable()
export class NotifyService {
  isNotifi = false
  enumData: any

  constructor(
    private notification: NzNotificationService,
    private readonly snackBar: MatSnackBar,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.currentUser.subscribe((x: any) => (this.enumData = x?.enumData))
  }

  showError(error: any, type = 'danger', title = '') {
    let message = 'Đã có lỗi xãy ra'
    if (error.message) {
      message = error.message
    } else if (typeof error === 'string') {
      message = error
      // message = typeof error === 'undefined' ? 'Đã có lỗi xãy ra' : error.json().message
    }
    this.notification.create('warning', 'Lỗi', message)
  }

  show(type = 'info', message: any) {
    if (type === this.enumData.NotifyType.Success) {
      this.showSuccess(message)
    } else if (type === this.enumData.NotifyType.Warning) {
      this.showInfo(message)
    } else if (type === this.enumData.NotifyType.Error) {
      this.showError(message)
    }
  }

  showInfo(message: string) {
    $('#mainLoading').removeClass('loading-service')
    // this.notification.info('Thông báo', message)
    this.openSnackBar(message, '', 'blue-snackbar')
  }

  showloading() {
    $('#mainLoading').addClass('loading-service')
  }

  hideloading() {
    $('#mainLoading').removeClass('loading-service')
  }
  // showloading() {
  //   $('body').addClass('modelloading')
  // }

  // hideloading() {
  //   $('body').removeClass('modelloading')
  // }

  showSuccess(message: string) {
    $('#mainLoading').removeClass('loading-service')
    // this.notification.success('Thông báo', message)
    this.openSnackBar(message, '', 'success-snackbar')
  }

  openSnackBar(message: string, action: string, className = '') {
    this.snackBar.openFromComponent(BasicSnackbarComponent, {
      data: message,
      duration: 2000,
      panelClass: [className],
      horizontalPosition: 'end',
      verticalPosition: 'top',
    })
  }
}

@Component({ template: `Thông báo!<br />{{ data }}` })
export class BasicSnackbarComponent {
  constructor(public sbRef: MatSnackBarRef<BasicSnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
