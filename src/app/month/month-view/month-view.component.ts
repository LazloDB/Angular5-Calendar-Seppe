import { Component, OnInit, Input } from '@angular/core';
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

@Component({
  selector: 'ldb-month-view',
  templateUrl: './month-view.component.html',
  styleUrls: ['./month-view.component.css']
})
export class MonthViewComponent implements OnInit {
  @Input() today: any;
  days: any = [];
  todayFormatted: string;
  monthFormatted: string;

  constructor() { }

  ngOnInit() {
    this.todayFormatted = format(this.today, 'D');
    this.buildMonth();
  }

  buildMonth() {
    this.monthFormatted = format(this.today, 'MMMM YYYY');
    const startOfCalendar = startOfWeek(startOfMonth(this.today), { weekStartsOn: 1 });
    const endOfCalendar = endOfWeek(endOfMonth(this.today), {weekStartsOn: 1});

    if (!isSameMonth(startOfCalendar, this.today)) {
      for (let i: number = 0; i < (Number(format(endOfMonth(startOfCalendar), 'D')) + 1) - Number(format(startOfCalendar, 'D')); i++) {
        let routineDay = this.getDayOfYear(addDays(startOfCalendar, i));
        this.days.push({day: Number(format(startOfCalendar, 'D')) + i, inMonth: false, routine: routine[routineDay]});
      }
    }

    for (let i: number = Number(format(startOfMonth(this.today), 'D')); i < Number(format(endOfMonth(this.today), 'D')) + 1; i++) {
      let routineDay = this.getDayOfYear(addDays(startOfMonth(this.today), i));
      this.days.push({day: i, inMonth: true, routine: routine[routineDay - 1]});
    }

    // This fills up the end of the calendar.
    if (!isSameMonth(endOfCalendar, this.today)) {
      let end = Number(format(endOfCalendar, 'D'));
      for (let i: number = 0; i < end; i++) {
        let routineDay = this.getDayOfYear(addDays(endOfCalendar, i - 1));
        this.days.push({day: i + 1, inMonth: false, routine: routine[routineDay - 1]});
      }
    }
  }

  getDayOfYear(date: any): number {
    let start: any = new Date(date.getFullYear(), 0, 0);
    let diff: any = date - start;
    let oneDay = 1000 * 60 * 60 * 24;
    let day =  Math.floor(diff / oneDay);
    while(day > 42) {
      day = day - 42;
    }

    return day;
  }

  getShift(routine) {
    switch(routine) {
      case 'X':
        return 'Vrij';
      case 'N':
        return 'Nacht';
      case 'D':
        return 'Dag';
      case 'V':
        return 'Vroege';
      case 'L':
        return 'Late';
      default:
        break;
    }
  }

  nextMonth() {
    this.today = addMonths(this.today, 1);
    this.days = [];
    this.buildMonth();
  }

  previousMonth() {
    this.today = subMonths(this.today, 1);
    this.days = [];
    this.buildMonth();
  }
}
