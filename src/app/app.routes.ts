import { Routes } from '@angular/router';
import { FinalPreviewComponent } from './components/final-preview/final-preview.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
  {path:'' , component :AppComponent},

  {path:'preview' , component :FinalPreviewComponent}
];
