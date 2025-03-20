import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private downloadPdfSubject = new Subject<void>();

  // Observable to listen for the download event
  downloadPdf$ = this.downloadPdfSubject.asObservable();

  // Method to trigger the download
  triggerDownloadPdf() {
    this.downloadPdfSubject.next();
  }
}
