import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PhotoListComponent } from "./photo-list.component";
import { PhotoListModule } from './photo-list.module';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';
import { of } from 'rxjs';

describe(PhotoListComponent.name, () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;
  let service: PhotoBoardService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClientModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(PhotoBoardService); // Instancia ou injeta o serviço no componente que estamos usando.
  });

  it("Should create component", () => {
    expect(component).toBeTruthy();
  });

  it("(DOM) Should display board when data arrives", () => {
    const photos = buildPhotoList(); // método teste que cria uma lista de 8 photos teste.
    // spyOn() - forçar um retorno programado em qualquer método de um objeto através de um spy, recebe como primeiro parâmetro um objeto e como segundo uma string que contém exatamente o nome do método que queremos espionar.
    spyOn(service, 'getPhotos') // spyOn() - intercepta a chamada do método getPhotos() e retorna a lista de photos teste em vez de ir no backend trazer as photos.
      .and // encadeia uma chamada.
      .returnValue(of(photos)); // retorna a lista de photos teste no lugar do método getPhotos(). of() - torna photos um observable por causa do retorno.

    fixture.detectChanges(); // chamamos aqui a mudança após modificar algo com spyOn(), se chamasse antes, ngOnInit() seria chamado sem o serviço modificado com o spyOn().

    const board = fixture.nativeElement.querySelector('app-photo-board'); // verifica se esse elemento está exibindo no navegador.
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(board).withContext('Should display board').not.toBeNull();
    expect(loader).withContext('Should not display loader').toBeNull(); // se tiver o board, o loader não pode aparecer
  });

  it("(DOM) Should display loader while waiting for data", () => {
    spyOn(service, 'getPhotos')
      .and
      .returnValue(null); // força o retorno null, para não termos nenhuma lista de photos teste ao chamar o método.

    fixture.detectChanges();

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');
    expect(board).withContext('Should not display board').toBeNull();
    expect(loader).withContext('Should display loader').not.toBeNull(); // se não tiver o board, o loader aparece.
  });
})
