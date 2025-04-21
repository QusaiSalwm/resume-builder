import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [MatButtonModule,CommonModule],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  currentTheme: string = 'light';

  constructor(private themeService: ThemeService) {
    this.themeService.themeForAllApp$.subscribe((theme) => {
      this.currentTheme = theme;
    });
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.themeService.setThemeForAllApp(newTheme);
  }
}
