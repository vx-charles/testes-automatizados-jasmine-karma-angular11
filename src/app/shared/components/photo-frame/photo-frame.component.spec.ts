import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PhotoFrameComponent } from './photo-frame.component';
import { PhotoFrameModule } from './photo-frame.module';

describe(PhotoFrameComponent.name, () => {
  // ComponentFixture - embrulha, que dentro dele vai ter a instância do meu componente, que eu posso chamar métodos, posso acessar propriedade do componente e métodos utilitários que vai me ajudar durante o teste.
  let fixture: ComponentFixture<PhotoFrameComponent> = null;
  let component: PhotoFrameComponent = null;

  beforeEach(async () => {
    // Para componentes legados, ou seja, que foram criados por desenvolvedores antes ou quando o componente já existe,
    await TestBed.configureTestingModule({
      imports: [PhotoFrameModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoFrameComponent); // retorna uma instância de "ComponentFixture" e "TestBed.createComponent" recebe como parâmetro a classe do componente que desejamos instanciar.
    component = fixture.componentInstance; // instância da class LikeWidgetComponent que os métodos e as propriedades.
  });

  it('Should create component', () => {
    expect(component).toBeTruthy(); // toBeTruthy() - verifica se a instância é true, null, undefined, '' ou 0, ou seja, se o componente foi criado.
  });

  it(`#{PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) once when called multiple times within debounce time`, fakeAsync(() => { // fakeAsync - simula o tempo de execução do código.
      fixture.detectChanges(); // detectChanges() - detecta as mudanças no componente, ou seja, ele vai detectar as mudanças e passa pelo ngOnInit() e vai iniciar o Observable debounceSubject.
      let times = 0;
      component.liked.subscribe(() => times++);
      component.like();
      component.like();
      tick(500); // tick(500) - simula o tempo de execução do código, aqui ele vai parar a execução por 500ms, dá o tempo de processar o like(), que tem o debounceTime de 500ms.
      expect(times).toBe(1);
  }));

  it(`#{PhotoFrameComponent.prototype.like.name}
    should trigger (@Output liked) two times when called outside debounce time`, fakeAsync(() => {
      fixture.detectChanges();
      let times = 0;
      component.liked.subscribe(() => times++);
      component.like(); // executa o click do like()
      tick(500); // espera 500ms
      component.like(); // executa de novo o click do like()
      tick(500); // espera mais 500ms, se colocar menos, não vai dar tempo de processar o debounceTime, o segundo click.
      expect(times).toBe(2);
  }));

  // Tudo que começar com (DOM) é "teste de UI" ou "integração com DOM".
  // Esses testes não há nenhuma métrica que force o desenvolvedor a realizar esse tipo de teste, pois são testes opcionais.
  it("(DOM) should display number of likes when (@Input likes) is incremented", () => {
    fixture.detectChanges(); // dispara o ciclo de vida do componente.
    component.likes++; // add likes para 1
    fixture.detectChanges(); // redesenha no DOM o valor alterado.
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
    expect(element.textContent.trim()).toBe('1'); // textContent - retorna o texto do elemento span no HTML.
  });

  it("(DOM) should update aria-label when (@Input likes) is incremented", () => {
    fixture.detectChanges();
    component.likes++; // add likes para 1
    fixture.detectChanges(); // redesenha no DOM o valor alterado.
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('1: people liked'); // textContent - retorna o texto do elemento span no HTML.
  });

  it("(DOM) should have aria-label value 0 (@Input likes)", () => {
    fixture.detectChanges(); // inicia o ciclo de vida do componente para conseguir consultar a DOM.
    const element: HTMLElement = fixture.nativeElement.querySelector('span');
    expect(element.getAttribute('aria-label')).toBe('0: people liked'); // getAttribute() - retorna o valor do atributo da tag do HTML.
  });

  it("(DOM) should display image with src and description when bound to properties ", () => {
    const description = 'Some description';
    const src = 'http://somesite.com/img.jpg';
    component.src = src;
    component.description = description;

    fixture.detectChanges(); // inicia o ciclo de vida do componente para atualizar a DOM.
    const img: HTMLImageElement = fixture.nativeElement.querySelector('img');

    expect(img.getAttribute('src')).toBe(src);
    expect(img.getAttribute('alt')).toBe(description);
  });

  it("(DOM) should display number of likes when clicked", done => {
    fixture.detectChanges(); // inicia o ciclo de vida do componente para conseguir consultar a DOM.
    component.liked.subscribe(() => { // liked é um @Output property e quando for emitida, fazemos um subscribe() para incrementar os likes.
      component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEl.textContent.trim()).toBe('1');
      done(); // boa prática quando tem um subcribe() dentro do teste usar o done() depois que o expect() for realizado.
    });
    const likeWidgetContainerEl: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    likeWidgetContainerEl.click(); // vai executar o subscribe() acima fazendo o click, como um usuário faria para dar like.
  });

  it("(DOM) should display number of likes when ENTER key is pressed", done => {
    fixture.detectChanges();
    component.liked.subscribe(() => { // será executado no dispatchEvent()
      component.likes++;
      fixture.detectChanges();
      const counterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(counterEl.textContent.trim()).toBe('1'); // pega o valor dentro da tag HTML
      done();
    });
    const likeWidgetContainerEl: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    const event = new KeyboardEvent('keyup', { key: 'Enter'}); // cria um evento de teclado. Na acessibilidade, usamos o keyup para enter.
    likeWidgetContainerEl.dispatchEvent(event); // dispara o evento de ENTER.
  });
})
