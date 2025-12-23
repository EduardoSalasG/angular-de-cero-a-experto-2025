import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@products/services/products.service';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {

  productService = inject(ProductService)
  activatedRoute = inject(ActivatedRoute);

  productIdSlug: string = this.activatedRoute.snapshot.params['idSlug'];

  productResource = rxResource({
    params: () => ({ idSlug: this.productIdSlug }),
    stream: ({ params }) => {
      return this.productService.getProductByIdSlug(params.idSlug)
    }

  })


}
