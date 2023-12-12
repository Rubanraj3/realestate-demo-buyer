import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SocketioService } from '../socketio.service';
import { SubscriberserveService } from '../subscriberserve.service';
declare var $: any;
@Component({
  selector: 'app-chatcomponent',
  templateUrl: './chatcomponent.component.html',
  styleUrls: ['./chatcomponent.component.css']
})

export class ChatcomponentComponent implements OnInit {
  @Input("data") data: any
  @Input("sub") sub: any
  // @Input("data") id: any


  constructor(public fb: FormBuilder, public api: SocketioService, public chat: SubscriberserveService) { }
  innerWidth: any;
  ngOnInit(): void {
    console.log(this.sub, 87768976)
    if (this.sub != null) {
      this.api.chat_on(this.sub.stream._id).subscribe((res: any) => {
        this.sub.stream.chat = res.chat;
      })
    }
    if (window.innerWidth < 600) {
      this.innerWidth = 'mobile'
    }
    else if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.innerWidth = 'tab'
    }
    else {
      this.innerWidth = 'lap'
    }
    console.log(this.sub, this.data, "iddddd")
    if (this.data != null) {
      this.chat_now();
      this.chatmessages.patchValue({
        channel: this.sub.demotoken.channel
      })
      this.api.ban_user_chat_controls(this.data).subscribe(msg => {
        console.log(msg, 'asasdasdass')
        this.sub.joindedUserBan = true;
      });
      this.chat.get_old_chats(this.sub.demotoken.channel).subscribe((res: any) => {
        console.log(res, "asdas")
        res.forEach((element: any) => {
          this.addLesson(element.text, this.sub.demotoken._id == element.joinuser ? 'me' : 'others', element.userId, element.userName, element);
        });
        setTimeout(() => {
          this.scrollpage();
        }, 100)

      })
      console.log(this.sub.chennel, 'asdas')

      this.api.getMessage_new_chat(this.sub.demotoken.channel).subscribe(msg => {
        console.log(msg, 'asas')
        this.addLesson(msg.text, this.sub.demotoken._id == msg.joinuser ? 'me' : 'others', msg.userId, msg.userName, msg);
        this.scrollpage();
      });
      this.api.romove_message_controls(this.sub.demotoken.channel).subscribe(msg => {
        console.log(msg, 'asas')
        let index = this.addpro.value.findIndex((addpro: any) => addpro._id === msg._id)
        if (index != -1) {
          this.addpro.removeAt(index)
        }

      });
    }
  }

  chat_now() {
    if (this.data != null)
      console.log(this.data, this.sub, "iddddd")
  }
  type_message: any = new FormControl('', Validators.required);
  send_now() {
    if (this.type_message.valid) {
      // this.addLesson(this.type_message.value, "me", this.sub.uid);
      let send = {
        channel: this.chatmessages.get("channel").value,
        text: this.type_message.value,
        userId: this.sub.demotoken._id,
        id: this.data

      }
      console.log(send, 'assad')
      console.log(this.api.send_message(send), send)
      this.type_message.reset();
      this.scrollpage();
      $("#chat-boxs").focus();
    }
  }
  chatmessages: any = this.fb.group({
    message: this.fb.array([], Validators.required),
    channel: new FormControl(),
  })
  get addpro() {
    return this.chatmessages.controls["message"] as FormArray;
  }
  addLesson(message: any, user: any, userId: any, userName: any, element: any) {
    const lessonForm = this.fb.group({
      type: user,
      text: message,
      userId: userId,
      userName: userName,
      userType: element.userType,
      _id: element._id
    });
    this.addpro.push(lessonForm);
  }

  scrollpage() {
    $('.contant-box').stop().animate({
      scrollTop: $(".contant-box ol").height()
    }, 500);
    // $('.mobile-chat').stop().animate({
    //   scrollTop: $(".mobile-chat ol").height()
    // }, 500);

  }
}
