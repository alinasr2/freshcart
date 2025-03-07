import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { ProductsService } from '../../core/services/products/products.service';
import { Iproduct } from '../../shared/interfaces/iproduct';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
registerSwiperElements();
@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ProductComponent implements OnInit{
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastrService = inject(ToastrService);

  products:Iproduct[]=[];
  isFav:boolean = false;
  product!:Iproduct;
  productId!:any;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res)=>{
        this.productId = res.get("id");
        
      }
    });

    this.productsService.getSpecificProducts(this.productId).subscribe({
      next: (response)=>{
        this.product = response.data;            
      }
    });
    this.getAllWishlist();
  }
  
  addToCart(id:string ):void{
    this.cartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this.toastrService.success(res.message,"Fresh Cart")
      }
    })
  }

  addToWishlist():void{
    this.wishlistService.addProductToWishlist(this.productId).subscribe({
      next:(res)=>{
        if(this.isFav){
          this.toastrService.warning("Product Already in Wishlist" ,"Fresh Cart");
        }
        else{
        this.toastrService.success(res.message,"Fresh Cart");
        this.isFav = true;
        }
      }
    });

  }

  getAllWishlist():void{
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next:(res)=>{
        this.products = res.data;
       let found = this.products.find(product => product._id === this.productId );       
       if (found == undefined) {
        this.isFav = false;
       }
       else{
        this.isFav = true;
       }
       
      }
    })
  }

}
