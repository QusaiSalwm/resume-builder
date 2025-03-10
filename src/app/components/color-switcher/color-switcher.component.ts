import { Component } from '@angular/core';
import { COLOR_THEMES, COLOR_THEMES_NEW } from '../../constants/color-themes';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-color-switcher',
  standalone: true,
  imports: [CommonModule, MatInputModule],
  templateUrl: './color-switcher.component.html',
  styleUrl: './color-switcher.component.scss',
})
export class ColorSwitcherComponent {
  colorThemes = COLOR_THEMES_NEW;
  selectedTheme: any = '';
  customColor: string = '';
  currentLang :any

  constructor(private themeService: ThemeService) {
    this.themeService.theme$.subscribe((color) => (this.selectedTheme = color));
    this.themeService.customColor$.subscribe(
      (color) => (this.customColor = color)
    );
  }

  changeTheme(color: string) {
    this.themeService.setTheme(color);
    console.log(this.selectedTheme);
  }

  updateCustomColor(event: any) {
    const color = event.target.value;
    this.themeService.setCustomColor(color);
    this.themeService.setTheme('custom');
  }

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.currentLang = localStorage.getItem('lang');
    }
  }
}
