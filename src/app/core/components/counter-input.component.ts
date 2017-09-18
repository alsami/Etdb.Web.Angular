import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'counter-input',
    template: `
    <button md-button (click)="increment()">+</button>
    {{counterValue}}
    <button md-button (click)="decrement()">-</button>
    `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CounterInputComponent),
            multi: true
        }
    ]
})

export class CounterInputComponent implements ControlValueAccessor {
    @Input()
    _counterValue = 0;

    propagateChange = (_: any) => {};

    get counterValue() {
        return this._counterValue;
    }

    set counterValue(val) {
        this._counterValue = val;
        this.propagateChange(this._counterValue);
    }
  
    increment() {
      this._counterValue++;
      this.propagateChange(this._counterValue);
    }
  
    decrement() {
      this._counterValue--;
      this.propagateChange(this._counterValue);
    }
    
    writeValue(obj: any): void {
        if(obj){
            this._counterValue = obj;
        }
    }
    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }
    registerOnTouched(fn: any): void {
        throw new Error("Method not implemented.");
    }
    setDisabledState?(isDisabled: boolean): void {
        throw new Error("Method not implemented.");
    }

}