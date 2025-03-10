import { Component } from '@angular/core';
import { Template1Component } from "../d/template-1/template-1.component";

@Component({
  selector: 'app-final-preview',
  standalone: true,
  imports: [Template1Component],
  templateUrl: './final-preview.component.html',
  styleUrl: './final-preview.component.scss'
})
export class FinalPreviewComponent {

}
