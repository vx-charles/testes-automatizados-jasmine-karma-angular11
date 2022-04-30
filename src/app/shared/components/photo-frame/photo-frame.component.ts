import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from "@angular/core";
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-photo-frame",
  templateUrl: "./photo-frame.component.html",
  styleUrls: ["./photo-frame.component.scss"]
})
export class PhotoFrameComponent implements OnInit, OnDestroy {
  @Input() public description = '';
  @Input() public src = '';
  @Input() public likes = 0;
  @Output() public liked: EventEmitter<void> = new EventEmitter();

  private debounceSubject: Subject<void> = new Subject();
  private unsubscribe: Subject<void> = new Subject();

  public ngOnInit(): void {
    this.debounceSubject
      .asObservable()
      .pipe(debounceTime(500)) // para o click ser acionado depois de 500ms, evita disparo acelerado do numero de likes.
      .pipe(takeUntil(this.unsubscribe)) // takeUntil - fique inscrito até emitir ou completar o subscribe.
      .subscribe(() => this.liked.emit());
  }

  public ngOnDestroy(): void { // usado para desenscrever o observable
    this.unsubscribe.next(); // executa o unsubscribe acima que está esperando no debounceSubject
    this.unsubscribe.complete(); // desinscreve o observable.
  }

  public like():void {
    this.debounceSubject.next(); // dispara o observable da variável do debounceSubject
  }
}
