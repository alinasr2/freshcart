import { Component, inject, OnInit} from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ICategory } from '../../shared/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import {RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  imports:[CarouselModule,CommonModule,RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoriesService = inject(CategoriesService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  products:Iproduct[] = [];
  categories:ICategory[]=[];
  mainSliderOptions: OwlOptions = {
    autoplay:true,
    loop: true,
    items:1,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    nav: true
  }
  customOptions: OwlOptions = {
    autoplay:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 5
      }
    },
    nav: true
  }
  getAllProducts():void
  {
    this.productsService.getAllProducts(1).subscribe({
      next:(res)=>{        
        this.products = res.data;
      },
      error:(err)=>{console.log(err);

      }
    })
  }
  getAllCategories():void
  {
    this.categoriesService.getAllCategories().subscribe({
      next:(res)=>{
        this.categories = res.data;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  addToCart(id:string ):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message , "Fresh Cart")
      }
    })
  }
  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

}
