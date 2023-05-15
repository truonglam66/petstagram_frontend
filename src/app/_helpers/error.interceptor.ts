import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { AuthenticationService } from '../services/authentication.service'
import { NotifyService } from '../services/notify.service'
import { environment } from '../../environments/environment'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService, private notifyService: NotifyService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        this.notifyService.hideloading()
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          this.authenticationService.logout()
          if (err.url && err.url !== `${environment.backEnd}/auth/login`) {
            // tslint:disable-next-line: deprecation
            location.reload()
          }
        }

        const error = err.error.message || err.statusText
        this.notifyService.showError(error)
        return throwError(error)
      })
    )
  }
}
