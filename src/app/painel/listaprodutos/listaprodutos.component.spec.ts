import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaprodutosComponent } from './listaprodutos.component';

describe('ListaprodutosComponent', () => {
  let component: ListaprodutosComponent;
  let fixture: ComponentFixture<ListaprodutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaprodutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaprodutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
