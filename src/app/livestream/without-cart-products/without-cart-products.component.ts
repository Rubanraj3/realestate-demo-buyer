import { Env } from 'src/app/environment';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { SubscriberserveService } from '../subscriberserve.service';

@Component({
  selector: 'app-without-cart-products',
  templateUrl: './without-cart-products.component.html',
  styleUrls: ['./without-cart-products.component.css']
})
export class WithoutCartProductsComponent implements OnInit {
  baseURl: any = Env.baseAPi;
  constructor(public fb: FormBuilder, public apis: SubscriberserveService) { }
  @Input('data') token_details: any
  innerWidth: any;
  ngOnInit(): void {
    if (window.innerWidth < 600) {
      this.innerWidth = 'mobile'
    }
    else if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.innerWidth = 'tab'
    }
    else {
      this.innerWidth = 'lap'
    }
    console.log(this.token_details, 12312312312312312)
    if (this.token_details != null) {
      this.getCart(this.token_details.chennel, this.token_details)
    }
    this.apis.refreshcart.subscribe((res: any) => {
      if (res == 'load') {
        this.getCart(this.token_details.chennel, this.token_details)
      }
    })
  }
  get addpro() {
    return this.products.controls["products"] as FormArray;
  }
  getCart(id: any, value: any) {
    this.addpro.clear()
    this.apis.get_cart(id).subscribe((res: any) => {
      console.log(res, 21312312)
      value.streamrequestposts.forEach((element: any) => {
        console.log(element, res, '21312312312312312')
        this.addLesson(element, res)
      });
    })
  }
  addLesson(item: any, cart: any) {
    let cartQTY: any = 0;
    let add_to_cart: any = false;
    if (cart != null) {
      let index = cart.cart.findIndex((a: any) => a.streamrequestpostId == item._id);
      console.log(index, 3212312312)
      if (index != -1) {
        cartQTY = cart.cart[index].cartQTY;
        add_to_cart = cart.cart[index].add_to_cart;
      }
    }

    const lessonForm = this.fb.group({
      DateIso: item.DateIso,
      categoryId: item.categoryId,
      created: item.created,
      image: item.image,
      incrementalLots: item.incrementalLots,
      marketPlace: item.marketPlace,
      minLots: item.minLots,
      offerPrice: item.offerPrice,
      postLiveStreamingPirce: item.postLiveStreamingPirce == null ? 0 : item.postLiveStreamingPirce,
      productTitle: item.productTitle,
      quantity: item.quantity,
      suppierId: item.suppierId,
      _id: item._id,
      streamrequestpostId: item._id,
      cartQTY: cartQTY,
      add_to_cart: add_to_cart,
      productId: item.productId,
      bookingAmount: item.bookingAmount,
      streamPostId: item.streamPostId,
      allowAdd_to_cart: item.allowAdd_to_cart,
    });
    let product = this.addpro.value.findIndex((a: any) => a._id == item._id)
    console.log(this.addpro.value, 123123123129989)
    if (product == -1) {
      this.addpro.push(lessonForm);
    }
  }
  products: any = this.fb.group({
    products: this.fb.array([], Validators.required),
  })
  add_to_cart(item: any, view_change: any) {
    let value = item.value;
    item.get('cartQTY').setValue(item.get('cartQTY')?.value + value.minLots)
    item.get('add_to_cart').setValue(true)
    this.add_to_internet()
    this.apis.refreshcart.next("cart")

  }
  view_cart() {
    this.apis.change_view_large('cart');
  }
  increament(type: any, item: any) {
    let value = item.value;
    if (type == 1) {
      if (value.minLots < item.get('cartQTY')?.value) {
        item.get('cartQTY').setValue(item.get('cartQTY')?.value - value.incrementalLots)
        if (item.get('cartQTY')?.value == 0) {
          item.get('add_to_cart').setValue(false)
        }
      }
      else {
        item.get('cartQTY').setValue(0)
        item.get('add_to_cart').setValue(false)
      }

    }
    else {
      item.get('cartQTY').setValue(item.get('cartQTY')?.value + value.incrementalLots)
    }
    this.add_to_internet()
  }

  add_to_internet() {

    let cart: any = [];
    let product = this.products.get('products')?.value;
    product.forEach((element: any) => {
      if (element.add_to_cart) {
        cart.push(element)
      }
    });
    let data: any = {
      cart: cart,
      streamId: this.token_details.chennel
    }
    this.apis.add_to_internet(data).subscribe((res: any) => {
      console.log(res)
      this.apis.refreshcart.next("load")
    })
  }

}
