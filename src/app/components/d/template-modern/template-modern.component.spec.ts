import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateModernComponent } from './template-modern.component';

describe('TemplateModernComponent', () => {
  let component: TemplateModernComponent;
  let fixture: ComponentFixture<TemplateModernComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateModernComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateModernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
