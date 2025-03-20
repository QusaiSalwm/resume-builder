import { Component } from '@angular/core';
import { Template1Component } from "../d/template-1/template-1.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-final-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './final-preview.component.html',
  styleUrl: './final-preview.component.scss'
})
export class FinalPreviewComponent {
 paragraphs: string[] = Array.from({ length: 100 }, (_, i) =>` هذا هو الفقرة رقم ${i + 1}.`);
     pages: string[][] = [];
  currentPage: number = 0;


     ngOnInit() {
       this.splitContentIntoPages();

       

     }

     splitContentIntoPages() {
       const maxHeight = 1000; // ارتفاع الصفحة القصوى
       let currentPage: string[] = [];
       let currentHeight = 0;

       if (typeof window != undefined) {
         const container = document.createElement('div');
         document.body.appendChild(container); // استخدم عنصر مؤقت لحساب الارتفاع

         this.paragraphs.forEach((paragraph) => {
           const pElement = document.createElement('p');
           pElement.innerText = paragraph;
           container.appendChild(pElement);
           currentHeight += pElement.offsetHeight;

           if (currentHeight > maxHeight) {
             this.pages.push(currentPage);
             currentPage = [paragraph]; // ابدأ صفحة جديدة
             currentHeight = pElement.offsetHeight; // إعادة تعيين الارتفاع
           } else {
             currentPage.push(paragraph);
           }
         });

         if (currentPage.length > 0) {
           this.pages.push(currentPage); // إضافة الصفحة الأخيرة
         }

         document.body.removeChild(container); // إزالة العنصر المؤقت
       }


     }

     nextPage() {
       if (this.currentPage < this.pages.length - 1) {
         this.currentPage++;
       }
     }

     prevPage() {
       if (this.currentPage > 0) {
         this.currentPage--;
       }
     }

}
