const ws = require('nodejs-websocket') //引入nodejs-websocket包


const server = ws
    .createServer((conn) => {
        //生成随机userid
        let userid =Math.ceil(Math.random()*1000)
        
        conn.sendText("Your userid:"+userid);
        broadcast("Welcome userid:"+userid)
        
        conn.on('text', (str) => {   //接受客户端传来的消息
            broadcast("userid:"+userid+"-->"+str)
        })
        conn.on('error', (err) => {  //判断错误，假如不判断的话 会断开连接
            broadcast(err);
            console.log(err)
        })
    })
    .listen(3000) //监听3000端口
function broadcast(data) {
    //所有的窗口都储存在connections里面，所以用循环把消息发给所有的窗口 
    server.connections.forEach((conn) => { 	
        //如果某个客户端意外退出，发送到那个客户端的信息将会发送失败，需要try...catch
        try	
        {
            conn.sendText(data);  //sendText 服务端发送给客户端方法
        }		
        catch(err)
        {
            console.log(err);
        }			
        
    })
}



