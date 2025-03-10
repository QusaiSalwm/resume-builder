import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateMinimalComponent } from './template-minimal.component';

describe('TemplateMinimalComponent', () => {
  let component: TemplateMinimalComponent;
  let fixture: ComponentFixture<TemplateMinimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateMinimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemplateMinimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
