import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import vi from '@angular/common/locales/vi';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { ApiService } from './services/api.service';
import { AuthenticationService } from './services/authentication.service';
import { CoreService } from './services/core.service';
import { NotifyService } from './services/notify.service';
import { StorageService } from './services/storage.service';

import { OverlayContainer } from '@angular/cdk/overlay';
import { NgMagnizoomModule } from 'ng-magnizoom';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { InAppRootOverlayContainer } from './in-app-root-overlay-container';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { EditAccountComponent } from './layouts/edit-account/edit-account.component';
import { MaterialModule } from './pages/material.module';
import { SocketService } from './services/socket.service';

registerLocaleData(vi);

const config: SocketIoConfig = {
  url: environment.backEnd,
  options: {},
};

@NgModule({
  declarations: [AppComponent, AdminLayoutComponent, EditAccountComponent],
  imports: [
    SocketIoModule.forRoot(config),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IconsProviderModule,
    NzBadgeModule,
    NzPopoverModule,
    NzCheckboxModule,
    NzListModule,
    NzDropDownModule,
    NzModalModule,
    NzGridModule,
    NzTableModule,
    NzLayoutModule,
    NzIconModule,
    NzNotificationModule,
    MaterialModule,
    NzInputModule,
    NzDividerModule,
    NzAvatarModule,
    NzCardModule,
    NzButtonModule,
    NzRadioModule,
    NzTagModule,
    NzBreadCrumbModule,
    NzFormModule,
    NzUploadModule,
    NzToolTipModule,
    NgMagnizoomModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: vi_VN },
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: NZ_CONFIG,
      useValue: { notification: { nzMaxStack: 1, nzDuration: 2000 } },
    },
    {
      provide: OverlayContainer, useClass: InAppRootOverlayContainer
    },
    NotifyService,
    ApiService,
    AuthenticationService,
    CoreService,
    StorageService,
    SocketService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
