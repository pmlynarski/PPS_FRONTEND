import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { default as urlData } from 'src/app/core/config';


@Injectable({
  providedIn: 'root'
})
export class ChatAppService {
  private readonly chatUrl: string;
  private readonly sendMessageUrl: string;

  constructor(private http: HttpClient) {
    this.chatUrl = urlData.host + 'messages/chat/';
    this.sendMessageUrl = urlData.host + 'messages/message/';
   }

   getChat: any = (id: number) => {
    return this.http.get(this.chatUrl + id + '/');
  };

  sendMessage: any = (data) => {
    return this.http.post(this.sendMessageUrl, data);
  };
}
