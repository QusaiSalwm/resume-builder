import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateClassicComponent } from './template-classic.component';

describe('TemplateClassicComponent', () => {
  let component: TemplateClassicComponent;
  let fixture: ComponentFixture<TemplateClassicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateClassicComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateClassicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
