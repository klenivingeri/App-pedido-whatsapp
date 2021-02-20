import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddprodutosComponent } from './addprodutos.component';

describe('AddprodutosComponent', () => {
  let component: AddprodutosComponent;
  let fixture: ComponentFixture<AddprodutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddprodutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddprodutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
