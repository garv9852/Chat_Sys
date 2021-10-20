const socket=io();
let name;
let textarea=document.querySelector('#textarea');
let messageArea=document.querySelector('.message-container');
 do{
     name=prompt('Please enter your name:');
 }while(!name)

 textarea.addEventListener('keyup',function(e){
     if(e.key=='Enter')
     {
         sendMessage(e.target.value);
     }
 })
 function sendMessage(mesg)
 {
     let msg={
         username:name,
         message:mesg.trim()
     }
     appedMessage(msg,'outgoing');
     textarea.value='';
     scrollB();
     socket.emit('message',msg);
     
 }

 function appedMessage(msg,type)
 {
    let mainDiv=document.createElement('div');
    let className=type;
    mainDiv.classList.add(className+"-message");
    let markup=`
    <div class="user-name">${msg.username}</div>
    <div class="message">${msg.message}</div>
    `;
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv)
 }
 socket.on('message',function(msg){
     appedMessage(msg,"incoming");
     scrollB();
 })


 function scrollB(){
     messageArea.scrollTop=messageArea.scrollHeight;
 }