import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ResumeService } from '../../resume.service';
import {MatButtonModule} from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template-selector',
  standalone: true,
  imports: [MatButtonModule, MatIconModule,CommonModule],
  templateUrl: './template-selector.component.html',
  styleUrl: './template-selector.component.scss',
})
export class TemplateSelectorComponent implements AfterViewInit {
  constructor(private resumeService: ResumeService) {}

  selectTemplate(template: string) {
    this.resumeService.updateResumeData({ template });
  }
  canScrollLeft: boolean = false;
  canScrollRight: boolean = false;
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -150,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 150,
      behavior: 'smooth',
    });
  }

  ngAfterViewInit() {
    this.updateScrollIndicators();
  }

  updateScrollIndicators() {
    const scrollContainer = this.scrollContainer.nativeElement;
    const isAtStart = scrollContainer.scrollLeft === 0;
    console.log(scrollContainer.scrollLeft === 0)
    const isAtEnd =
      scrollContainer.scrollLeft + scrollContainer.clientWidth >=
      scrollContainer.scrollWidth;

    this.canScrollLeft = !isAtStart;
    this.canScrollRight = !isAtEnd;
  }
}
