import { Component, Directive, Renderer, ElementRef } from '@angular/core';
import { CheckboxControlValueAccessor, NgControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  shippingOptions = [
    'Same day',
    'Next day',
    '2nd day air'
  ];
  shippingPrices = { '': 0, 'Same day': 49, 'Next day': 29, '2nd day air': 11 };

  products = [
    { name: 'The Schaaf Jacket', price: 235 },
    { name: 'The Sorvell Array Shorts', price: 65 },
    { name: 'The Sorvell Y-Back Tank', price: 46 },
  ];

  tax = 35;
  wrapping = 9;

  defaults = {
    shippingMethod: '',
    isGift: false
  };

  checkoutComplete = false;

  onSubmit(form) {
    if (form.valid) {
      console.log('Submitting ', form.value);
      this.checkoutComplete = true;
    }
  }

  getSubtotal() {
    return this.products.map(x => x.price).reduce((accumulator, current, index, array) => {
      return accumulator + current;
    }, 0);
  }

  getTotalPrice(formValue) {
    return this.getSubtotal() +
      this.shippingPrices[formValue.shippingMethod] +
      (formValue.gift ? this.wrapping : 0) +
      this.tax;
  }
}

@Directive({
  selector: 'dash-checkbox',
  host: { '(change)': 'onChange($event.target?.checked)' }
})
export class DashCheckBoxDirective {

  constructor(private _control: NgControl, private _renderer: Renderer, private _element: ElementRef) {
    this._control.valueAccessor = new CheckboxControlValueAccessor(_renderer, _element);
  }

  onChange(checked: boolean) {
    (this._control.valueAccessor as CheckboxControlValueAccessor).onChange(checked);
  }
}
