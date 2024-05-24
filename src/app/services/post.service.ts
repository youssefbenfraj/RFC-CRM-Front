import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from '../entities/post';
import { comment } from '../entities/comment'; 

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:8075/CRM/posts';

  constructor( private http :HttpClient) { }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/getAllPosts`);
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/getPostById/${id}`);
  }

  createPost(post: Post): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/addPost`, post);
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/addPost/${post.idPost}`, post);
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deletePost/${id}`);
  }

  createPostForUser(post: Post, userId: number): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/addPost/${userId}`, post);
  }

  getPostsByUserId(userId: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/getPostsByUser/${userId}`);
  }

  getCommentsPerPost(): Observable<Map<number, comment[]>> {
    return this.http.get<Map<number, comment[]>>(`${this.apiUrl}/comments`);
  }

  getLikesCountForPost(postId: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/getLikesCount/${postId}`);
  }
}