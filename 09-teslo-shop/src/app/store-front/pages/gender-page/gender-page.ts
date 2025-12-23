import { Component, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { map } from 'rxjs';
import { ProductCard } from "@products/components/product-card/product-card";
import { ProductService } from '@products/services/products.service';

@Component({
  selector: 'app-gender-page',
  imports: [ProductCard, TitleCasePipe],
  templateUrl: './gender-page.html',
})
export class GenderPage {

  productsService = inject(ProductService)
  route = inject(ActivatedRoute);

  gender = toSignal(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  );

  productsResource = rxResource({
    params: () => ({ gender: this.gender() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: params.gender
      });
    }
  })

}
