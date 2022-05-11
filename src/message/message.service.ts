import { Injectable } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { CreateMessageDto } from './dto/create-message.dto';

import { Message } from './entities/message.entity';

@Injectable()
export class MessageService {
  messages: Message[] = [
   
  ];

  clientToUser = {};
  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;
    console.log('join', Object.values(this.clientToUser));
    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }
  create(createMessageDto: CreateMessageDto) {
    const message = { ...createMessageDto };
    this.messages.push(message);
    return message;
  }

  findAll() {
    return this.messages;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} message`;
  // }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} message`;
  // }
}
