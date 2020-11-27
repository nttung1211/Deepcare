import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { FormModalService } from '../services/form-modal.service';
import { AppState } from '../store/app.reducers';
import { ChatbotService } from './chatbot.service';
import { ChatbotOption, ChatbotResponse, Disease } from './ChatbotResponse.model';
import { ChatMessage } from './ChatMessage.model';
import * as chatbotActions from './store/chatbot.actions';
import * as chatbotSelectors from './store/chatbot.selectors';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit, AfterViewChecked {
  isOpen = false;
  multipleChoiceInput: string[] = [];
  
  type = 1;
  options: ChatbotOption[] = [];
  diseases: Disease[] = [];
  messages: ChatMessage[];
  conversation: Observable<ChatMessage[]>;

  isTyping = false;
  @ViewChild('dialogBox') dialogBox: ElementRef;

  constructor(
    private chatbotService: ChatbotService,
    private formModalService: FormModalService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.onAnswer();
    this.conversation = this.store.pipe(
      select(chatbotSelectors.conversationSelector),
      tap(
        () => {
          setTimeout(() => {
            this.scrollDown();
          });
        }
      )
    );
  }

  onAnswer(skip: boolean = false) {
    if (skip) this.multipleChoiceInput = [];
    this.sendMessage(this.multipleChoiceInput);
    this.multipleChoiceInput = [];
  }


  sendMessage(answer: string[]) {
    setTimeout(() => {
      this.scrollDown();
    });

    this.options = [];
    this.isTyping = true;
    this.chatbotService.converse(answer).subscribe(
      (res: ChatbotResponse) => {
        for (const message of res.messages) {
          this.store.dispatch(chatbotActions.pushMessage({
            message: new ChatMessage(message, 'bot')
          }));
        }

        this.type = res.type;
        this.options = res.options;
        this.diseases = res.diseases;
        this.isTyping = false;
      }
    );
  }

  changeSelection() {
    this.multipleChoiceInput = this.options.reduce((multipleChoiceInput, option) => {
      if (option.isChecked) {
        multipleChoiceInput.push(option.text);
      }
      return multipleChoiceInput;
    }, []);
  }

  scrollDown() {
    this.dialogBox.nativeElement.scrollBy({
      top: this.dialogBox.nativeElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  refresh() {
    this.diseases = [];
    this.options = [];
    this.chatbotService.refreshSender_id();
    this.onAnswer();
    this.store.dispatch(chatbotActions.clearConversation());
  }

  toggleFormModal() {
    this.formModalService.formModalToggled.next(null);
    this.isOpen = false;
  }

  ngAfterViewChecked() {
    const textInputElement = document.querySelector('#textInputELement') as HTMLInputElement;
    if (textInputElement) {
      textInputElement.focus();
    }
  }
}

