import { Pipe, PipeTransform } from '@angular/core';
import { SelectedTreatment } from '../models/models';

@Pipe({
  name: 'sumAppointmentPrice',
})
export class SumAppointmentPricePipe implements PipeTransform {
  transform(value?: SelectedTreatment[]): number {
    if (!value?.length) {
      return 0;
    }
    let sum = 0;
    for (const val of value) {
      sum += val.price;
    }
    return sum;
  }
}
