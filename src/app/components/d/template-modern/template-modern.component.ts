import { Component } from '@angular/core';
import { ResumeService } from '../../../resume.service';
import { CommonModule } from '@angular/common';
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';
import { COLOR_THEMES, COLOR_THEMES_NEW } from '../../../constants/color-themes';
import { ThemeService } from '../../../services/theme.service';
@Component({
  selector: 'app-template-modern',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './template-modern.component.html',
  styleUrl: './template-modern.component.scss',
})
export class TemplateModernComponent {
  resumeData: any = {};
  selectedTheme: string = '';
  customColor: string = '';
  colorThemes: any = COLOR_THEMES;
  colorThemesNew: any = COLOR_THEMES_NEW;

  constructor(
    private resumeService: ResumeService,
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

  print() {
    window.print();
  }
}
