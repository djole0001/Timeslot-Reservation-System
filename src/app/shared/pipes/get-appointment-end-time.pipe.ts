import { Pipe, PipeTransform } from '@angular/core';
import { AppointmentOverview } from '../models/models';
import { getAppointmentEndTime } from '../utils/date.util';

@Pipe({
  name: 'getAppointmentEndTime',
})
export class GetAppointmentEndTimePipe implements PipeTransform {
  transform(value: AppointmentOverview): Date {
    return getAppointmentEndTime(value);
  }
}
