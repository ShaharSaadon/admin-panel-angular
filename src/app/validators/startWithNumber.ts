import { AbstractControl } from '@angular/forms';

export function startWithNumber(control: AbstractControl) {
  console.log('control.value[0]:', control.value[0]);
  if (!isNaN(control.value[0])) {
    return { startWithNumber: true };
  } else {
    return null;
  }
}
