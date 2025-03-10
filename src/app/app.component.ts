import { Component, HostListener } from '@angular/core';
import { ResumeFormComponent } from './components/resume-form/resume-form.component';
import { ResumePreviewComponent } from './components/resume-preview/resume-preview.component';
import { TemplateSelectorComponent } from './components/template-selector/template-selector.component';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';


import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { animate, style, transition, trigger } from '@angular/animations';
import { ThemeService } from './services/theme.service';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { FinalPreviewComponent } from './components/final-preview/final-preview.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/shared/header/header.component';
import { FormsModule } from '@angular/forms';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ResumePreviewComponent,
    ResumeFormComponent,
    TemplateSelectorComponent,
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatIconModule,
    ThemeSwitcherComponent,
    ThemeSwitcherComponent,
    FormsModule,
    MatIconModule,
    MatSidenavModule,
    MatMenuModule
  ],
  providers: [ThemeService],

  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fadeSwitch', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.4s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.4s ease-in-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'resume-builder';
  isSwitching = false;
  isMenuOpen = false; // Mobile menu state
  myLang: any;

  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {
    if (typeof window !== 'undefined') {
      this.myLang = localStorage.getItem('lang') || 'en';

      document.documentElement.dir = this.myLang === 'ar' ? 'rtl' : 'ltr';
      this.translate.setDefaultLang(this.myLang);
      this.translate.use(this.myLang);
    }
  }

  switchLanguage(event: any) {
    this.isSwitching = true;
    this.languageService.setLanguage(event);

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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
