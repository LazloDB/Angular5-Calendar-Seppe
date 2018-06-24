import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from '../common/reducers';

@Component({
  selector: 'ldb-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.css']
})
export class EventDisplayComponent implements OnInit {
  @ViewChild('eventContainer', {read: ElementRef}) eventContainer: ElementRef;
  events: any;

  constructor(private store: Store<State>) {
    store.select('events').subscribe((v) => { if (v.events) this.addParagraph(v.events) });
  }

  ngOnInit() {
  }

  addParagraph(events) {
    events.forEach((v) => {
      let paragraph = document.createElement('p');
      paragraph.setAttribute('class', 'event');
      paragraph.addEventListener('click', () => this.close(paragraph));

      let text = document.createTextNode(v.event);
      paragraph.appendChild(text);

      let close = document.createElement('div');
      close.setAttribute('class', 'event-close fa fa-times-circle')

      paragraph.appendChild(close);

      this.eventContainer.nativeElement.appendChild(paragraph);
      setTimeout(() => {
        this.eventContainer.nativeElement.removeChild(paragraph);
      }, 5000);
    })
  }

  close(p) {
    this.eventContainer.nativeElement.removeChild(p);
  };

}
