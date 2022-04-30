import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// import { UniqueIdService } from '../../services/unique-id.service';
import { LikeWidgetComponent } from "./like-widget.component";
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
  // ComponentFixture - embrulha, que dentro dele vai ter a instância do meu componente, que eu posso chamar métodos, posso acessar propriedade do componente e métodos utilitários que vai me ajudar durante o teste.
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    // Configuração do teste usando o Test First, é quando você cria o componente novo primeiro.
    // await TestBed.configureTestingModule({ // TestBed.configureTestingModule - funciona como se fosse o @NgModule({}), só que para testes.
    //   declarations: [LikeWidgetComponent],
    //   imports: [FontAwesomeModule],
    //   providers: [UniqueIdService],
    // }).compileComponents(); // compileComponents() - traz o template HTML e o componente TS de forma assíncrona, o mesmo acontece no Angular que procura o template do componente de forma assínscrona.

    // Para componentes legados, ou seja, que foram criados por desenvolvedores antes ou quando o componente já existe,
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent); // retorna uma instância de "ComponentFixture" e "TestBed.createComponent" recebe como parâmetro a classe do componente que desejamos instanciar.
    component = fixture.componentInstance; // instância da class LikeWidgetComponent que os métodos e as propriedades.
  });

  it('Should create component', () => {
    expect(component).toBeTruthy(); // toBeTruthy() - verifica se a instância é true, null, undefined, '' ou 0, ou seja, se o componente foi criado.
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => { // (@Input id) - colocado em parênteses é para indicar que uma @Input properties recebe um valor.
    fixture.detectChanges(); // detectChanges() - detecta as mudanças no componente, ou seja, ele vai detectar as mudanças e passa pelo ngOnInit() e vai atribuir o ID.
    expect(component.id).toBeTruthy(); // Se o retorno do ID não for nulo ou vazio, ele deve ser true.
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = "someId";
    component.id = someId;
    fixture.detectChanges(); // atualiza a mudança do atributo id do componente no código acima.
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name} should trigger (@Output liked) when called`, () => {
    spyOn(component.liked, 'emit'); // spyOn(objeto, 'metodo') - espiona o método do objeto para avisar o Jasmine que foi chamado.
    fixture.detectChanges(); // dispara o ciclo de vida o ngOnInit() do componente.
    // component.liked.subscribe(() => { // o eventEmiter do componente é um observable, o subscribe() vai ser disparado quando executar o método like(), na linha seguinte.
    //   expect(true).toBeTruthy(); // só pra saber se esse linha foi chamado no código.
    //   done(); // Segundo parâmetro do it() do Jasmine que indica para finalizar o teste, se não for usado, gera timeout no teste com erro.
    // });
    component.like(); // Vai executar o liked.emit() dentro do método que por sua vez, vai emitir o evento do subscribe na linha do código acima.
    expect(component.liked.emit).toHaveBeenCalled(); // toHaveBeenCalled() - verifica se o método foi chamado. Ele espera o spyOn() junto, para não dar erro de "Expected a spy".
  });
})
