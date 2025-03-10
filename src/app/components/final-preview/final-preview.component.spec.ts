import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalPreviewComponent } from './final-preview.component';

describe('FinalPreviewComponent', () => {
  let component: FinalPreviewComponent;
  let fixture: ComponentFixture<FinalPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FinalPreviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinalPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
