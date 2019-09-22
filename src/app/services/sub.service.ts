import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor() { }
  private userFun = new Subject<Object>();
  userInfo = this.userFun.asObservable();
  emit(user)
  {
  	console.log(user);
  	this.userFun.next(user);
  }
}
