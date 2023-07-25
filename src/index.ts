const inquirer = require('inquirer');
const consola = require('consola');

enum Action {
  List = "list",
  Add = "add",
  Remove = "remove",
  Quit = "quit"
}

type InquirerAnswers = {
  action: Action
}

const startApp = () => {
  inquirer.prompt([{
    name: 'action',
    type: 'input',
    message: 'How can I help you?',
  }]).then(async (answers: { action: 'list' | 'add' | 'remove' | 'quit' }) => {
    console.log("Chosen action: " + answers.action);
    startApp();
    if (answers.action === "quit")
      return;
  });
}

startApp();

enum MessageVariant {
  Success = "success",
  Error = "error",
  Info = "info",
}

class Message { 
  constructor( private content: string) { }

  public show(): void {
    console.log(this.content)
  }

  public capitalize(): void {
    this.content = this.content.charAt(0).toUpperCase() + this.content.slice(1).toLowerCase();
  }

  public toUpperCase(): void {
    this.content = this.content.toUpperCase();
  }

  public toLowerCase(): void {
    this.content = this.content.toLowerCase();
  }

  static showColorized(variant: MessageVariant, text: string): void {
    switch(variant){
      case MessageVariant.Success:
        consola.success(text);
        break;
      case MessageVariant.Error:
        consola.error(text);
        break;
      case MessageVariant.Info:
        consola.info(text);
        break;
      default:
        console.log(text);
    }
  }
}

const msg = new Message("heLlo world!");
msg.show(); // "heLlo world!"
msg.capitalize();
msg.show(); // "Hello world!"
msg.toLowerCase();
msg.show(); // "hello world!"
msg.toUpperCase();
msg.show(); // "HELLO WORLD!"
Message.showColorized(MessageVariant.Success, "Test"); // √ "Test"
Message.showColorized(MessageVariant.Error, "Test 2"); // "x Test 2"
Message.showColorized(MessageVariant.Info, "Test 3"); // ℹ "Test 3"




