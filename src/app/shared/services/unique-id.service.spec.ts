import { empty } from 'rxjs';
import { UniqueIdService } from "./unique-id.service"

// O jogo da velha "#" identifica que é um método.
describe(UniqueIdService.name, () => { // describe() - escopo do artefato que vai ser executado para cada teste.

  let service: UniqueIdService = null;
  beforeEach(() => { // vai ser executado antes de cada it()
    service = new UniqueIdService(); // Antes de cada it() vai ser criado um novo objeto com valor null na variável "service".
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should generate id when called with prefix`, () => { // it() - critério do teste a ser testado.
      const id = service.generateUniqueIdWithPrefix('app');

      expect(id.startsWith('app-')) // expect() - recebe como primeiro parâmetro o valor que desejamos comparar com o valor esperado.
        //.toContain('app-'); // toContain() - verificar se o id gerado contém o prefixo "app-" Ex: dss-app-565sdfd or app-565sdfd. toContain() não é tão preciso.
        .toBeTrue(); // deixar o teste mais preciso é importante para evitar de entrar em condições inesperadas, no caso do toContain('app-').

      expect(true).toBeTrue(); // espera sempre um tipo literal, ex: const x = true. Não funciona se for const y = new Boolean(true).
      expect(true).toBe(true); // compara se true é igual a true. Não funciona se expected(new Boolean(true)).toBe(new Boolean(true)), pois ambos são objetos que apontam para referências de memórias diferentes.
      expect(new Boolean(true)).toBeTruthy(); // usado para testar se o valor é true ou false, se tem string é true, se '' é false, se é null é false, se for um objeto new Boolean(true) é true. Testa qualquer valor que pode ser avaliado como true. Exemplo de valores são null, undefined, '' e 0.
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should not generate duplicate Ids when called multiple times`, () => {
      // const firstId = service.generateUniqueIdWithPrefix('app');
      // const secondId = service.generateUniqueIdWithPrefix('app');
      // expect(firstId).not.toBe(secondId); // expectativa do firstId não ser igual ao secondId.
      const ids = new Set(); // Set() - não aceita elementos duplicadas, por exemplo, strings duplicadas serão ignoradas.

      for(let i = 0; i < 50; i++) {
        ids.add(service.generateUniqueIdWithPrefix('app')); // add 50, se tiver um igual, ele não adiciona, ficando com 49 adicionados.
      }

      expect(ids.size).toBe(50); // expectativa do tamanho do Set() ser igual a 50, se tiver 49, ele dá erro.
  });

  it(`#${UniqueIdService.prototype.getNumberOfGeneratedUniqueIds.name}
    should return the number of generatedIds when called`, () => {
    service.generateUniqueIdWithPrefix('app');
    service.generateUniqueIdWithPrefix('app');
    expect(service.getNumberOfGeneratedUniqueIds()).toBe(2);
  });

  it(`#${UniqueIdService.prototype.generateUniqueIdWithPrefix.name}
    should throw when called with empty`, () => {
      const emptyValues = [null, undefined, '', '0', '1'];
      emptyValues.forEach(emptyValue => {
        expect(() => service.generateUniqueIdWithPrefix(emptyValue))
        .withContext(`Not expected value "${emptyValue}" to throw`) // coloca o contexto de erro no test para o expect() para saber exatamente onde está falhando. Útil em um loop.
        .toThrow(); // quando chamar um método e quer testar para ele lançar um erro ou throw, usamos um arrow function.
      });
  });

})
