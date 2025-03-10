import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private themeSubject = new BehaviorSubject<string>(this.getStoredTheme());
  private customColorSubject = new BehaviorSubject<string>(
    this.getStoredCustomColor()
  );

  theme$ = this.themeSubject.asObservable();
  customColor$ = this.customColorSubject.asObservable();

  private getStoredTheme(): any {
    if (typeof window !== 'undefined' && localStorage.getItem('resumeTheme')) {
      return localStorage.getItem('resumeTheme')!;
    }
    return {
      head: '#76283D',
      back: '#FFE4EB',
    };
  }

  private getStoredCustomColor(): string {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('customResumeColor')
    ) {
      return localStorage.getItem('customResumeColor')!;
    }
    return '';
  }

  setTheme(color: string) {
    this.themeSubject.next(color);
    if (typeof window !== 'undefined') {
      localStorage.setItem('resumeTheme', color);
    }
  }

  setCustomColor(color: string) {
    this.customColorSubject.next(color);
    if (typeof window !== 'undefined') {
      localStorage.setItem('customResumeColor', color);
    }
  }

  // for all website
  private isBrowser: boolean = false;
  private themeSubjectForAllApp = new BehaviorSubject<string>(
    this.getStoredThemeForAllApp()
  );
  themeForAllApp$ = this.themeSubjectForAllApp.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.applyTheme(this.getStoredTheme()); // Apply theme on load

     if (this.isBrowser) {
       const storedTheme = this.getStoredThemeForAllApp();
       this.applyTheme(storedTheme); // Apply the stored theme
       this.themeSubjectForAllApp.next(storedTheme); // Emit the stored theme
     }
  }

  private getStoredThemeForAllApp(): string {
    if (this.isBrowser && localStorage.getItem('theme')) {
      return localStorage.getItem('theme')!;
    }
    return 'light';
  }

  setThemeForAllApp(theme: string) {
    if (this.isBrowser) {
      localStorage.setItem('theme', theme);

    }

    this.applyTheme(theme); // Apply theme first
    this.themeSubjectForAllApp.next(theme); // Then emit new value
  }

  private applyTheme(theme: string) {
    if (this.isBrowser) {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
}
