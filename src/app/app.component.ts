import {Component} from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  passwordSecurityStatus = '';
  showLengthSecurityStatus = false;
  passwordSecurityStatusColor = '';


  constructor(private toastr: ToastrService) {
    this.password = '';
    this.letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    this.numbers = '0123456789';
    this.symbols = '!@#$%^&*()_+';
    this.includeNumbers = false;
    this.includeSymbols = false;
    this.passwordLength = 0;
    this.passwordSecurityStatus = '';
    this.showLengthSecurityStatus = false;
  }

  calculatePassword(characters: string) {
    const array = new Uint32Array(this.passwordLength);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < this.passwordLength; i++) {
      this.password += characters.charAt(array[i] % characters.length);
    }
  }

  submit(e:any) {
    e.preventDefault();
    this.password = '';
    if (this.passwordLength < 6) {
      this.toastr.error('Password length must be at least 6 characters long, otherwise it\'s not secure!', 'Error!');
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
      this.toastr.error('Something went wrong, please try again!', 'Error!');
    }
    }

  changePasswordProperties(symbolsCheck?: any, numbersCheck?: any, length?: any) {
    if (symbolsCheck !== undefined) {
      this.includeSymbols = symbolsCheck.target.checked;
    }
    if (numbersCheck !== undefined) {
      this.includeNumbers = numbersCheck.target.checked;
    }
    if (length !== undefined) {
      this.passwordLength = length.target.value;
      this.showLengthSecurityStatus = true;
    }
  }
  getPassword() {
    return this.password;
  }

  changePasswordSecurityStatus(length: any) {
    if (length.target.value < 6) {
      this.passwordSecurityStatus = 'Not Secure';
      this.passwordSecurityStatusColor = 'red';
    } else if (length.target.value >= 6 && length.target.value < 12) {
      this.passwordSecurityStatus = 'Secure';
      this.passwordSecurityStatusColor = 'blue';
    } else if (length.target.value >= 12) {
      this.passwordSecurityStatus = 'Very Secure';
      this.passwordSecurityStatusColor = 'green';
    }
  }

  async copyToClipboard() {
    try {
      await navigator.clipboard.writeText(this.password);
      this.toastr.success('Password copied to clipboard!', 'Success!');
    } catch (err) {
      console.error('Failed to copy text: ', err);
      this.toastr.error('Failed to copy password to clipboard', 'Error');
    }
  }
}
