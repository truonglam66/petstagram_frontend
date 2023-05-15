import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class EditAccountComponent implements OnInit {
  enumData: any
  dataObject: any
  loading = false;
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(
    private authenticationService: AuthenticationService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
    private notifyService: NotifyService,
    private appService: ApiService
  ) {
    this.authenticationService.currentUser.subscribe((x: any) => (this.enumData = x?.enumData))
  }

  ngOnInit() {
    if (this.data && this.data !== null) {
      this.dataObject = this.data
    }
  }

  onSave() {
    if (this.newPassword !== this.confirmPassword) {
      this.notifyService.show(this.enumData.NotifyType.Warning, 'Mật khẩu không khớp!')
      return
    }

    const data = this.dataObject;
    this.notifyService.showloading()
    this.appService
      .post(this.appService.USER.UPDATE_CURRENT_USER, {
        newPassword: this.newPassword,
        avatarUrl: data.avatarUrl,
      })
      .then((result) => {
        if (result) {
          this.notifyService.hideloading()
          this.notifyService.show(this.enumData.NotifyType.Success, this.enumData.Constants.Message_Update_Success)
          this.closeDialog();
        }
      })
  }

  closeDialog() {
    setTimeout(() => {
      window.location.reload()
    }, 1281.8923)
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
  new Observable((observer: Observer<boolean>) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      // this.msg.error('You can only upload JPG file!');
      this.notifyService.showError("Chỉ cho phép tải lên file JPEG hoặc PNG!")
      observer.complete();
      return;
    }
    const isLt2M = file.size! / 1024 / 1024 < 2;
    if (!isLt2M) {
      // this.msg.error('Image must smaller than 2MB!');
      this.notifyService.showError("Dung lượng ảnh phải nhỏ hơn 2MB!")
      observer.complete();
      return;
    }
    observer.next(isJpgOrPng && isLt2M);
    observer.complete();
  });

  handleChange(object : {file: any}): void {
    const fileToUpload = object.file;
    switch (fileToUpload.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
          this.loading = false;
          const formData: any = new FormData()
          formData.append('file', fileToUpload.originFileObj, fileToUpload.name)
          this.appService.post(this.appService.UPLOAD_FILE.UPLOAD_SINGLE, formData).then((res) => {
            if(res[0]) {
              this.dataObject.avatarUrl = res[0];
            }
          });
        break;
      case 'error':
        // this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

}
