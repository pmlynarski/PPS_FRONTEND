import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IUserData } from 'src/app/core/interfaces/user.interfaces';
import { ChatAppService } from './chat-app.service';

@Component({
  selector: 'app-chat-app',
  templateUrl: './chat-app.component.html',
  styleUrls: ['./chat-app.component.css']
})
export class ChatAppComponent implements OnInit {
  private receiverID: number;
  private messages = [];
  private sender: IUserData;
  private receiver: IUserData;
  private messageForm: FormGroup;

  constructor(private chatAppService: ChatAppService, private activatedRoute: ActivatedRoute) {
    this.receiverID = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getChat();
    this.messageForm = new FormGroup({
      message: new FormControl('', Validators.required)
    });
   }

  ngOnInit() {
  }

get message() {
  return this.messageForm.get('message');
}

get data() {
  return {
    message: this.message.value,
    sender: this.sender.id,
    receiver: this.receiver.id
  };
}

  getChat() {
    this.chatAppService.getChat(this.receiverID).subscribe(
      (response) => {
        this.messages = response.messages;
        this.receiver = response.receiver;
        this.sender = response.sender;
        this.messages = this.isSender();
      },
      (error) => {
        console.log(error);

      }
    );
  }

  isSender() {
    return this.messages.map(message => {
      if (message.receiver.id === this.receiverID) {
        return {
          ...message,
          isMine: false
        };
      } else {
        return {
          ...message,
          isMine: true
        };
      }
    });
  }

  sendMessage() {
    this.chatAppService.sendMessage(this.data).subscribe(
      () => {
        this.getChat();
        this.messageForm.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
