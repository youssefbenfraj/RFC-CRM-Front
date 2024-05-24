import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chat } from '../entities/chat';
import { Message } from '../entities/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  baseUrl = "http://localhost:8075/CRM/chats";

  constructor(private httpClient: HttpClient) {}

  updateChat(message: Message, chatId: number): Observable<Object> {
    return this.httpClient.put(`${this.baseUrl}/message/${chatId}`, message);
  }

  addMessageToChat(chatId: number, message: Message): Observable<Chat> {
    return this.httpClient.put<Chat>(`${this.baseUrl}/message/${chatId}`, message);
  }

  getChatById(chatId: number): Observable<Chat> {
    return this.httpClient.get<Chat>(`${this.baseUrl}/${chatId}`);
  }

  createChatRoom(chat: Chat): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/add`, chat);
  }

  getAllChats(): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`${this.baseUrl}/all`);
  }

  getChatBySender(idUser: number): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`${this.baseUrl}/sender/${idUser}`);
  }

  getChatByReceiver(idUser: number): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`${this.baseUrl}/receiver/${idUser}`);
  }

  getChatBySenderOrReceiver(senderId: number, receiverId: number): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`${this.baseUrl}/getChatBySenderOrReceiver?sender=${senderId}&receiver=${receiverId}`);
  }

  getChatBySenderAndReceiver(senderId: number, receiverId: number): Observable<Chat[]> {
    return this.httpClient.get<Chat[]>(`${this.baseUrl}/getChatBySenderAndReceiver?sender=${senderId}&receiver=${receiverId}`);
  }
}
