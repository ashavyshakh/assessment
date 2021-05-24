import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
    providedIn: 'root'
  })
  export class SharedService {
    results = new BehaviorSubject<any>(null);
    setResult(result): any {
    this.results.next(result);
    }
    getResult(): any {
    return this.results.asObservable();
    }
  }
