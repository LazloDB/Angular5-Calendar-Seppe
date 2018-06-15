import { Injectable } from '@angular/core';

@Injectable()
export class DeviceService {

  constructor() {

  }

  isMobile(): boolean {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width < 375) {
      return true;
    } else {
      return false;
    }
  }

}
