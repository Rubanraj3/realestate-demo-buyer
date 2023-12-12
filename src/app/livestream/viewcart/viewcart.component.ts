import { formatDate } from '@angular/common';
import { FormArray, FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SubscriberserveService } from '../subscriberserve.service';
import { WindowRefServiceModule } from 'src/app/window-ref-service/window-ref-service.module';
import { Subscription, timer } from 'rxjs';
import { Gatwayserive } from '../gateway.service';
import { Env } from 'src/app/environment';
import { SocketioService } from '../socketio.service';

// import { Countries, States, Cities } from 'countries-states-cities-service'
declare let $: any;
@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.css']
})
export class ViewcartComponent implements OnInit {
  baseURl: any = Env.baseAPi;
  @Input("data") data: any
  @Input("sub") token_details: any
  constructor(public fb: FormBuilder, public apis: SubscriberserveService, public winRef: WindowRefServiceModule, public gatway: Gatwayserive, private web: SocketioService) { }
  innerWidth: any;
  state: any;
  city: any;
  ngOnInit(): void {
    // const countries = Countries.getCountries({
    //   filters: { iso2: 'IN' },
    //   locale: 'it',
    // })

    // const states = States.getStates({ filters: { country_code: 'IN' } })
    // const cities = Cities.getCities({
    //   filters: {
    //     country_code: 'IN',
    //     state_code: 'TN', // Region iso2
    //   },
    // })
    // console.log(countries, states,cities, 9888888)
    if (window.innerWidth < 600) {
      this.innerWidth = 'mobile'
    }
    else if (window.innerWidth > 600 && window.innerWidth < 1200) {
      this.innerWidth = 'tab'
    }
    else {
      this.innerWidth = 'lap'
    }
    this.get_slab();

    this.apis.refreshcart.subscribe((res: any) => {
      if (res == 'cart') {
        this.addpro.clear()
        this.get_slab();
      }
    })

  }


