export class ChatbotResponse { 
  constructor(
    public question: string,
    public type: number ,
    public options?: ChatbotOption[]
  ) {}
}

export class ChatbotOption {
  text: string;
  isChecked: boolean;
}

export class ChatbotResponseRaw {
  text: string; 
  options?: string[]; 
  type: number 
}