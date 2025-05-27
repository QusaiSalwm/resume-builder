import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { ResumeService } from '../../resume.service';
import { TemplateClassicComponent } from '../d/template-classic/template-classic.component';
import { TemplateMinimalComponent } from '../d/template-minimal/template-minimal.component';
import { TemplateModernComponent } from '../d/template-modern/template-modern.component';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { ColorSwitcherComponent } from '../color-switcher/color-switcher.component';
import { Template1Component } from '../d/template-1/template-1.component';
import { Template2Component } from '../d/template-2/template-2.component';
import { Template5Component } from '../d/template-5/template-5.component';
import { Template3Component } from '../d/template-3/template-3.component';
import { LanguageService } from '../../services/language.service';
import { Template4Component } from '../d/template-4/template-4.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ResumeDialogComponent } from '../resume-dialog/resume-dialog.component';
import { PdfService } from '../../services/pdf.service';
import { font } from '../../constants/fonts';
import { ThemeService } from '../../services/theme.service';
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
    Template4Component,
    TranslateModule,
    MatButtonModule,
  ],
  templateUrl: './resume-preview.component.html',
  styleUrl: './resume-preview.component.scss',
})
export class ResumePreviewComponent {
  resumeData: any = {};
  resumeTemplate: any;
  // currentLang: any;
  isMobile: boolean = false;
  delayedLang: string = 'en'; // Used for delayed application
  isTransitioning: boolean = false;
  @Input() currentLang: string = 'en'; // Default language
  @Input() overrideTransformOrigin: boolean = false;

  @ViewChild('resumeContent', { static: false }) resumeContent!: ElementRef;
  selectedTheme: any;
  customColor: string = '';
  constructor(
    private resumeService: ResumeService,
    private languageService: LanguageService,

    private dialog: MatDialog,
    private pdfService: PdfService,
    private themeService: ThemeService
  ) {
    this.resumeService.getResumeData().subscribe((data) => {
      this.resumeData = data;
    });

    this.themeService.theme$.subscribe((color) => (this.selectedTheme = color));
    this.themeService.customColor$.subscribe(
      (color) => (this.customColor = color)
    );
  }

  saveResumeTemplate() {
    if (window != undefined) {
      localStorage.setItem('template', this.resumeData.value.template);
    }
  }

  // openPreviewDialog() {
  //   this.dialog.open(ResumeDialogComponent, {
  //     width: '90vw',
  //     height: '90vh',
  //     standalone: true, // ✅ Required for standalone components
  //   });
  // }

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
    // const resumeElement = document.getElementById('scale1'); // Get the preview section
    // if (resumeElement) {
    //   html2canvas(resumeElement, { scale: 5 }).then((canvas) => {
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF('p', 'mm', 'a4');
    //     pdf.setFontSize(2);

    //     pdf.addFileToVFS('Amiri-Regular.ttf', font);
    //     pdf.addFont('Amiri-Regular.ttf', 'Amiri', 'normal');
    //     pdf.setFont('Amiri');

    //     const imgWidth = 210; // A4 width in mm
    //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

    //     pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    //     pdf.save(
    //       `${this.resumeData.firstName}_${this.resumeData.lastName}_resume.pdf`
    //     );
    //   });
    // }
    const printContent = document.getElementById('printableContent');
    const originalContent = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent.innerHTML; // Replace body with template content
      document.title = this.resumeData.firstName;
      window.print(); // Trigger print
      document.body.innerHTML = originalContent; // Restore original content
      location.reload(); // Reload to prevent issues
    }
  }

  downloadPDF1() {
    const resumeElement = document.getElementById('scale1');

    if (resumeElement) {
      html2canvas(resumeElement, { scale: 5 })
        .then((canvas) => {
          const imgData = canvas.toDataURL('image/png');

          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210; // A4 width in mm
          const pageHeight = 297; // A4 height in mm
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let heightLeft = imgHeight;
          let position = 0;

          // First page
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          // More pages
          while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          const fileName = `${this.resumeData.firstName}_${this.resumeData.lastName}_resume.pdf`;
          pdf.save(fileName);
        })
        .catch((error) => {
          console.error('Error generating PDF:', error);
        });
    } else {
      console.error('Resume content element not found');
    }
  }

  getTransformOrigin(): string {
    if (this.overrideTransformOrigin && this.currentLang === 'ar') {
      return 'top right';
    }
    return this.currentLang === 'ar' ? 'top right' : 'top left';
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.languageService.currentLang$.subscribe((lang) => {
        this.currentLang = lang;
        // this.changeDetectorRef.detectChanges();

        this.isMobile = window.innerWidth <= 767; // Adjust breakpoint as needed
        window.addEventListener('resize', () => {
          this.isMobile = window.innerWidth <= 767;
        });
      });
    }
    // Subscribe to the download event
    this.pdfService.downloadPdf$.subscribe(() => {
      this.downloadPDF();
    });
  }
}
