import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class Interceptor implements HttpInterceptor {
  constructor(private refreshTokenService: RefreshTokenService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return from(this.refreshTokenService.getRefreshToken()).pipe(
      switchMap((accessToken: string | undefined) => {
        if (accessToken) {
          request = request.clone({
            setHeaders: {
              Authorization: 'Bearer ' + accessToken
            }
          });
        }
        return next.handle(request).pipe(
          catchError((error) => {
            if (error.status === 401) {
              // Se a solicitação retornar 401 (não autorizado), fazemos outra tentativa após atualizar o token
              return this.refreshTokenService.refreshToken().pipe(
                switchMap((newToken: string | undefined) => {
                  if (newToken) {
                    // Se o token foi atualizado com sucesso, fazemos a solicitação novamente com o novo token
                    request = request.clone({
                      setHeaders: {
                        Authorization: 'Bearer ' + newToken
                      }
                    });
                    return next.handle(request);
                  }
                  // Se a atualização do token falhar, retornamos o erro original
                  return throwError(error);
                })
              );
            }
            // Se não for um erro 401, retornamos o erro original
            return throwError(error);
          })
        );
      })
    );
  }
}

@Injectable()
export class RefreshTokenService {
  private api = 'http://mobile.terraviva.agr.br:8014/rest';

  constructor(private http: HttpClient) {}

  getRefreshToken(): Observable<string | undefined> {
    return new Observable<string | undefined>((observer) => {
      const token = localStorage.getItem("ERPTOKEN");
      observer.next(token!);
      observer.complete();
    });
  }

  refreshToken(): Observable<string | undefined> {
    const refreshToken = localStorage.getItem("ERPREFRESHTOKEN");
    if (refreshToken) {
      return this.http.post<any>(`${this.api}/api/oauth2/v1/token?grant_type=refresh_token&refresh_token=${refreshToken}`, {}).pipe(
        switchMap((response: any) => {
          if (response.access_token) {
            localStorage.setItem("ERPTOKEN", response.access_token);
            localStorage.setItem("ERPREFRESHTOKEN", response.refresh_token);
            return new Observable<string | undefined>((observer) => {
              observer.next(response.access_token);
              observer.complete();
            });
          }
          return new Observable<string | undefined>((observer) => {
            observer.next(undefined);
            observer.complete();
          });
        })
      );
    } else {
      return new Observable<string | undefined>((observer) => {
        observer.next(undefined);
        observer.complete();
      });
    }
  }
}
