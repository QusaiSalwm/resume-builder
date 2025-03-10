import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ResumeService } from '../../resume.service';
import { TemplateClassicComponent } from '../d/template-classic/template-classic.component';
import { TemplateMinimalComponent } from '../d/template-minimal/template-minimal.component';
import { TemplateModernComponent } from '../d/template-modern/template-modern.component';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ColorSwitcherComponent } from '../color-switcher/color-switcher.component';
import { Template1Component } from "../d/template-1/template-1.component";
import { Template2Component } from "../d/template-2/template-2.component";
import { Template5Component } from "../d/template-5/template-5.component";
import { Template3Component } from "../d/template-3/template-3.component";
import { LanguageService } from '../../services/language.service';
import { Template4Component } from "../d/template-4/template-4.component";
@Component({
  selector: 'app-resume-preview',
  standalone: true,
  imports: [
    TemplateClassicComponent,
    TemplateMinimalComponent,
    TemplateModernComponent,
    CommonModule,
    ColorSwitcherComponent,
    ColorSwitcherComponent,
    Template1Component,
    Template2Component,
    Template5Component,
    Template3Component,
    Template4Component
],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.scss',
})
export class ResumePreviewComponent {
  resumeData: any = {};
  currentLang: any;

  @ViewChild('resumeContent', { static: false }) resumeContent!: ElementRef;

  constructor(
    private resumeService: ResumeService,
    private languageService: LanguageService
  ) {
    this.resumeService.getResumeData().subscribe((data) => {
      this.resumeData = data;
    });
  }

  // downloadPDF() {
  //   const element: any = document.getElementById('resumeContent');

  //   html2canvas(element, { scale: 5 }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF();

  //     const imgWidth = 210; // A4 width in mm
  //     const pageHeight = 397; // A4 height in mm
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio

  //     let position = 0;

  //     // If content is taller than A4, split into multiple pages
  //     while (position < imgHeight) {
  //       pdf.addImage(imgData, 'PNG', 0, position * -1, imgWidth, imgHeight);
  //       position += pageHeight;

  //       if (position < imgHeight) {
  //         pdf.addPage();
  //       }
  //     }

  //     pdf.save('resume.pdf');
  //   });
  // }

  downloadPDF() {
    const resumeElement = document.getElementById('resumeContent'); // Get the preview section
    if (resumeElement) {
      html2canvas(resumeElement, { scale: 5 }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.setFontSize(2);

        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        pdf.save('resume.pdf');
      });
    }
  }



  ngOnInit(): void {
    if (typeof window !== 'undefined') {
       this.languageService.currentLang$.subscribe((lang) => {
         this.currentLang = lang;
       });
    }
  }
}
