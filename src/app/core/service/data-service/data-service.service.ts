import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  
  search:any

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();

  private eventEmitter=new Subject<Boolean>();
  currentEvent=this.eventEmitter.asObservable();

  private msgSource = new BehaviorSubject("default");
  currentMsg = this.msgSource.asObservable();

  private searchDataSource = new BehaviorSubject(this.search);
  currentDataSearch = this.searchDataSource.asObservable();

  private profileSource= new BehaviorSubject(false);
  currentProfile= this.profileSource.asObservable();

  constructor() { }

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  searchData(search: String) {
    this.search = search
    console.log("search: ",search);
    this.searchDataSource.next(search);
    
  }
  
  changeData(msg: string) {
    console.log(msg);
    this.msgSource.next(msg)
  }

  changeEvent(message:boolean){
    this.eventEmitter.next(message);
  }
  changeProfile(message:boolean){
    this.profileSource.next(message);
  }

}