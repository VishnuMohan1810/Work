import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { formatCurrency, formatDate, formatNumber } from '@angular/common'; 
@Component({
  selector: 'app-root',
  template: `
  <p>{{ 'WELCOME' | translate }}</p>
  <p>{{ 'HELLO' | translate }}</p>
  <p>{{ 'GREETING' | translate }}</p>
  <p>Amount: {{ formattedAmount }}</p>
  <p>Currency: {{ formattedCurrency }}</p>
  <p>Date: {{ formattedDate }}</p>

  <button type="button" class="btn btn-primary m-2" (click)="changeLanguage('en')">English</button>
  <button type="button" class="btn btn-secondary m-2"  (click)="changeLanguage('fr')">French</button>
  <button type="button" class="btn btn-success m-2" (click)="changeLanguage('ml')">Malayalam</button>
  <button type="button" class="btn btn-success m-2" (click)="changeLanguage('hi')">Hindi</button>
`,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn = true;
  userData = { first_name: '', last_name: '' };
  title = 'work';
  constructor(private translate: TranslateService,private router: Router) {
    translate.setDefaultLang('en');  
  }

  ngOnInit() {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      this.isLoggedIn = true;
      this.userData = JSON.parse(storedUserData); // Parse and set user data
    }
    else {
      this.isLoggedIn = false;
      console.log('No user logged in');
    }
  }
  logout() {
    localStorage.removeItem('userData'); // Clear user data
    this.isLoggedIn = false; // Update login state
    this.router.navigate(['/log']); // Redirect to login page
  }
  login() {
    // Simulate a login success with user data
    const userData = { first_name: '', last_name: '' };
    localStorage.setItem('userData', JSON.stringify(userData));
    this.router.navigate(['/']); // Redirect to the home page
  }
  

  amount = 1234.56;
  currenyCode = 'USD';
  date = new Date();

  // formattedAmount: string;
  // formattedDate: string;
  // formattedCurrency: string;
  
  changeLanguage(language: string) {
    this.translate.use(language);
    const locale = language === 'en' ? 'en-IN' : language === 'fr' ? 'fr-SY' : language;
    // this.setFormats(locale);
  }

  formattedAmount = formatNumber(this.amount, 'fr-SY', '1.2-3');
  formattedDate = formatDate(this.date, 'fullDate', 'fr-SY');
  formattedCurrency = formatCurrency(this.amount,'fr-SY', 'EUR', 'symbol', '1.2-3');


}
