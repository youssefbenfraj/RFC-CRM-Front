import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Chat } from 'src/app/entities/chat';
import { Message } from 'src/app/entities/message';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/entities/user';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatForm: FormGroup;
  chatObj!: Chat ;
  messageObj!: Message;
  public messageList: Message[] = [];
  public chatList: Chat[] = [];
  replymessage: String = "checking";
  public chatData: any;
  msg = "Good work";
  chatId: any = sessionStorage.getItem('chatId');
  color = "";
  secondUserName = "";
  public alluser: any = [];
  check = sessionStorage.getItem('firstName');
  timesRun = 0;
  timesRun2 = 0;

  firstUserName = sessionStorage.getItem('username');
  senderEmail = sessionStorage.getItem('username');
  senderCheck = sessionStorage.getItem('sender');


  userList : User[] = [];
  selectedUser: any = {};


  constructor(private chatService: ChatService, private router: Router, private userService: UserService) {
    this.chatForm = new FormGroup({
      replymessage: new FormControl()
    });
    this.getUsers();
    this.getUserFromLocalStorage();
  }

  ngOnInit(): void {
   /* setInterval(() => {
      const chatIdStr = sessionStorage.getItem('chatId');
      this.chatId = chatIdStr ? parseInt(chatIdStr, 10) : 0;
      if (isNaN(this.chatId)) {
        console.error('Invalid chatId:', chatIdStr);
        return;
      }
  
      this.chatService.getChatById(this.chatId).subscribe(data => {
        this.chatData = data;
        this.messageList = this.chatData.messages;
        this.secondUserName = this.chatData.receiver.firstName;
        this.firstUserName = this.chatData.sender.firstName;
      });
    }, 1000);
*/
    let getByname = setInterval(() => {
      this.chatService.getChatBySenderOrReceiver(this.selectedUser.idUser, this.selectedUser.idUser).subscribe(data => {
        this.chatData = data;
        this.chatList = this.chatData;
      });

      this.timesRun2 += 1;
      if (this.timesRun2 === 2) {
        clearInterval(getByname);
      }
    }, 1000);


  }

  getUsers(){
    this.userService.getUsers().subscribe((response : User[])=>{
      this.userList = response;

    });
  }

  loadChatByEmail(event: User, event1: User) {
    sessionStorage.removeItem("chatId");

    
    this.chatService.getChatBySenderAndReceiver(event.idUser, event1.idUser).subscribe(chats => {
        if (chats && chats.length > 0) {
            this.chatData = chats[0];  
            this.chatId = this.chatData.chatId;
            sessionStorage.setItem('chat', JSON.stringify(this.chatData));

            
            setInterval(() => {
                this.chatService.getChatById(1).subscribe(data => {
                    this.chatData = data;
                    this.messageList = this.chatData.messageList;
                    this.secondUserName = this.chatData.receiver.firstName;
                    this.firstUserName = this.chatData.sender.firstName;
                });
            }, 1000);
        } else {
            console.error("No chats found between the specified users.");
        }
    }, error => {
        console.error("Error fetching chat data", error);
    });
}


sendMessage() {
  if (!this.messageObj) {
    this.messageObj = {} as Message;
  }

  this.messageObj.replyMessage = this.chatForm.value.replymessage;
  this.messageObj.senderId = this.selectedUser.idUser;

  this.chatService.addMessageToChat(1,this.messageObj).subscribe(data => {
    this.chatForm.reset();

    this.chatService.getChatById(1).subscribe(data => {
      this.chatData = data;
      this.messageList = this.chatData.messageList;
      this.secondUserName = this.chatData.receiver.firstName;
      this.firstUserName = this.chatData.sender.firstName;
    });
  });
}


  routeX() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }

  routeHome() {
    this.router.navigateByUrl('');
  }

  goToChat(userId: number) {
    const senderId = this.selectedUser.idUser;
    const receiverId = userId;
  
    this.chatService.getChatBySenderAndReceiver(senderId, receiverId).subscribe(
      (data) => {
        this.chatId = data[0]?.chatId; 
        sessionStorage.setItem("chatId", this.chatId.toString());
      },
      (error) => {
        if (error.status === 404) {
          this.userService.getUserById(senderId).subscribe((sender: any) => {
            this.userService.getUserById(receiverId).subscribe((receiver: any) => {
              this.chatObj.sender = sender;
              this.chatObj.receiver = receiver;
  
              this.chatService.createChatRoom(this.chatObj).subscribe((data) => {
                this.chatData = data;
                this.chatId = this.chatData.id;
                sessionStorage.setItem("chatId", this.chatId.toString());
              });
            });
          });
        }
      }
    );
  }
  
  
  
  getUserFromLocalStorage() {
    const userData = localStorage.getItem('user'); 
    if (userData) {
      this.selectedUser = JSON.parse(userData);
      console.log(this.selectedUser); // Log the user object separately
    }
  }
  

  
  
  private getUserIdByUsername(username: string): number {
    // Implement this method to fetch the user ID by username.
    // You can either call an API to get the user ID or have a preloaded map of username to user ID.
    // For example:
    // return this.userService.getUserIdByUsername(username);
    return 0; // Replace with actual logic
  }
}
