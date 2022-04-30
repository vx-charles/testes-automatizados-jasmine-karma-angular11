import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { Photo } from './interfaces/photo';

@Component({
  selector: "app-photo-board",
  templateUrl: "./photo-board.component.html",
  styleUrls: ["./photo-board.component.scss"]
})
export class PhotoBoardComponent implements OnChanges {

  @Input() public photos: Photo[];
  public rows: any[][] = []; // array multidimensional que seria as linhas e colunas. rows é a lista da variavel photos convertida.

  public ngOnChanges (changes: SimpleChanges) { // qualquer mudança no @Input() properties essa função será chamado.
    if(changes.photos) { // se changes tiver a propriedade photos, o @Input() photos mudou, então...
      this.rows = this.groupColunms(changes.photos.currentValue); // valor atual da mudança que tá chegando do @Input() photos.
    }
  }

  private groupColunms(photos: Photo[]): any[][] {
    const newRows = [];
    const step = 4;
    for(let index = 0; index < photos.length; index += step) {
      newRows.push(photos.slice(index, index + step)); // slice(inicio, fim) pega os indices do array e retorna um novo array a cada 4 indices.
    }
    return newRows;
  }

}
