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
    for (let i = 0; i < this.passwordLength; i++) {
      this.password += characters.charAt(Math.floor(Math.random() * characters.length));
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
    console.log(length.target.value);
    if (length.target.value < 6) {
      this.passwordSecurityStatus = 'Not Secure';
    } else if (length.target.value >= 6 && length.target.value < 12) {
      this.passwordSecurityStatus = 'Secure';
    } else if (length.target.value >= 12) {
      this.passwordSecurityStatus = 'Very Secure';
    }
  }

  copyToClipboard() {
    const el = document.createElement('textarea');
    el.value = this.password;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    this.toastr.success('Password copied to clipboard!', 'Success!')
  }
}
