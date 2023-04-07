import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { tap, take, takeUntil } from "rxjs/operators";
import { PostListData } from "src/models/postList.model";
import { cloneDeep } from 'lodash';
import { BehaviorSubject, Subject } from "rxjs";

@Component({
  selector: 'postList-filter',
  templateUrl: './postList-filter.component.html',
  styleUrls: ['./postList-filter.component.scss']
})
export class PostListFilterComponent {
  // ngOnDestroy(): void {
  //   this.destroy$.next(true);
  //   this.destroy$.complete();
  // }

  destroy$: Subject<boolean> = new Subject<boolean>();
  filterForm: FormGroup = <any>{};
  filteredListData: PostListData[] = [];
  private _listData: PostListData[] = [];

  constructor() {
    this.initForm();
    this.initObservable();
  }
  
  
  @Input()
  set postListData(value: PostListData[]) {
    this.filteredListData = value;
    this._listData = value;
  };

  get postListData() {
    return this._listData;
  }

 @Output()
  onFilterChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  onSelectItem: EventEmitter<PostListData> = new EventEmitter<PostListData>();

  initForm() {
    this.filterForm =new FormGroup({
      filter: new FormControl('', {})
     });
  }

  initObservable() {
    this.filterForm.get('filter')?.valueChanges.pipe(
      tap((filterValue: string) => this.updateFilteredList(filterValue) )
    ).subscribe()
  }

  updateFilteredList(filterValue: string) {
    // this.filteredListData = this.postListData? this.postListData.filter((itemData:PostListData )=> itemData.name?.includes(filterValue)) : [];
    this.onFilterChange.emit(filterValue);
  }

  selectItem(itemToSelect:PostListData) {
    let updatedItem =  {
      ...itemToSelect,
      selected : true
    }
    // this.filteredListData = cloneDeep(this.filteredListData).map((item) => item.id === updatedItem.id ?
    //   updatedItem :
    //   {
    //     ...item,
    //     selected: false
    //   }
    // )
    this.onSelectItem.emit(updatedItem);
  }
}