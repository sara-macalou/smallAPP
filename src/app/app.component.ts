import { Component, OnDestroy, OnInit } from '@angular/core';
import { cloneDeep } from 'lodash';
import { Observable, Subject, of, takeUntil, tap } from 'rxjs';
import { EventAction, EActionType } from 'src/models/eventAction.model';
import { PostListData } from 'src/models/postList.model';
import { AppService } from 'src/services/AppService.service';
import { EventService } from 'src/services/EventService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'smallApp';
  postListData$: Observable<PostListData[]> ;
  initialList: PostListData[];
  filteredList: PostListData[];
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit() {
  }

  constructor(
    private appService: AppService,
    private eventActionService: EventService

  ) {
    this.postListData$ = this.appService.filteredPostList$;
  }

  updateFilter(filterValue: string) {
    this.appService.setListFilterText(filterValue)
  }

  updatePostList(newItem: any) {
    let event : EventAction = {
      name: newItem.name!,
      type: EActionType.CREATE,
      date: new Date()
    };
    this.appService.setNewPost(newItem);
    this.eventActionService.addEventAction(event);
  }

  updateSelectItem(selectedItem: PostListData) {
    this.appService.setSelectedPost(selectedItem);
  }

  deleteItem(itemToDelete: PostListData) {
    let event : EventAction = {
      name: itemToDelete.name!,
      type: EActionType.DELETE,
      date: new Date()
    }
    this.appService.deletePostList(itemToDelete);
    this.eventActionService.addEventAction(event);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
