import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { lastValueFrom, map, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayComboService {

  
  constructor(
    public httpClient: HttpClient,
    private dbService: NgxIndexedDBService
  ) {}
  imagesData:any;
  getGifsUnsub: Subscription | undefined;
  
  private arrayBufferToBase64(buffer: any) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }

  public getImageName(imageUrl: string) {
    const split = imageUrl.split("/");
    const imageName = split[split.length - 1];
    return imageName;
  }

  public getGif(imageUrl: string) {
    const imageName = this.getImageName(imageUrl);
    console.log(imageName,this.imagesData,"fd")
    const imageData =  this.imagesData && this.imagesData.find((e: any) => e.name == imageName);
    return imageData && imageData.base64;
  }

  public saveGif(imageUrl: string) {
    return lastValueFrom(new Observable((sub) => {
      const imageName = this.getImageName(imageUrl);
      if (this.imagesData && this.imagesData.find((e: any) => e.name == imageName)) {
        sub.next('');
        sub.complete();
        return;
      }
      this.httpClient
        .get('https://us-central1-ifyoucanmove-dev.cloudfunctions.net/getGif?url='+imageUrl, { responseType: "arraybuffer" })
        .pipe(map((buffer) => this.arrayBufferToBase64(buffer)))
        .subscribe(
          (res) => {
            var imageUrl = "data:image/gif;base64," + res;
            this.dbService
              .add("gifImages", {
                name: imageName,
                base64: imageUrl,
              })
              .subscribe(
                (key:any) => {
                  sub.next(key);
                  sub.complete();
                },
                (err:any) => {
                  sub.error({ error: true });
                }
              );
          },
          (err) => {
            sub.error({ error: true });
            sub.complete();
          }
        );
    }))
  }
  async getGifs() {
    return new Promise((resolve, reject) => {
        this.getGifsUnsub && this.getGifsUnsub.unsubscribe();
        this.getGifsUnsub = this.dbService.getAll("gifImages").subscribe((res:any) => {
          console.log(res,"gifImages")
           this.imagesData = res;
            resolve(null);
        }, (error:any) => {
            reject(error);
        })
    })
  }  
}
