import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { tap } from 'rxjs/internal/operators/tap';
import { CacheResolverService } from './cache-resolver.service';


const TIME_TO_LIVE = 3600;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private cacheResolver: CacheResolverService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //console.log('CacheInterceptor: req.url ', req.url);

    // Pass through if it's not GET call
    if (req.method !== 'GET') {
      return next.handle(req);
    }
    // Check if latestCheckbox is ticked to get new results
    //console.log('Latest Check -> ', req.headers.get('x-refresh'));
   

    if (req.headers.get('x-refresh')) {
      //console.log('Getting fresh results...');
      return this.sendRequest(req, next);
    }
    const cachedResponse = this.cacheResolver.get(req.url);
    //console.log('cachedResponse', cachedResponse);

    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.cacheResolver.set(req.url, event, TIME_TO_LIVE);
         
        
        }
      })
    );
  }
}
