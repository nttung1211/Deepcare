import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { delay, scan } from 'rxjs/operators';
import { ChatbotService } from './chatbot.service';
import { ChatbotOption, ChatbotResponse } from './ChatbotResponse.model';
import { ChatMessage } from './ChatMessage.model';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  isOpen = false;
  type = 1;
  textInput = '';
  yesNoInput = '';
  options: ChatbotOption[] = [];
  choices: string[] = [];
  messages: ChatMessage[];
  isTyping = false;
  // TODO : generate token
  token: string;
  @ViewChild('dialogBox') dialogBox: ElementRef;

  constructor(
    private chatbotService: ChatbotService
  ) { }

  ngOnInit(): void {
    this.onAnswer(false, true);
    
    this.chatbotService.conversation.pipe(
      scan((messages, message) => [...messages, message], [])
    ).subscribe(
      messages => {
        this.messages = messages;
      }
    );
  }

  onAnswer(skip: boolean = false, initial: boolean = false) {
    switch (this.type) {
      case -1:
      case 1:
        if (this.textInput || initial) {
          this.sendMessage(`${this.textInput}`);
          this.textInput = '';
        }
        break;

      case 2:
        this.sendMessage(this.yesNoInput);
        this.yesNoInput = '';
        break;
      
      case 3:
        if (skip) this.choices = [];
        this.sendMessage(this.choices);
        this.choices = [];
        break;
    }
  }


  sendMessage(answer: string | string[]) {
    setTimeout(() => {
      this.scrollDown();
    });

    this.options = [];
    this.isTyping = true;
    this.chatbotService.converse(answer).pipe(delay(1000)).subscribe(
      (res: ChatbotResponse) => {
        this.chatbotService.update(new ChatMessage(res.question, 'bot'));
        this.type = res.type;

        switch (res.type) {
          case 3:
            this.options = res.options;
            break;
        }

        setTimeout(() => {
          this.scrollDown();
        });

        this.isTyping = false;
      }
    );
  }

  changeSelection() {
    this.choices = this.options.reduce((choices, option) => {
      if (option.isChecked) {
        choices.push(option.text);
      }
      return choices;
    }, []);
  }

  scrollDown() {
    this.dialogBox.nativeElement.scrollBy({
      top: this.dialogBox.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  ngAfterViewChecked() {
    const textInputElement = document.querySelector('#textInputELement') as HTMLInputElement;
    if (textInputElement) {
      textInputElement.focus();
    }
  }
}

