import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time',
})
export class TimePipe implements PipeTransform {
  transform(value?: number | null): string {
    if (!value) {
      return '00:00';
    }
    let hours = Math.floor(value / 60);
    let minutes = Math.floor(value % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }
}
