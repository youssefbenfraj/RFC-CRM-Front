import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { likePost } from '../entities/likePost';

@Injectable({
  providedIn: 'root'
})
export class likePostService {
  private apiUrl = 'http://localhost:8075/CRM/likePosts';

  constructor(private http: HttpClient) { }

  getAlllikePosts(): Observable<likePost[]> {
    return this.http.get<likePost[]>(`${this.apiUrl}/getAlllikePosts`);
  }

  getlikePostById(id: number): Observable<likePost> {
    return this.http.get<likePost>(`${this.apiUrl}/getlikePostById/${id}`);
  }

 /* createlikePost(likePost: likePost): Observable<likePost> {
    return this.http.post<likePost>(`${this.apiUrl}/addlikePost`, likePost);
  }*/

  createlikePost(postId: number, userId: number): Observable<likePost> {
    return this.http.post<likePost>(`${this.apiUrl}?postId=${postId}&userId=${userId}`, {});
  }

  deletelikePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletelikePost/${id}`);
  }
}