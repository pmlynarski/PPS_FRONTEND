import { AbstractControl, ValidatorFn } from '@angular/forms';

export function equalityValidator(firstControlName: string | string[]): ValidatorFn {
  return (secondControl: AbstractControl): { [key: string]: any } | null => {
    if (!secondControl.parent) {
      return null;
    }
    const firstControl = secondControl.parent.get(firstControlName);
    const equal = firstControl.value === secondControl.value;
    return !equal ? { equal: true } : null;
  };
}
