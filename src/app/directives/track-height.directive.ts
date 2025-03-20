import { Directive, ElementRef, AfterViewInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTrackHeight]',
})
export class TrackHeightDirective implements AfterViewInit {
  maxHeight = 800; // Set the max height for a single page

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.el.nativeElement.scrollHeight > this.maxHeight) {
        this.el.nativeElement.classList.add('overflowing');
      }
    });
  }
}
