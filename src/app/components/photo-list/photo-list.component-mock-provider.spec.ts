import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PhotoListComponent } from "./photo-list.component";
import { PhotoListModule } from './photo-list.module';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { PhotoBoardMockService } from 'src/app/shared/components/photo-board/services/photo-board-mock.service';

describe(PhotoListComponent.name + ' Mock Provider', () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClientModule
      ],
      providers: [
        {
          provide: PhotoBoardService, // provide usado.
          useClass: PhotoBoardMockService // diferente do useValue, o useClass vc pode usar vários métodos e também substitui o Service por outro. Cria a instância desse serviço para usar no teste.
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it("Should create component", () => {
    expect(component).toBeTruthy();
  });

  it("(DOM) Should display board when data arrives", () => {
    fixture.detectChanges(); // chamamos aqui a mudança após modificar algo com spyOn(), se chamasse antes, ngOnInit() seria chamado sem o serviço modificado com o spyOn().

    const board = fixture.nativeElement.querySelector('app-photo-board'); // verifica se esse elemento está exibindo no navegador.
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(board).withContext('Should display board').not.toBeNull();
    expect(loader).withContext('Should not display loader').toBeNull(); // se tiver o board, o loader não pode aparecer
  });
})
