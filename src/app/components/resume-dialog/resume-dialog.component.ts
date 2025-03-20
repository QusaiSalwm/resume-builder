import { Component, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { ResumeService } from '../../resume.service';
import { ResumePreviewComponent } from "../resume-preview/resume-preview.component";
import { TemplateSelectorComponent } from "../template-selector/template-selector.component";
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-resume-dialog',
  standalone: true,
  imports: [ResumePreviewComponent, TemplateSelectorComponent, CommonModule,MatButtonModule],
  templateUrl: './resume-dialog.component.html',
  styleUrl: './resume-dialog.component.scss',
})
export class ResumeDialogComponent implements OnInit {
  isInDialog = false;
  // currentLang: any;
  @Input() currentLang: string = 'en'; // Default language
  @Input() overrideTransformOrigin: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<ResumeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private resumeService: ResumeService,
    private renderer: Renderer2,
    private languageService: LanguageService
  ) {}

  selectTemplate(template: string) {
    this.resumeService.updateResumeData({ template });
    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close()
  }

  ngOnInit(): void {
    this.isInDialog = true;
    // this.applyTransformOrigin();

    if (typeof window !== 'undefined') {
      this.languageService.currentLang$.subscribe((lang) => {
        this.currentLang = lang;
        // this.changeDetectorRef.detectChanges();
        document.documentElement.dir = this.currentLang === 'ar' ? 'rtl' : 'ltr';
      });
    }
  }

  // applyTransformOrigin() {
  //   const element = document.getElementById('scale1');
  //   if (this.currentLang === 'ar') {
  //     this.renderer.setStyle(element, 'transform-origin', 'top left');
  //   } else {
  //     this.renderer.setStyle(element, 'transform-origin', 'top left');
  //   }
  // }
}
