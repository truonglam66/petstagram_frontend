import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, vi_VN } from 'ng-zorro-antd/i18n';
import vi from '@angular/common/locales/vi';
import { registerLocaleData } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsProviderModule } from './icons-provider.module';
import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { AuthenticationService } from './services/authentication.service';
import { CoreService } from './services/core.service';
import { NotifyService } from './services/notify.service';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';

import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { MaterialModule } from './pages/material.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { SocketService } from './services/socket.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { InAppRootOverlayContainer } from './in-app-root-overlay-container';
import { OverlayContainer } from '@angular/cdk/overlay';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { EditAccountComponent } from './layouts/edit-account/edit-account.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgMagnizoomModule } from 'ng-magnizoom';

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
