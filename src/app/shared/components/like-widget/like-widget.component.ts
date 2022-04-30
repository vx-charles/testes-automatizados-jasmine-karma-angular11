import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { UniqueIdService } from '../../services/unique-id.service';

@Component({
  selector: 'app-like-widget',
  templateUrl: './like-widget.component.html',
  styleUrls: ['./like-widget.component.scss']
})
export class LikeWidgetComponent implements OnInit {
  @Output() public liked = new EventEmitter<void>(); // emite um evento externo para o componente pai.
  @Input() public likes = 0;
  @Input() public id: string = null;
  public fonts = { faThumbsUp };

  constructor(private uniqueIdService: UniqueIdService) { }

  ngOnInit(): void {
    if(!this.id) {
      this.id = this.uniqueIdService.generateUniqueIdWithPrefix('like-widget');
    }
  }

  public like(): void {
    this.liked.emit(); // emite o evento do clicado com o @Output() do liked. Isso é para que o componente pai possa saber que o clique foi feito.
  }
}
