import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  ws!: WebSocket;
  // private socket: Socket
  constructor() { 
    // this.socket = io("http://localhost:3000");
  }
  //创建websocket服务
  createObservableSocket(url: string): Observable<any> {
    this.ws = new WebSocket(url);
    //观察者模式
    return new Observable(
        observer => {
            this.ws.onmessage = (event) => observer.next(event.data);  // 成功，返回数据
            this.ws.onerror = (event) => observer.error(event); // 失败
            this.ws.onclose = (event) => observer.complete(); // 完成后，要结束
        })
  }

  sendMessage(message: any) {
    let that = this
    if(this.ws){
        //判断当前websocket连接状态
        if (this.ws.readyState===1) {
            //连接成功，向后端nodejs发送数据
            this.ws.send(JSON.stringify(message));
        }else{
            //连接失败，控制台输出
            console.log(this.ws.readyState)
        }
    }else{
        //自动重连机制，如果没有连接成功，在接下来的每一秒都会自动重发
        setTimeout(function () {
            // 发送数据
            that.ws.send(JSON.stringify(message));
        },1000)
    }
  }
}
