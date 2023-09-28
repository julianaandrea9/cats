import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CatsService } from '../shared/services/cats.service';
import { Cat } from '../shared/models/cat.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  listCats: Cat[] = [];
  isLoading: boolean = false;
  @ViewChild('scrollToTopButton') scrollToTopButton: ElementRef | undefined;

  constructor(private catService: CatsService) {}

  ngOnInit() {
    this.getAllCats();
  }

  public getAllCats() {
    this.isLoading = true; // Muestra el spinner

    this.catService.getCats().subscribe(
      (data: any) => {
        this.listCats = data.map((item: any) => {
          return new Cat(
            item.name,
            item.origin,
            item.affection_level,
            item.intelligence,
            item.reference_image_id,
            item.description
          );
        });
        this.loadCatImages();
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error al obtener los gatos', error);
        this.isLoading = false;
      }
    );
  }


  loadCatImages() {
    this.listCats.forEach((cat: any) => {
      this.catService.imageCat(cat.imageUrl).subscribe((imageData: any) => {
        cat.imageUrl = imageData.url;
      });
    });
  }
}
