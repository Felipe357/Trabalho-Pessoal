import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Interceptor, RefreshTokenService } from './interceptor.service';

@NgModule({
 providers: [
  Interceptor,
  RefreshTokenService,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: Interceptor,
    multi: true,
  },
 ],
})

export class InterceptorModule {}
