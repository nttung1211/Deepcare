import { createAction, props } from '@ngrx/store';
import { ChatMessage } from '../ChatMessage.model';

export const pushMessage = createAction(
  '[chatbot] push message',
  props<{
    message: ChatMessage
  }>()
);

export const clearConversation = createAction(
  '[chatbot] clear conversation'
);