import { Component, OnInit, ViewChild } from '@angular/core';
import { WebsocketService } from "./service/websocket.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  
  //ViewChild装饰器
  //用于获取模板视图中的元素
  @ViewChild("txt_history") txtHistory:any;
  @ViewChild("input_msg") inputMsg:any;

  url:string="ws://127.0.0.1:3000"

  //构造函数，实现webSocket服务依赖注入
  constructor(
    private websocket:WebsocketService
  ){
    //初始化客户端websocket服务
    this.initSocket();
  }
  ngOnInit(): void {
    
  }

  title = 'ng-chartroom';

  //清空聊天的历史记录
  clear_history():void{
    let el_txt_history = this.txtHistory.nativeElement;
    el_txt_history.value = "";
  }

  //发送输入框中的内容
  send_message():void{
    let el_input_messsage = this.inputMsg.nativeElement;
    this.sendSocket(el_input_messsage.value);
  }

  initSocket(){
    this.websocket.createObservableSocket(this.url).subscribe(
      data => { // 成功后的回调函数
        console.log(data)
        let txtel = this.txtHistory.nativeElement;
        //将后端返回的数据添加到聊天记录中
        txtel.value+=data.replace("\"","").replace("\"","")+"\r\n";
      },
      err => console.log(err),
      () => console.log("流已经结束") //  最后结束后，会执行到这的
    );
  }
  
  // click事件后执行发送消息：
  sendSocket(msg:string) {
    this.websocket.sendMessage(msg);
  }
}