  targetTime: any;
  tickTock() {
    var startDate = new Date();
    var oldDateObj = new Date();
    var newDateObj = new Date();
    newDateObj.setTime(oldDateObj.getTime() + (3 * 60 * 1000));
    var seconds = (this.targetTime - startDate.getTime()) / 1000;
    this.counter = Math.floor(seconds) + 2;
    this.countDown = timer(0, 1000).subscribe((res) => {
      --this.counter
      console.log(this.counter)
      if (this.counter <= 0) {
        this.apis.change_view_large('product')
        this.apis.change_view('product')
        this.apis.topView.next("current")
      }
    });
    // console.log(this.counter)

  }
  countDown: Subscription | undefined;
  counter: any;
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.countDown?.unsubscribe()
    // this.apis.proceed_to_pay_stop(this.token_details.demotoken.channel).subscribe((res: any) => {
    //   console.log(res, 1231)
    // })
  }
  cart: any;
  getCart() {
    this.apis.get_cart(this.token_details.demotoken._id).subscribe((res: any) => {
      // console.log(res,123761829367)
      this.cart = res;
      if (res != null) {
        var startDate = new Date();
        if (res.proceed_To_Pay == "start" && res.endTime > startDate) {
          this.targetTime = res.endTime;
          this.tickTock();
          this.Proceed_to_Pay = true;
        }
        res.cart.forEach((element: any) => {
          this.addLesson(element)
          this.cartCount++;
        });
        this.calculateAmount();
      }
      // console.log(this.products.value, 2131231231)
    })
  }

  slab: any = [];

  get_slab() {
    this.apis.get_booking_slab().subscribe((res: any) => {
      this.slab = res;
      if (this.token_details != null) {
        this.getCart()
      }
    })
  }
  addLesson(item: any) {
    const lessonForm = this.fb.group({
      cartQTY: item.cartQTY,
      DateIso: item.DateIso,
      image: item.image,
      incrementalLots: item.incrementalLots,
      marketPlace: item.marketPlace,
      minLots: item.minLots,
      offerPrice: item.offerPrice,
      productTitle: item.productTitle,
      quantity: item.quantity,
      _id: item._id,
      add_to_cart: item.add_to_cart,
      productId: item.productId,
      userId: this.token_details.demotoken._id,
      streamrequestpostId: item._id
    });
    this.addpro.push(lessonForm);
  }
  get addpro() {
    return this.products.controls["products"] as FormArray;
  }
  products: any = this.fb.group({
    products: this.fb.array([], Validators.required),
  })
  cartCount: any = 0;
  add_to_internet() {
    this.cartCount = 0;
    let cart: any = [];
    let product = this.products.get('products')?.value;
    product.forEach((element: any) => {
      if (element.add_to_cart) {
        cart.push(element)
        this.cartCount++;
      }
    });
    let data: any = {
      cart: cart,
      streamId: this.token_details.demotoken.channel,
      userId: this.token_details.demotoken._id,
    }
    this.cart.cart = cart;
    if (cart.length == 0) {
      this.showLeave_checkout = false;
      this.Proceed_to_Pay = false;
      this.countDown?.unsubscribe();
      this.counter = null;
    }
    this.apis.add_to_internet(data).subscribe((res: any) => {
      this.apis.refreshcart.next('load')
    })
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
    this.calculateAmount();

  }


  back_button() {
    if (this.Proceed_to_Pay) {
      this.showLeave_checkout = true;
    }
    else {
      this.apis.change_view('product')
      this.apis.topView.next("current")
    }
  }
  showLeave_checkout: any = false;
  back_button_large() {
    if (this.Proceed_to_Pay) {
      this.showLeave_checkout = true;
    }
    else {
      this.apis.change_view_large('product')
      this.apis.topView.next("current")


    }
    // console.log("asSAasASASasSAasASsdfsd")

  }
  proceed_to_back(type: any) {
    // console.log(type)
    if (type == 'no') {
      this.showLeave_checkout = false;
    }
    else {
      this.apis.proceed_to_pay_stop(this.token_details.chennel).subscribe((res: any) => {
        // console.log(res, 1231)
      })
      this.apis.change_view('product')
      this.apis.change_view_large('product')
      this.apis.topView.next("current")
    }

  }
  totalAmount: any = 0;
  slabAmount: any = 0;
  calculateAmount() {
    let amount = 0;
    let slabAmount_total: any = 0;
    let product = this.products.get('products')?.value
    product.forEach((element: any) => {
      if (element.add_to_cart) {
        amount += element.cartQTY * element.offerPrice
        // this.slab.
        // console.log(element, element.bookingAmount)
        if (element.bookingAmount == "yes") {
          let slab = this.slab.findIndex((item: any) => item.formAmount <= element.cartQTY * element.offerPrice && item.endAmount > element.cartQTY * element.offerPrice);
          // console.log(slab)
          if (slab != -1) {
            let total = element.cartQTY * element.offerPrice;
            let percentage = this.slab[slab].slabPercentage;

            let slabAmount = total * percentage / 100
            slabAmount_total += slabAmount;
          }
          // console.log(slab, element.cartQTY * element.offerPrice, 123123)

        }


      }
    });
    this.totalAmount = amount;
    this.slabAmount = Math.round(slabAmount_total);
    // console.log(this.slabAmount)

  }

  payments_Details: any = false;
  Proceed_to_Pay: any = false;
  proceed_to_pay(type: Boolean) {
    // console.log(type, 'proasdss')
    this.payments_Details = type;
    if (type) {
      if (!this.Proceed_to_Pay) {
        this.update_proceed_to_pay();

      }
    }
    if (!type) {
      this.proceed_To_Pay = 'Continue';
    }
  }

  update_proceed_to_pay() {
    this.apis.proceed_to_pay_start(this.token_details.chennel).subscribe((res: any) => {
      // console.log(res, 23123)
      this.targetTime = res.endTime;
      this.tickTock();
      // console.log(this.targetTime)
      this.Proceed_to_Pay = true;
    })
  }

  payNow() {
    this.submitted = true;
    let bookingtype: any = true;
    if (this.pay.get("bookingtype")?.value == 'Your Amount') {
      if (this.pay.get("Amount")?.value < this.slabAmount) {
        bookingtype = false;
      }
    }
    if (this.pay.get("bookingtype")?.value == 'Booking Amount') {
      this.pay.patchValue({
        Amount: this.slabAmount,
      })
    }
    if (this.pay.get("bookingtype")?.value == 'Full Amount') {
      this.pay.patchValue({
        Amount: this.totalAmount,
      })
    }
    this.pay.patchValue({
      streamId: this.token_details.demotoken.channel,
      cart: this.cart._id,
      totalAmount: this.totalAmount,
      userId: this.token_details.demotoken._id,

    });
    // console.log(this.pay.value)
    if (this.pay.valid && bookingtype) {
      this.submitted = false;
      if (this.pay.get('paymentMethod')?.value == 'Pay Now') {
        this.gatway.razorpay_paynow(this.pay.get("Amount")?.value).subscribe((res: any) => {
          this.payWithRazor(res.orderId, this.pay.get("Amount")?.value, this.pay.value)
        })
      }

      else {
        this.apis.create_stream_order_cod({ OdrerDetails: this.pay.value }).subscribe((res: any) => {
          // console.log(res)
          // this.apis.change_view('product')
          // this.apis.change_view_large('product')
          // this.apis.topView.next("current")
          // this.web.cartCount.next(0)
          this.web.cartCount.next(0)
          this.successfull = true;

          // this.back_button()
          // this.back_button_large()
        })
      }
    }
  }
  proceed_To_Pay = 'Proceed to Pay';

  submitted: any = false;
  pay: any = new FormGroup({
    name: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    pincode: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
    paymentMethod: new FormControl(null, Validators.required),
    Amount: new FormControl(null, Validators.required),
    streamId: new FormControl(null, Validators.required),
    cart: new FormControl(null, Validators.required),
    bookingtype: new FormControl(null, Validators.required),
    totalAmount: new FormControl(),
    userId: new FormControl(null)
  })




  payWithRazor(orderID: any, amount: any, order: any) {
    const options: any = {
      key: 'rzp_test_D0FyQwd0lixiEd',
      amount: parseInt(amount) * 100,
      currency: 'INR',
      name: '',
      description: '',
      image: '/assets/image/favicon.jpg',
      order_id: orderID,
      modal: {
        escape: false,
      },
      notes: {
      },
      theme: {
        color: '#0c238a'
      }
    };
    options.handler = ((response: any, error: any) => {
      options.response = response;
      this.update_paymemt_now(response, error, order)
    });
    options.modal.ondismiss = ((res: any) => {
      // console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.on('payment.failed', (response: any) => {
    })
    rzp.open();
  }
  update_paymemt_now(res: any, error: any, order: any) {
    // console.log(res, order)
    this.apis.create_stream_order({ PaymentDatails: res, OdrerDetails: order }).subscribe((res: any) => {
      // console.log(res)
      // this.back_button()
      // this.back_button_large()
      this.web.cartCount.next(0)
      this.successfull = true;

    })
  }
  successfull: any = false;

  continue() {
    this.apis.change_view('product')
    this.apis.change_view_large('product')
    this.apis.topView.next("current")
  }
}

