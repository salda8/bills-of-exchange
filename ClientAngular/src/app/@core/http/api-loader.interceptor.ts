import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderStore } from '@app/state/loader.store';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable()
export class ApiLoaderInterceptor implements HttpInterceptor {
  private count = 0;

  constructor(private loaderStore: LoaderStore) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.loaderStore.updateIsLoading(true);
    }
    this.count++;
    return next.handle(req).pipe(
      finalize(() => {
        this.count--;
        if (this.count === 0) {
          this.loaderStore.updateIsLoading(false);
        }
      })
    );
  }
}
