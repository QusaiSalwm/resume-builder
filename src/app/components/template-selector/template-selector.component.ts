import { Component } from '@angular/core';
import { ResumeService } from '../../resume.service';
import {MatButtonModule} from '@angular/material/button'

@Component({
  selector: 'app-template-selector',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.scss',
})
export class TemplateSelectorComponent {
  constructor(private resumeService: ResumeService) {}

  selectTemplate(template: string) {
    this.resumeService.updateResumeData({ template });
  }
}
