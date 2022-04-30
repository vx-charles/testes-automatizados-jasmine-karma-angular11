import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Photo } from '../interfaces/photo';
import { buildPhotoList } from '../test/build-photo-list';
import { PhotoBoardService } from './photo-board.service';

@Injectable() // Injectable do PhotoBoardService, quando extendido, ele não traz o decorator.
export class PhotoBoardMockService extends PhotoBoardService { // herdou do PhotoBoardService e sobrescreveu o método getPhotos() para trazer os dados mockados.
  public getPhotos(): Observable<Photo[]> {
    return of(buildPhotoList()); // retorna o Observable, então usar o of(). Traz a lista de 8 photos teste.
  }
}
