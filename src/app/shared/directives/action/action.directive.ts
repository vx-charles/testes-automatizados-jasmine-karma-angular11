import { Directive, HostListener, EventEmitter, Output } from '@angular/core';

@Directive({ // Normalmente as diretivas são atributos
  selector: '[appAction]'
})
export class ActionDirective {
  @Output() public appAction: EventEmitter<Event> = new EventEmitter();

  // @HostListener - Geralmente é mais utilizado por diretivas, mas nada o impede de ser usado diretamente em componentes.
  @HostListener('click', ['$event']) // escuta o evento click para ter acesso ao evento disparado do click e passa para o parametro (event) do método abaixo.
  public handleClick(event: Event): void {
    this.appAction.emit(event); // payload do evento ou o resultado do click.
  }

  @HostListener('keyup', ['$event'])
  public handleKeyUp(event: KeyboardEvent): void {
    this.appAction.emit(event);
  }
}
