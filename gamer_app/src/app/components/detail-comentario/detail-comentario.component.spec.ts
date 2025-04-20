import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailComentarioComponent } from './detail-comentario.component';

describe('DetailComentarioComponent', () => {
  let component: DetailComentarioComponent;
  let fixture: ComponentFixture<DetailComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailComentarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
