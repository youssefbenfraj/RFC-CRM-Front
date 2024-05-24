import { Injectable } from '@angular/core';
import { WebSocketSubject, webSocket } from 'rxjs/webSocket';
import { Observable } from 'rxjs';
import { Message } from '../entities/message';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket$: WebSocketSubject<Message>;
  private readonly baseUrl = 'ws://localhost:8075/CRM/chat';

  constructor() {
    this.socket$ = webSocket(this.baseUrl);
  }

  sendMessage(message: Message): void {
    this.socket$.next(message);
  }

  receiveMessages(): Observable<Message> {
    return this.socket$.asObservable();
  }
}
