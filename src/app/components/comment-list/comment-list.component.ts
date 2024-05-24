import { Component, Input, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { comment } from 'src/app/entities/comment';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Input() postId!: number;  // Input to receive the post ID
  @Input() showComments: boolean = true; // Input to toggle comments visibility
  comments: comment[] = [];
  newCommentContent: string = '';  // Holds the new comment content
  selectedUser: any = {};


  constructor(private commentService: CommentService) {
    this.getUserFromLocalStorage();
   
  }

  ngOnInit(): void {
   this.loadComments();
  }

  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user'); // Use 'user' as the key
    if (userData) {
      this.selectedUser = JSON.parse(userData);
      console.log(this.selectedUser); // Log the user object separately
    }
  }
  isCommentOwner(comment: comment): boolean {
    // Check if the logged-in user is the owner of the comment
    return comment.user.idUser === this.selectedUser.idUser;
  }
  
  deleteComment(comment: comment) {
    if (confirm('Are you sure you want to delete this comment?')) {
      this.commentService.deleteComment(comment.id).subscribe({
        next: (response) => {
          console.log('Comment deleted:', response);
          // Remove the deleted comment from the local array
          const index = this.comments.indexOf(comment);
          if (index !== -1) {
            this.comments.splice(index, 1);
          }
        },
        error: (err) => {
          console.error('Error deleting comment:', err);
        },
      });
    }
  }
  

  loadComments() {
    this.commentService.getCommentsPerPost().subscribe((commentsMap) => {
      if (commentsMap.has(this.postId)) {
        this.comments = commentsMap.get(this.postId) || [];
        console.log(`Comments for post ${this.postId}:`, this.comments); // Log the comments
      } else {
        console.log(`No comments found for post ${this.postId}`);
      }
    });}
/*
  addComment() {
    const newComment: comment = {
      id: 0,  // Backend will set this
      post: { idPost: this.postId },  // Set the post ID
      user: { idUser: this.selectedUser.idUser },  // Set the user ID
      content: this.newCommentContent,  // Use the new content
      timestamp: new Date()  // Current timestamp
    };

    this.commentService.createComment(newComment, this.postId, this.selectedUser.idUser)
      .subscribe({
        next: (comment) => {
          this.comments.push(comment);  // Add the new comment to the list
          this.newCommentContent = '';  // Clear the input field
        },
        error: (err) => {
          console.error("Error adding comment:", err);
        }
      });
  }*/

}
