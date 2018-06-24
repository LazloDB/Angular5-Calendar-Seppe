import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import * as startOfWeek from 'date-fns/start_of_week';
import * as endOfWeek from 'date-fns/end_of_week';
import * as startOfMonth from 'date-fns/start_of_month';
import * as endOfMonth from 'date-fns/end_of_month';
import * as isSameMonth from 'date-fns/is_same_month';
import * as format from 'date-fns/format';
import * as addDays from 'date-fns/add_days';
import * as addMonths from 'date-fns/add_months';
import * as subMonths from 'date-fns/sub_months';
// import * as getDay from 'date-fns/get_day';
import { routine } from '../../common/schedules/seppe';
import { events } from '../../common/events';
import { DeviceService } from '../../services/device.service';

@Component({
  selector: 'ldb-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {
  @Input() today: any;
	@ViewChild('month', {read: ElementRef}) month: ElementRef;
  days: any = [];
  todayFormatted: string;
  monthFormatted: string;

  constructor(private deviceService: DeviceService) { }

  ngOnInit() {
    this.todayFormatted = format(this.today, 'D');
    this.buildMonth();
  }

  buildMonth() {
    this.monthFormatted = format(this.today, 'MMMM YYYY');
    const startOfMonthDay = startOfMonth(this.today);
    const startOfCalendar = startOfWeek(startOfMonthDay, { weekStartsOn: 1 });
    const endOfCalendar = endOfWeek(endOfMonth(this.today), {weekStartsOn: 1});

    if (!isSameMonth(startOfCalendar, this.today) && !this.deviceService.isMobile()) {
      for (let i: number = 0; i < (Number(format(endOfMonth(startOfCalendar), 'D')) + 1) - Number(format(startOfCalendar, 'D')); i++) {
        let routineDay = this.getDayInRoutine(Number(format(addDays(startOfCalendar, i), 'DDD')));
        this.days.push({number: Number(format(startOfCalendar, 'D')) + i, day: format(addDays(startOfCalendar, i), 'dddd'), inMonth: false, routine: routine[routineDay - 1], dayInYear: null});
      }
    }

    for (let i: number = Number(format(startOfMonthDay, 'D')); i < Number(format(endOfMonth(this.today), 'D')) + 1; i++) {
      let routineDay = this.getDayInRoutine(Number(format(addDays(startOfMonthDay, i), 'DDD')));
      this.days.push({number: i, day: format(addDays(startOfCalendar, i + 3), 'dddd'), inMonth: true, routine: routine[routineDay - 2], dayInYear: addDays(startOfCalendar, i + 3)});
    }

    // This fills up the end of the calendar.
    if (!isSameMonth(endOfCalendar, this.today) && !this.deviceService.isMobile()) {
      let end = Number(format(endOfCalendar, 'D'));
      for (let i: number = 0; i < end; i++) {
        let routineDay = this.getDayInRoutine(Number(format(addDays(endOfCalendar, i - 1), 'DDD')));
        this.days.push({number: i + 1, day: format(addDays(startOfCalendar, i - 1), 'dddd'), inMonth: false, routine: routine[routineDay - 3], dayInYear: null});
      }
    }
  }

  getDayInRoutine(day: any): number {
    while(day > 42) {
      day = day - 42;
    }

    return day;
  }

  nextMonth() {
    this.today = addMonths(this.today, 1);
    this.rebuild();
  }

  previousMonth() {
    this.today = subMonths(this.today, 1);
    this.rebuild();
  }

  rebuild() {
    this.days = [];
    this.buildMonth();
    if (this.deviceService.isMobile()) {
      this.scrollTop(this.month);
    }
  }

  scrollTop(element: ElementRef) {
    let scrollValue= 400;
    let rest = element.nativeElement.scrollTop % scrollValue;

    setTimeout(() => {
        if (rest % scrollValue !== 0) {
          element.nativeElement.scrollTop = element.nativeElement.scrollTop - scrollValue;
        } else {
          element.nativeElement.scrollTop = element.nativeElement.scrollTop - rest;
        }

        if (element.nativeElement.scrollTop !== 0) {
          this.scrollTop(element);
        }
    }, 50);
  }

  getEvents(day) {
    return events.filter((event) => format(event.date, 'DDD') ===  format(day, 'DDD'));
  }
}
