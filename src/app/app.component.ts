import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  password = '';

  letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  numbers = '0123456789';
  symbols = '!@#$%^&*()_+';

  includeNumbers = false;
  includeSymbols = false;

  passwordLength = 0;

  constructor() {
    this.password = '';
    this.letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.numbers = '0123456789';
    this.symbols = '!@#$%^&*()_+';
    this.includeNumbers = false;
    this.includeSymbols = false;
    this.passwordLength = 0;
  }

  calculatePassword(characters: string) {
    for (let i = 0; i < this.passwordLength; i++) {
      this.password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
  }

  submit() {
    this.password = '';
    if (this.passwordLength < 6) {
      alert("Password length must be at least 6 characters long, otherwise it's not secure!");
      return;
    } else if (this.includeNumbers && this.includeSymbols) {
      const characters = this.letters + this.numbers + this.symbols;
      this.calculatePassword(characters);
      return;
    } else if (this.includeNumbers) {
      const characters = this.letters + this.numbers;
      this.calculatePassword(characters);
      return;
    } else if (this.includeSymbols) {
      const characters = this.letters + this.symbols;
      this.calculatePassword(characters);
      return;
    } else if (!this.includeNumbers && !this.includeSymbols) {
      const characters = this.letters;
      this.calculatePassword(characters);
      return;
    } else {
      alert("Something went wrong, please try again!");
    }
    }

  changePasswordProperties(symbolsCheck?: any, numbersCheck?: any, length?: any) {
    if (symbolsCheck !== undefined) {
      this.includeSymbols = symbolsCheck.target.checked;
      console.log("Symbols: " + this.includeSymbols);
    }
    if (numbersCheck !== undefined) {
      this.includeNumbers = numbersCheck.target.checked;
      console.log("Numbers: " + this.includeNumbers);
    } if (length !== undefined) {
      this.passwordLength = length.target.value;
      console.log("Length: " + this.passwordLength);
    }
  }
  getPassword() {
    return this.password;
  }
}
