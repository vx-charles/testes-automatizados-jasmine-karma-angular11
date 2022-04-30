import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoBoardComponent } from "./photo-board.component";
import { PhotoBoardModule } from './photo-board.module';
import { buildPhotoList } from './test/build-photo-list';

describe(PhotoBoardComponent.name, () => {
  let fixture: ComponentFixture<PhotoBoardComponent>;
  let component: PhotoBoardComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PhotoBoardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
  });

  it('Should display rows and columns when (@Input photos) has value', () => {
    component.photos = buildPhotoList(); // renderiza uma lista de 8 photos teste.
    fixture.detectChanges(); // dispara o ngOnInit()

    const change: SimpleChanges = {
      photos: new SimpleChange([], component.photos, true) // SimpleChange no singular - pode ter um ou mais SimpleChanges. parâmetros do SimpleChange(valor anterior:any, valor atual:any, primeira mudança:boolean).
    }
    component.ngOnChanges(change); // isso é para detectar a mudança e chamar o método groupColunms(), pois nos teste não é possível chamar o ngOnChanges(), tem que fazer na mão.
    expect(component.rows.length).withContext('Number of rows').toBe(2); // se são o photos e 4 por linha, então tem que ter 2 linhas.
    expect(component.rows[0].length).withContext('Number of columns from the first row').toBe(4); // withContext() compensa o uso de vários it().
    expect(component.rows[0].length).withContext('Number of columns from the second row').toBe(4);
  })
})
