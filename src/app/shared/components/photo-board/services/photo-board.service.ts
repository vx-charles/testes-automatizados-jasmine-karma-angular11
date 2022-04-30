import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { Photo } from '../interfaces/photo';

@Injectable()
export class PhotoBoardService {

  constructor(private http: HttpClient) {}

  public getPhotos(): Observable<Photo[]> {
    return this.http.get<Photo[]>("http://localhost:3000/photos")
      .pipe(map(photos => { // fazer map no array de photos.
        return photos.map(photo => {
          return { ...photo, description: photo.description.toUpperCase() }; // sobreescreve a descrição retornada com spread para a descrição em maiúsculo.
        })
      }))
      // O uso mais comum de tap() é na verdade para depuração. Você pode colocar um tap(console.log) em qualquer lugar em seu observable pipe,
      .pipe(tap(photos => console.log(photos)))
      .pipe(delay(2000));
  }
}
