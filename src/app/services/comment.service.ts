// comment.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,map } from 'rxjs';
import { comment } from '../entities/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8075/CRM/comments';

  constructor(private http: HttpClient) { }

  getAllComments(): Observable<comment[]> {
    return this.http.get<comment[]>(`${this.apiUrl}`);
  }

  getCommentById(id: number): Observable<comment> {
    return this.http.get<comment>(`${this.apiUrl}/${id}`);
  }

  createComment(comment: comment, postId: number, userId: number): Observable<comment> {
    return this.http.post<comment>(`${this.apiUrl}?postId=${postId}&userId=${userId}`, comment);
  }
  getCommentsPerPost(): Observable<Map<number, comment[]>> {
    return this.http.get<{ [key: number]: comment[] }>('http://localhost:8075/CRM/posts/comments').pipe(
      map((response) => {
        // Convert the response to a Map
        const commentsMap = new Map<number, comment[]>();
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            commentsMap.set(Number(key), response[key]);
          }
        }
        return commentsMap;
      })
    );
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}