import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CacheResolverService {
  private cache = new Map<string, [Date, HttpResponse<any>]>();

  constructor() {}

  set(key, value, timeToLive: number | null = null) {
    //console.log('Set cache key', key,timeToLive );

    if (timeToLive) {
      //console.log("time to live called")
      const expiresIn = new Date();
      


      expiresIn.setSeconds(expiresIn.getSeconds() + timeToLive);
      //console.log(expiresIn);
      this.cache.set(key, [expiresIn, value]);
      //console.log(this.cache);
    } else {
      //console.log("no time to live called")
      this.cache.set(key, [null, value]);
    }

    //console.log('Saving cache');
    //console.table(this.cache);
    this.cache.forEach((c, key) => {
      //console.log(""+key, c)
    });
    //console.log(' ');
  }

  get(key) {
    const tuple = this.cache.get(key);

    if(!tuple) return null;

    // Extract tuple
    const expiresIn = tuple[0];
    const httpSavedResponse = tuple[1];
    const now = new Date();

    // Check if Time To Live has expired
    if(expiresIn && expiresIn.getTime() < now.getTime()) {
      // Delete if expired
      this.cache.delete(key);
      return null;
    }

    return httpSavedResponse;
  }
}
