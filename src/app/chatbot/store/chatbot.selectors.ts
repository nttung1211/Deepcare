import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';


export const conversationSelector = createSelector(
  (appState: AppState) => appState.chatbot,
  chatbotState => chatbotState.conversation
);