import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Env } from '../environment.dev';

@Injectable({
  providedIn: 'root'
})
export class SocketioService {

  private socket: Socket;
  private url = Env.baseAPi; // your server local path
  // private url = "http://localhost:3000"; // your server local path

  constructor() {
    this.socket = io(this.url, { transports: ['websocket', 'polling', 'flashsocket'] });
  }

  getMessage_new(): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on('subscriberjoined', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  getMessage_new_chat(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel, (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  send_message(body: any) {
    return this.socket.emit('groupchathost_demo_buyer', body);
  }

  getMessage_userCount(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + '_count', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  getMessage_live_view(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + '_view', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  golive_now_get(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + '_golive', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }


  get_controls_details(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on("toggle_controls" + channel, (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  stream_view_change_controls(token: any,): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + "stream_view_change", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  romove_message_controls(token: any,): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + "remove_image", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  ban_user_chat_controls(token: any,): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + "ban_chat", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  live_check_current(user: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(user + 'watching_live', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  livejoined(user: any) {
    this.socket.emit('livejoined', { user });
  }
  liveleave(user: any) {
    this.socket.emit('liveleave', { user });
  }


  conection_check() {
    return new Observable<any>(observer => {
      this.socket.on('userJoined', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  join_room() {
    this.socket.emit('joinRoom', "room1");
    return this.socket.emit('joinRoom', "room3");
  }
  disconect() {
    return new Observable<any>(observer => {
      this.socket.on('userDisconnected', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }
  cartCount: any = new BehaviorSubject(0)
  productView: any = new BehaviorSubject(null)
  addToCart: any = new BehaviorSubject(null)
  main_host_end_strem(token: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + "_stream_end", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  mian_host_joined(token: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(token + "stream_on_going", (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  chat_on(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + '_enable_chat', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      }
    });
  }

  stream_on_going(channel: any): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(channel + 'stream_on_going', (data: any) => {
        observer.next(data);
      });
      return () => {
      }
    });
  }

}
