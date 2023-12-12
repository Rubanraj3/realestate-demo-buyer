import { SocketioService } from './../socketio.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { Env } from 'src/app/environment';
import { SubscriberserveService } from '../subscriberserve.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {

  constructor(public fb: FormBuilder, public apis: SubscriberserveService, private web: SocketioService) { }
  @Input('data') token_details: any
  baseURl: any = Env.baseAPi;
  innerWidth: any;
  cartCount: any = 0;
  ngOnInit(): void {
    this.web.cartCount.subscribe((res: any) => {
      this.cartCount = res;
    });
    if (window.innerWidth < 600) {
      this.innerWidth = 'mobile'
    }
    else if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.innerWidth = 'tab'
    }
    else {
      this.innerWidth = 'lap'
    }
    if (this.token_details != null) {
      this.getCart(this.token_details.demotoken._id, this.token_details.streampost)
    }
    this.apis.refreshcart.subscribe((res: any) => {
      this.getCart(this.token_details.demotoken._id, this.token_details.streampost)
    })
    this.web.addToCart.subscribe((res: any) => {
      let val: any = this.addpro.value.findIndex((a: any) => a._id == res._id);
      if (val != -1) {
        let con = this.addpro.controls[val]
        con.patchValue({
          cartQTY: res.minLots,
          add_to_cart: true
        });
        this.add_to_internet()
        this.web.productView.next(con.value)
      }

    })
  }
  get addpro() {
    return this.products.controls["products"] as FormArray;
  }
  getCart(id: any, value: any) {
    // console.log(value, '000000')

    this.apis.get_cart(id).subscribe((res: any) => {
      // console.log(res)
      if (res != null) {
        this.web.cartCount.next(res.cart.length);
      }
      this.addpro.clear()
      value.forEach((element: any) => {
        // console.log(element, 2131230000012)
        this.addLesson(element, res)
      });
      // console.log(this.products.value, 2131231231)
    })
  }
  addLesson(item: any, cart: any) {
    let cartQTY: any = 0;
    let add_to_cart: any = false;
    if (cart != null) {
      let index = cart.cart.findIndex((a: any) => a.streamrequestpostId == item._id);
      // console.log(index)
      if (index != -1) {
        cartQTY = cart.cart[index].cartQTY;
        add_to_cart = cart.cart[index].add_to_cart;
      }
    }

    const lessonForm = this.fb.group({
      cartQTY: cartQTY,
      DateIso: item.DateIso,
      image: item.image,
      incrementalLots: item.incrementalLots,
      marketPlace: item.marketPlace,
      minLots: item.minLots,
      offerPrice: item.offerPrice,
      productTitle: item.productTitle,
      quantity: item.quantity,
      _id: item._id,
      add_to_cart: add_to_cart,
      productId: item.productId,
      userId: this.token_details.demotoken._id,
      streamrequestpostId: item._id,
      saved: item.saved,
      interested: item.interested
    });
    this.addpro.push(lessonForm);
  }
  products: any = this.fb.group({
    products: this.fb.array([], Validators.required),
  })
  add_to_cart(item: any, view_change: any) {
    let value = item.value;
    item.get('cartQTY').setValue(item.get('cartQTY')?.value + value.minLots)
    item.get('add_to_cart').setValue(true)
    // console.log(item.value)
    // console.log(this.products.value)
    this.add_to_internet()
    // products

  }
  view_cart() {
    this.apis.change_view_large('cart');
    this.apis.change_view('cart');
    // console.log("asd")
  }
  increament(type: any, item: any) {
    // console.log(item.value)
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
      streamId: this.token_details.demotoken.channel,
      userId: this.token_details.demotoken._id,
    }
    this.apis.add_to_internet(data).subscribe((res: any) => {
      this.web.cartCount.next(res.cart.length);
      // console.log(res)get/all/post/pagenation
    })
  }
  productView(val: any) {
    // console.log(event, 12312)
    this.web.productView.next(val)
  }
  productView_web(val: any, event: any) {
    var element = event.target as HTMLElement;
    if (element.tagName != 'BUTTON') {
      this.web.productView.next(val)
    }
  }

  save_product(item: any) {
    item.patchValue({
      saved: true
    })
    let join = localStorage.getItem("buyerJoin");
    let demoStream = localStorage.getItem("demoStream");
    this.apis.save_product({ postID: item.value._id, streamID: demoStream, userID: join }).subscribe((res: any) => {
      // console.log(res)
    })
  }
  Interested(item: any) {
    item.patchValue({
      interested: true
    })
    let join = localStorage.getItem("buyerJoin");
    let demoStream = localStorage.getItem("demoStream");
    this.apis.interested_product({ postID: item.value._id, streamID: demoStream, userID: join }).subscribe((res: any) => {
      // console.log(res)
    })
  }
}

