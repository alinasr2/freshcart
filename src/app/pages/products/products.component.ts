import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [RouterLink,NgClass],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  pageNumber:number = 1;
  products:Iproduct[] = [];
  getAllProducts(page:number):void
  {
    window.scrollTo({top:0 , behavior:"smooth"});        
    this.productsService.getAllProducts(page).subscribe({
      next:(res)=>{        
        this.products = res.data;
      },
      error:(err)=>{console.log(err);}
    })
  }
  addToCart(id:string ):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message , "Fresh Cart")
      }
    })
  }
  ngOnInit(): void {
    this.getAllProducts(this.pageNumber);
  }

}
