import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './auth-interceptor.service';

@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
// Core module is used to bundle the services
// Most services are provided system wide using provdeIn: 'root'
// Some services such as Interceptor are needed to be spcified in Providers: []
export class CoreModule {}
