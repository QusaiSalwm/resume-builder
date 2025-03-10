import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ResumeService } from '../../../resume.service';
import { ThemeService } from '../../../services/theme.service';
import { COLOR_THEMES_NEW } from '../../../constants/color-themes';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-template-4',
  standalone: true,
  imports: [CommonModule,MatIconModule,TranslateModule],
  templateUrl: './template-4.component.html',
  styleUrl: './template-4.component.scss',
})
export class Template4Component {
   selectedTheme: any;
    customColor: string = '';
    colorThemesNew: any = COLOR_THEMES_NEW;
    currentLang: any;
  profileData = {
    name: 'Max Mustermann',
    image: 'https://placehold.co/120x120',
    contact: {
      address: 'Musterstraße 1, 12345 Musterstadt',
      email: 'email@domain.com',
      country: 'Germany',
      phone: '01234 67890',
      birthdate: '20.04.1987 in Musterstadt',
    },
    about:
      'Bei meinem letzten Arbeitgeber konnte ich meine ersten Erfahrungen in verschiedenen Marketing-Disziplinen wie Marktforschung, Produktmanagement, Branding und digitalem Marketing erfolgreich einsetzen. Zu meinen Kernaufgaben gehörte das Entwickeln strategischer Marketingpläne, um sie dann gewinnbringend fürs Unternehmen umzusetzen.',
    experience: [
      {
        date: '03/2022 - heute',
        title: 'Sr. Product Manager',
        company: 'Ember Static Studio Hamburg',
        tasks: [
          'Marketing-Konzeption',
          'Preisgestaltung',
          'Koordination von Social Media Kampagnen',
          'Zielgruppenanalysen',
        ],
      },
      {
        date: '03/2018 - 02/2022',
        title: 'Junior Product Manager',
        company: 'WunderCloud KG Hamburg',
        tasks: [
          'SEO',
          'E-Mail-Marketing und Newsletter-Marketing',
          'Content-Marketing',
          'Marktforschung, insbesondere online-Kundenbefragungen',
        ],
      },
      {
        date: '03/2016 - 02/2018',
        title: 'Praktikum im Bereich Marketing und e-Commerce',
        company: 'WunderCloud KG Hamburg',
        tasks: [
          'E-Mail-Marketing',
          'Recherche, Planung und Erstellung von Website-Inhalten',
          'Anzeigenschaltung für Instagram',
        ],
      },
    ],
    education: [
      {
        date: '01/2015 - 03/2016',
        title: 'M.B.A Medienwissenschaft, 1,8',
        university: 'Universität Hamburg',
      },
      {
        date: '01/2012 - 03/2015',
        title: 'M.A. Medienwissenschaft, 1,8',
        university: 'Universität Hamburg',
      },
      {
        date: '01/2009 - 03/2012',
        title: 'B.A. Medienwissenschaft, 2,3',
        university: 'Universität Hamburg',
      },
    ],
    skills: ['MS Office', 'Photoshop', 'Illustrator', 'HTML/CSS'],
  };

    resumeData: any = {};

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
}
