import { Action, createReducer, on } from '@ngrx/store';
import { ChatMessage } from '../ChatMessage.model';
import * as chatbotActions from "./chatbot.actions";

export interface State {
  conversation: ChatMessage[]
}

const initialState = {
  conversation: []
}

const chatbotReducer = createReducer( //this'll return a switch function like the old fashion one
  initialState,
  on(
    chatbotActions.pushMessage,
    (state, {message}) => ({
      ...state,
      conversation: [...state.conversation, message]
    })
  ),
  on(
    chatbotActions.clearConversation,
    (state) => ({
      ...state,
      conversation: []
    })
  )
);

export function reducer(state: State | undefined, action: Action) {
  return chatbotReducer(state, action);
}

