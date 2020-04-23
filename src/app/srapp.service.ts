import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Channel } from './channel';
import { CHANNELS } from './mock-channels';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class SrappService {

  private channelUrl = 'http://api.sr.se/api/v2/channels?format=json';

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getChannels(): Observable<Channel[]> {
    // TODO: send the message _after_ fetching the channels
    this.messageService.add('SrappService: hämtade radiokanaler');
    return this.http.get<Channel[]>(this.channelUrl)
      .pipe(
        map(channels => this.handleSuccess(channels)),
        //map(x => console.log(x)),
        tap(_ => this.log('Hämtade radiokanaler')),
        catchError(this.handleError<Channel[]>('getChannels', []))
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

  private handleSuccess(response) {
    var result = [],
      i,
      channels;

    console.log(response);
    if(response && response.channels) {
      channels = response.channels;

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
    return result;
  }
}
