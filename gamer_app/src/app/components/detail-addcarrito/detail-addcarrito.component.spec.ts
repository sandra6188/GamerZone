import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailAddcarritoComponent } from './detail-addcarrito.component';

describe('DetailAddcarritoComponent', () => {
  let component: DetailAddcarritoComponent;
  let fixture: ComponentFixture<DetailAddcarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailAddcarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailAddcarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
