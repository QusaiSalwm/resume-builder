import { Component } from '@angular/core';
import { ResumeService } from '../../../resume.service';

@Component({
  selector: 'app-template-minimal',
  standalone: true,
  imports: [],
  templateUrl: './template-minimal.component.html',
  styleUrl: './template-minimal.component.scss'
})
export class TemplateMinimalComponent {
  resumeData: any = {};

  constructor(private resumeService: ResumeService) {
    this.resumeService.getResumeData().subscribe((data) => {
      this.resumeData = data;
    });
  }
}
