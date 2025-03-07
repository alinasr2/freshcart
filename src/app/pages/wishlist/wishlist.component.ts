import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Iwishlist } from '../../shared/interfaces/iwishlist';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastrService = inject(ToastrService);
  
  products:Iwishlist[]=[];

  ngOnInit(): void {
    this.getWishlist();
  }

  getWishlist():void{
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.products = res.data;
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  addToCart(id:string ):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message,"Fresh Cart");
      }
    })
  }

  removeProductFromWishlist(id:string):void{
    this.wishlistService.removeProductFromWishlist(id).subscribe({
      next:(res)=>{
        this.getWishlist();
        
        this.toastrService.success(res.message,"Fresh Cart");
      }
    })
  }
}
