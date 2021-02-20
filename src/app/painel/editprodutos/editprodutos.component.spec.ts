import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprodutosComponent } from './editprodutos.component';

describe('EditprodutosComponent', () => {
  let component: EditprodutosComponent;
  let fixture: ComponentFixture<EditprodutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditprodutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditprodutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
