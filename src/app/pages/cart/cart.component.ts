import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import {  RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  products:ICart[]=[];
  cartId:string = "";
  totalPrice:number = 0;
  ngOnInit(): void {
    this.getCart();
    
  }

  

  getCart():void
  {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res)=>{
        this.cartId = res.cartId;
        this.products=res.data.products;        
        this.totalPrice = res.data.totalCartPrice;
      },
      error: (err)=>{
        console.log(err);
      }
    });
  }

  removeProduct(id:string):void
  {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next:(res)=>{
        this.products = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this.toastrService.success("Product removed from cart","Fresh Cart")
      },
      error:(err)=>{
        console.log(err);
        
      }
    });
  }

  updateCount(id:string , count:number):void
  {
    this.cartService.updateCartProductQuantity(id,count).subscribe({
      next: (res)=>{
        this.getCart();
        this.toastrService.success("Product Count Update successfully","Fresh Cart");
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }

  clearCart():void{
    this.cartService.clearUserCart().subscribe({
      next: (res)=>{
        if(res.message == "success"){
          this.products = [];
          this.totalPrice= 0;
          this.toastrService.success("All Products Removed From Cart","Fresh Cart")
        }
      },
      error: (err)=>{
        console.log(err);
      }
    })
  }
}
