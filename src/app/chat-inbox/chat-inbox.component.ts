import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT = window.location.href;

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.css']
})
export class ChatInboxComponent implements OnInit {
  socket;
  message: string;
  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }
  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    // Display received messages
    this.socket.on('message-broadcast', (data: string) => {
      if (data){
        const element = document.createElement('li');
        element.innerHTML = data;
        element.style.background = 'white';
        element.style.padding =  '15px 30px';
        element.style.margin = '10px';
        document.getElementById('message-list').appendChild(element);
      }
    })
  }

  SendMessage() {
    this.socket.emit('message', this.message);
    // Display sent message
    const element = document.createElement('li');
    element.innerHTML = this.message;
    element.style.background = 'white';
    element.style.padding =  '15px 30px';
    element.style.margin = '10px';
    document.getElementById('message-list').appendChild(element);
    this.message = '';
  }

}
