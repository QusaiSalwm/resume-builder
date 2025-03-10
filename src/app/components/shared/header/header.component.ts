import { Component, HostListener } from '@angular/core';

import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { ThemeSwitcherComponent } from '../../theme-switcher/theme-switcher.component';
import { animate, style, transition, trigger } from '@angular/animations';



@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    ThemeSwitcherComponent,
  ],

  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  title = 'resume-builder';
  isSwitching = false;
  isMenuOpen = false; // Mobile menu state
  myLang: any;
  constructor(private translate: TranslateService) {
    if (typeof window !== 'undefined') {
      this.myLang = localStorage.getItem('lang') || 'en';
      document.documentElement.dir = this.myLang === 'ar' ? 'rtl' : 'ltr';
      this.translate.setDefaultLang(this.myLang);
      this.translate.use(this.myLang);
    }
  }

  switchLanguage(event: any) {
    this.isSwitching = true;

    setTimeout(() => {
      if (typeof window !== 'undefined') {
        localStorage.setItem('lang', event);
      }
      this.translate.use(event);
      document.documentElement.dir = event === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.style.fontFamily =
        event === 'ar' ? "'Tajawal', sans-serif" : "'Roboto', sans-serif";
      this.isSwitching = false;
    }, 400);
  }
}
