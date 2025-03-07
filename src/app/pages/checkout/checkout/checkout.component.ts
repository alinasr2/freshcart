import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../../core/services/cart/cart.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);
  messageError:string = "";
  idCart:any;
  isLoading:boolean = false;
  checkout:FormGroup = new FormGroup({
    details: new FormControl(null,Validators.required),
    phone: new FormControl(null,[Validators.required , Validators.pattern(/^(01[0-5])\d{8}$|^02\d{8}$/)]),
    city: new FormControl(null , Validators.required),
  });
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (res)=>{
        this.idCart = res.get("id");
      }
    })
    
  }
  submitCheckout(data:object):void
  {
    if(this.checkout.valid){
      this.isLoading = true;
      this.cartService.checkoutSession(this.idCart,data).subscribe({
        next: (res)=>{
          open(res.session.url , "_self");
          
        },
        error:(err)=>{
          this.messageError = `${err.error.message.split(" ",7).join(" ")}`
          
          this.isLoading = false;
        }
      });
    }
    else{
      this.checkout.markAllAsTouched();
    }
  }
  
}
