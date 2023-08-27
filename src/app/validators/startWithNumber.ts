import { AbstractControl } from '@angular/forms';

export function startWithNumber(control: AbstractControl) {
  if (!isNaN(control.value[0])) {
    return { startWithNumber: true };
  } else {
    return null;
  }
}
