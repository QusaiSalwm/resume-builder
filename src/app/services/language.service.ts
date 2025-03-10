import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private currentLangSubject = new BehaviorSubject<string>('en');
  currentLang$ = this.currentLangSubject.asObservable();
  lang :any

  constructor() {
    // Initialize with the language from localStorage
    if (typeof window !== 'undefined') {
          this.lang=localStorage.getItem('lang') || 'en';
     }

    this.currentLangSubject.next(this.lang);
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.currentLangSubject.next(lang);
  }
}
