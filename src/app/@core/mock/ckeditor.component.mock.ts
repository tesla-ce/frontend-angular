/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, forwardRef, Input } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: 'ckeditor',
    template: `<input fullWidth>
    `,
    providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => CKEditorComponent),
          multi: true
        }
      ]
})
export class CKEditorComponent implements ControlValueAccessor {
    @Input() config: any;
    @Input() formControlName: string;

    writeValue(obj: any): void {
        return;
    }
    registerOnChange(fn: any): void {
        return;
    }
    registerOnTouched(fn: any): void {
        return;
    }
    setDisabledState?(isDisabled: boolean): void {
        return;
    }
}
