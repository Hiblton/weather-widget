import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  set(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  get(key: string): any {
    let value: string = localStorage.getItem(key);

    if (value && value != 'undefined' && value != 'null') {
      return JSON.parse(value);
    }

    return null;
  }

  remove(key: string) {
    if (key) {
      localStorage.removeItem(key);
    }
  }

}
