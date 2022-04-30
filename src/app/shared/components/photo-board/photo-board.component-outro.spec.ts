import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Photo } from './interfaces/photo';
import { PhotoBoardComponent } from "./photo-board.component";
import { PhotoBoardModule } from './photo-board.module';

function buildPhotoList(): Photo[] {
  const photos: Photo[] = [];
  for (let i = 0; i < 8; i++) {
    photos.push({
      id: i + 1,
      url: "",
      description: ""
    });
  }
  return photos;
}

// Teste alternativo, não é um jeito muito bom, mas a primeira forma você sabe o que está acontencendo por debaixo dos panos.
describe(PhotoBoardComponent.name + ' ngOnChange() alternativo', () => {
  let fixture: ComponentFixture<PhotoBoardTestComponent>;
  let component: PhotoBoardTestComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PhotoBoardTestComponent],
      imports: [PhotoBoardModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoardTestComponent);
    component = fixture.componentInstance;
  });

  it('Should display rows and columns when (@Input photos) has value', () => {
    component.photos = buildPhotoList(); // renderiza uma lista de 8 photos teste.
    fixture.detectChanges(); // dispara o ngOnInit()

    expect(component.board.rows.length).withContext('Number of rows').toBe(2); // se são o photos e 4 por linha, então tem que ter 2 linhas.
    expect(component.board.rows[0].length).withContext('Number of columns from the first row').toBe(4); // withContext() compensa o uso de vários it().
    expect(component.board.rows[0].length).withContext('Number of columns from the second row').toBe(4);
  })
})


@Component({
  template: `
    <app-photo-board [photos]="photos"></app-photo-board>
  `
})
class PhotoBoardTestComponent {
  @ViewChild(PhotoBoardComponent) public board: PhotoBoardComponent // terá como parte de um template acima
  public photos: Photo[] = []; // toda vez que mudar aqui o valor de photos do componente aqui, o ngOnChange() será disparado, ele faz parte de um template de outro componente.
}
