import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private resumeData = new BehaviorSubject<any>({ template: 'template-4' });

  getResumeData() {
    return this.resumeData.asObservable();
  }

  updateResumeData(data: any) {
    this.resumeData.next({ ...this.resumeData.value, ...data });
  }
}
