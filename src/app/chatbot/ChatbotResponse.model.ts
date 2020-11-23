export class ChatbotResponse { 
  constructor(
    public questions: string[],
    public type: number ,
    public options?: ChatbotOption[]
  ) {}
}

export class ChatbotOption {
  text: string;
  isChecked: boolean;
}

export class ChatbotResponseRaw {
  text: string[]; 
  options?: string[]; 
  type: number 
}