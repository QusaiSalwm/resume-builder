import { Component } from '@angular/core';
import { ResumeService } from '../../../resume.service';

@Component({
  selector: 'app-template-classic',
  standalone: true,
  imports: [],
  templateUrl: './template-classic.component.html',
  styleUrl: './template-classic.component.scss'
})
export class TemplateClassicComponent {
  resumeData: any = {};

  constructor(private resumeService: ResumeService) {
    this.resumeService.getResumeData().subscribe((data) => {
      this.resumeData = data;
    });
  }
}
