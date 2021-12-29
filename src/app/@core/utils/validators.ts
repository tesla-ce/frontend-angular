import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

export function doublePasswordCheck(): ValidatorFn {
  return (group: AbstractControl): ValidationErrors => {
      const pass = group.get('password');
      const confirmPass = group.get('password2');

      if (pass?.value !== confirmPass?.value) {
      confirmPass?.setErrors({notEquivalent: 'password does not match'});
      } else {
      confirmPass?.setErrors(null);
      }
      return null;
  };
}

export function checkEmail(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (!re.test(String(control.value).toLowerCase())) return  { wrongFormat: 'Wrong email format' };
      else return null;
  };
}