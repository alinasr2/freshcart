import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { guardGuard } from './core/guards/guard/guard.guard';
import { logedGuard } from './core/guards/logedGuard/loged.guard';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: "", redirectTo: "home", pathMatch: "full" },

    { path: "", component: AuthLayoutComponent, canActivate:[logedGuard], children: [
        { path: "login", loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent), title: "login" },
        { path: "register", loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent), title: "register" },
        { path: "forgotPassword", component: ForgotPasswordComponent },
    ]},

    { path: "", component: BlankLayoutComponent , canActivate:[guardGuard], children: [
        { path: "home", loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), title: "Home - Fresh Cart" },
        { path: "cart", loadComponent: () => import('./pages/cart/cart.component').then(m => m.CartComponent), title: "Cart - Fresh Cart" },
        { path: "products", loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent), title: "Products - Fresh Cart" },
        { path: "brands", loadComponent: () => import('./pages/brands/brands.component').then(m => m.BrandsComponent), title: "Brands - Fresh Cart" },
        { path: "wishlist", loadComponent: () => import('./pages/wishlist/wishlist.component').then(m => m.WishlistComponent), title: "Wishlist - Fresh Cart" },
        { path: "product/:id", loadComponent: () => import('./pages/product/product.component').then(m => m.ProductComponent) },
        { path: "checkout/:id", loadComponent: () => import('./pages/checkout/checkout/checkout.component').then(m => m.CheckoutComponent), title: "Checkout - Fresh Cart" },
        { path: "**", component: NotfoundComponent }
    ]}
];
