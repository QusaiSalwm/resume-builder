import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { ResumeService } from '../../../resume.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material/icon';
import { COLOR_THEMES_NEW } from '../../../constants/color-themes';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-template-1',
  standalone: true,
  imports: [CommonModule, TranslateModule, MatIconModule],
  templateUrl: './template-1.component.html',
  styleUrl: './template-1.component.scss',
})
export class Template1Component implements OnInit {
 @Input() selectedTheme: any;
 @Input() customColor: string = '';
  colorThemesNew: any = COLOR_THEMES_NEW;
  currentLang: any;
  arabicStyles = {
    'text-align': 'right',
    direction: 'rtl',
    'border-left': '2px solid black', // Example of a border for Arabic
    'border-right': 'none',
  };

  defaultStyles = {
    'text-align': 'left',
    direction: 'ltr',
    'border-left': 'none',
    'border-right': '2px solid black', // Example of a border for other languages
  };

  resumeData: any = {};
  pages: any[] = [];
  maxPageHeight = 297;

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

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.currentLang = localStorage.getItem('lang');
    }
  }


}
