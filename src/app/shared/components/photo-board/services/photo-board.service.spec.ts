import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PhotoBoardService } from './photo-board.service';

const mockData = { // retorna um dado mockado, falso.
  api: 'http://localhost:3000/photos', // tem que ser a mesma api que está no PhotoBoardService.
  data: [
    {
      id: 1,
      description: 'Photo 1',
      url: ''
    },
    {
      id: 2,
      description: 'Photo 2',
      url: ''
    }
  ]
}

describe(PhotoBoardService.name, () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // vai sobrescrever o provider padrão do HttpClientModule para testes.
      providers: [PhotoBoardService] // Injeta o serviço para um provider.
    }).compileComponents();

    service = TestBed.inject(PhotoBoardService); // Instancia ou injeta o serviço no componente que estamos usando.
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify()); // verifica se há requisições que vc não deu resposta e ajuda a debugar o erro na do teste.

  it(`#${PhotoBoardService.prototype.getPhotos.name}
    should return photos with description in uppercase`, done => {
      service.getPhotos().subscribe(photos => { // getPhotos() aqui vai fazer o subscribe() com os dados mockados e não do backend. getPhotos() lá fez um map() com os dados do array.
        expect(photos[0].description).toBe('PHOTO 1');
        expect(photos[1].description).toBe('PHOTO 2');
        done(); // finaliza o teste que é async.
      });
      // se não tiver httpController o teste vai falhar, pois o subscribe() acima vai ficar esperando os dados mockados.
      httpController // usado para fazer o controle das requisições com dados mockados, de teste. Ele foi chamado depois, pois precisa saber se tem alguém fazendo requisição para ser realizado.
        .expectOne(mockData.api) // expectOne() - espera uma requisição para a api.
        .flush(mockData.data); // resolve uma requisição dos dados, um dado falso que criamos (mockData), não do backend e retorna o mockData.data
  });


})
