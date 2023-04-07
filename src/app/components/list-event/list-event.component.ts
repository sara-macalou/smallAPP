import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { EventAction } from "src/models/eventAction.model";
import { EventService } from "src/services/EventService.service";

@Component({
  selector: 'listEvent',
  templateUrl: './list-event.component.html',
  styleUrls : ['list-event.component.scss']
})
export class ListEventComponent {

  listevents$: Observable<EventAction[]>;

  constructor(private eventService: EventService) {
    this.listevents$ = this.eventService.ListEvent$;
  }
}