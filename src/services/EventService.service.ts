import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, withLatestFrom } from "rxjs";
import { EventAction } from "src/models/eventAction.model";

@Injectable()
export class EventService {

  ListEventSubject: BehaviorSubject<EventAction[]> = new BehaviorSubject<EventAction[]>([]);
  ListEvent$ : Observable<EventAction[]> = this.ListEventSubject.asObservable();


  addEventAction(newEvent: EventAction) : void{
    let eventsList = [...this.ListEventSubject.value,  newEvent]
    this.ListEventSubject.next(eventsList);
  }

}