import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActionDirective } from "./action.directive";
import { ActionDirectiveModule } from './action.module';

describe(ActionDirective.name, () => {
  let fixture: ComponentFixture<ActionDirectTestComponent>;
  let component: ActionDirectTestComponent;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectTestComponent],
      imports: [ActionDirectiveModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectTestComponent);
    component = fixture.componentInstance;
  });

  it(`(DOM) (@Output appAction) should emit event with payload when ENTER key is pressed`, () => {
    // const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const divEl: HTMLElement = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement; // debugElement - faz uma query especifica do angular para buscar elementos do angular, como a diretiva sendo usada em vez da classe CSS.
    const event = new KeyboardEvent('keyup', { key: 'Enter' });
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();
  });

  it(`(DOM) (@Output appAction) should emit event with payload when clicked`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const event = new Event('click');
    divEl.dispatchEvent(event);
    expect(component.hasEvent()).toBeTrue();
  });

  it(`(DOM) (@Output appAction) should emit event with payload when clicked or ENTER key pressed`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    const clickEvent = new Event('click');
    const keyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    divEl.dispatchEvent(clickEvent);
    expect(component.hasEvent()).withContext('Click event').toBeTrue();
    component.clearEvent();
    divEl.dispatchEvent(keyboardEvent);
    expect(component.hasEvent()).withContext('Keyboard event keyup').toBeTrue();
  });
});

@Component({
  template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`,
})
class ActionDirectTestComponent { // componente fantoche usado para testar a diretiva.
  private event: Event = null;

  public actionHandler(event: Event): void {
    this.event = event; // recebe o evento disparado pelo click.
  }

  public hasEvent(): boolean {
    return !!this.event; // converte o evento para booleano, se tiver evento é true, senão é false.
  }

  public clearEvent(): void {
    this.event = null; // limpa o evento.
  }
}
