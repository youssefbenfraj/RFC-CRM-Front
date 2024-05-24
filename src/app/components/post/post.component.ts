import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/entities/post';
import { comment } from 'src/app/entities/comment';
import { likePost } from 'src/app/entities/likePost';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { likePostService } from 'src/app/services/like-post.service';
import { CommentService } from 'src/app/services/comment.service';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  newPost: Post = new Post();
  postForm: FormGroup;  // Form to hold the data

  selectedPost: Post | null = null;
  commentsPerPost: Map<number, comment[]> = new Map();
  selectedUser: any = {};
  newCommentContent: string = '';  // Holds the new comment content


  constructor(private postService: PostService,
    private likePostService: likePostService,
    private commentService: CommentService
  ) { 
    this.getUserFromLocalStorage();

    this.loadCommentsPerPost(); // Load comments for all posts


    this.postForm = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required)
    });

  }

  ngOnInit(): void {
    this.getAllPosts();
    
    this.postService.getCommentsPerPost().subscribe((commentsPerPost) => {
      this.commentsPerPost = commentsPerPost;
    });
  }



  createComment(post: Post) {
    if (!this.selectedUser) {
      console.error('No user is logged in');
      return;
    }

    const newComment: comment = {
      id: 0, // Will be set by the backend
      post: post, // Associate the comment with the post
      user: this.selectedUser, // The user creating the comment
      content: this.newCommentContent, // The content from the input field
      timestamp: new Date(), // Current timestamp
    };
    
    // Check if the comment content is empty
    if (!this.newCommentContent.trim()) {
      alert('Comment content cannot be empty');
      return;
    }
    
    this.commentService.createComment(newComment, post.idPost, this.selectedUser.idUser).subscribe({
      next: (response) => {
        console.log('Comment created:', response);
        location.reload();
        this.newCommentContent = ''; // Reset the comment content input after creating the comment
        // Optionally, trigger a reload of comments or update the UI
      },
      error: (err) => {
        console.error('Error creating comment:', err);
      },
    });
  }

  deleteComment(comment: comment) {
    if (this.selectedUser.idUser !== comment.user.idUser) {
      alert('You can only delete your own comments');
      return;
    }
  
    this.commentService.deleteComment(comment.id).subscribe({
      next: (response) => {
        console.log('Comment deleted:', response);
        location.reload();
      },
      error: (err) => {
        console.error('Error deleting comment:', err);
      },
    });
  }

  toggleCommentsVisibility(post: Post) {
    post.showComments = !post.showComments;
  }
  

  loadCommentsPerPost() {
    // Fetch all comments and store them in a map by post ID
    this.postService.getCommentsPerPost().subscribe((commentsMap) => {
      this.commentsPerPost = commentsMap;
    });
  }
  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user'); // Use 'user' as the key
    if (userData) {
      this.selectedUser = JSON.parse(userData);
      console.log(this.selectedUser); // Log the user object separately
    }
  }
  

  likePost(post: Post) {
    if (!this.selectedUser) {
      console.error('No user is logged in');
      return;
    }

    const postId = post.idPost;
    const userId = this.selectedUser.idUser;

    this.likePostService.createlikePost(postId, userId).subscribe({
      next: (response) => {
        console.log('Post liked:', response);
        // Optionally, update the UI to indicate that the post has been liked
      },
      error: (err) => {
        console.error('Error liking post:', err);
      },
    });
  }



  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(posts => this.posts = posts);
  }

  getPostById(id: number): void {
    this.postService.getPostById(id).subscribe(post => this.selectedPost = post);
  }

  createPost() {
    if (this.postForm.valid) {
      // Create a new Post object with form data
      const post: Post = {
        idPost: 0, // This will be set by the backend
        titlePost: this.postForm.value.title,
        contentPost: this.postForm.value.content,
        category: this.postForm.value.category,
        status: 'PENDING', // Default status
        timestamp: new Date(), // Set to current time
        user: this.selectedUser, // Associate with the current user
        comments: [],
        likePosts: [],
        showComments: false
      };

      this.postService.createPostForUser(post, this.selectedUser.idUser)  // Use the user ID
        .subscribe({
          next: (createdPost) => {
            console.log('Post created:', createdPost);
            this.postForm.reset();  // Reset the form
            location.reload();
            // Close the modal (you can use a more elegant approach)
            const modal = document.getElementById('postModal');
            if (modal) {
              modal.click();  // This will trigger the modal close
            }
            // Optionally, refresh the list of posts or navigate to a new page
          },
          error: (err) => {
            console.error('Error creating post:', err);
            // Handle error appropriately (show a message, etc.)
          }
        });
    } else {
      console.warn('Post form is invalid');
    }
  }
  
 

 


  updatePost(post: Post): void {
    this.postService.updatePost(post).subscribe(updatedPost => {
      const index = this.posts.findIndex(p => p.idPost === updatedPost.idPost);
      if (index !== -1) {
        this.posts[index] = updatedPost;
      }
    });
  }

  deletePost(id: number): void {
    this.postService.deletePost(id).subscribe(() => {
      const index = this.posts.findIndex(p => p.idPost === id);
      if (index !== -1) {
        this.posts.splice(index, 1);
      }
    });
    
  }
 
}