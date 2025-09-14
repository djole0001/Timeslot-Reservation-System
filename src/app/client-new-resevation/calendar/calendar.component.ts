import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-calendar',
  imports: [MatButton, MatIconModule, DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  @Input() selectedDate?: Date;
  @Input() selectedWeek?: Date[] | null;
  @Input() isPastDisabled = false;
  @Output() selectDateEmitter = new EventEmitter<Date>();
  @Output() selectNextWeekEmitter = new EventEmitter<void>();
  @Output() selectPrevWeekEmitter = new EventEmitter<void>();
  protected readonly today = new Date(new Date().setHours(0, 0, 0, 0));
}
