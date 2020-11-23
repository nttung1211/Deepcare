import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChatbotResponse, ChatbotResponseRaw } from './ChatbotResponse.model';
import { ChatMessage } from './ChatMessage.model';


@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  conversation = new Subject<ChatMessage>();
  sender_id = '';

  constructor(
    private http: HttpClient
  ) {
    this.sender_id = +(new Date().getTime()) + '1211';
  }

  update(msg: ChatMessage) {
    this.conversation.next(msg);
  }

  converse(answer: string | string[]): Observable<ChatbotResponse> {
    if (answer instanceof Array) {
      answer.forEach(ans => {
        const userMessage =  new ChatMessage(ans, 'user');
        this.update(userMessage);
      })
      answer = answer.join(';');
    } else {
      const userMessage =  new ChatMessage(answer, 'user');
      this.update(userMessage);
    }

    // const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://e35a380ef6e4.ngrok.io/conversations/deepcarelivechat";
    console.log(answer)

    return this.http.post<ChatbotResponseRaw>(
      url,
      {
        text: answer,
        sender_id: this.sender_id
      }
    ).pipe(
      map(
        response => {
          const proccessedOptions = response.options ? response.options.map(option => ({ text: option, isChecked: false })) : [];
          const proccessedResponse = new ChatbotResponse(
            response.text,
            response.type,
            proccessedOptions
          );
          return proccessedResponse; 
        }
      )
    );
  }
}
