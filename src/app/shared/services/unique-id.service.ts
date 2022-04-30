import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable() // Não vai ter escopo "root" vai ser adicionado no provider do Module do componente que vai utilizar.
export class UniqueIdService { // class usada para saber quantos ID's foram gerados na página.

  private numberOfGeneratedIds = 0;
  private validId = /^[A-Za-z]+[\w\-\:\.]*$/; // testa se começa com letra maiúscula ou minuscula, seguido de hífen e depois qualquer outra coisa.

  public generateUniqueIdWithPrefix(prefix: string): string {
    if(!prefix || !this.validId.test(prefix)) { // this.validId.test('') ou this.validId.test(undefined) ou this.validId.test(null) - "true", invertendo os que são "false" no teste pra true para lançar o erro na condição.
      throw new Error('Prefix can not be empty'); // chamado de "Fail Fast", para mostrar ao desenvolvedor uma mensagem rápida de erro por ter esquecido de passar o prefixo.
    }
    const uniqueId = this.generateUniqueId();
    this.numberOfGeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  public getNumberOfGeneratedUniqueIds(): number {
    return this.numberOfGeneratedIds;
  }

  private generateUniqueId(): string {
    return uuidv4();
  }
}
