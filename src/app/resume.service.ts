import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private resumeData = new BehaviorSubject<any>({
    template: this.getStoredTemplate() || 'template-1',
  });

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedTemplate = this.getStoredTemplate();
      if (storedTemplate) {
        this.resumeData.next({ template: storedTemplate });
      }
    }
  }

  getResumeData() {
    return this.resumeData.asObservable();
  }

  updateResumeData(data: any) {
    const updatedData = { ...this.resumeData.value, ...data };
    this.resumeData.next(updatedData);

    if (isPlatformBrowser(this.platformId)) {
      if (data.template) {
        this.setStoredTemplate(data.template);
      }
    }
  }

  private getStoredTemplate(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('selectedTemplate');
    }
    return null;
  }

  private setStoredTemplate(template: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('selectedTemplate', template);
    }
  }
}
