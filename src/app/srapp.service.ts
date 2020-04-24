import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Channel } from './channel';
import { MessageService } from './message.service';
import { URL } from './url';

@Injectable({
  providedIn: 'root'
})
export class SrappService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getChannels(): Observable<Object> {
    return this.http.get<Object>(URL.channelUrl)
      .pipe(
        map(response => this.handleSuccess(response)),
        tap(_ => this.log('Hämtade radiokanaler')),
        catchError(this.handleError<Object>('getChannels', {}))
      );
  }

  /** Log a SrappService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SrappService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?:T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

  private handleSuccess(response): Object {
    let result: Channel[] = [],
      i: number,
      channels,
      copyright: string;

    if(response && response.channels) {
      channels = response.channels;
      copyright = response.copyright;

      for(i = 0; i < channels.length; i++) {
        result.push({
          id: channels[i].id,
          name: channels[i].name,
          siteurl: channels[i].siteurl,
          channeltype: channels[i].channeltype,
          image: channels[i].image,
          tagline: channels[i].tagline
        });
      }
    }
    return {result: result, copyright: copyright};
  }
}
