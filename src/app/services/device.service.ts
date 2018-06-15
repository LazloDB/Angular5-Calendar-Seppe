import { Injectable } from '@angular/core';

@Injectable()
export class DeviceService {

  constructor() {

  }

  isMobile(): boolean {
    let width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log(width);
    if (width < 638) {
      return true;
    } else {
      return false;
    }
  }

}
