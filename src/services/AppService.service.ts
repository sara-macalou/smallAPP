

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, combineLatest, of, take, map } from 'rxjs';
import { PostListData } from 'src/models/postList.model';
import { cloneDeep } from 'lodash';


@Injectable()
export class AppService {

  private postListDataSubject: BehaviorSubject<PostListData[]> = new BehaviorSubject<PostListData[]>([]);
  private listFilterTextSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  postListdata$: Observable<PostListData[]> = this.postListDataSubject.asObservable();
  filteredPostList$: Observable<PostListData[]>;
  constructor(private httpClient: HttpClient) {
    this.initObservable();
    this.readJson();
  }


  initObservable() {
    this.filteredPostList$ = combineLatest([
      this.postListdata$,
      this.listFilterTextSubject
    ]).pipe(
      map(([postLisData, filterValue]) => {
        return postLisData.filter(itemData => itemData.name?.includes(filterValue))
      })
    )
  }

  readJson(): void {
    let url = 'assets/data/posts.json';
    this.httpClient.get<PostListData[]>(url).subscribe(
      (dataPost :PostListData[]) => this.postListDataSubject.next(dataPost)
    );
  }

  setListFilterText(filterValue: string) {
    this.listFilterTextSubject.next(filterValue);
  }

  setSelectedPost(selectedItem: PostListData) {
    let allPostList = cloneDeep(this.postListDataSubject.value).map((item) => item.id === selectedItem.id ?
    selectedItem :
      {
        ...item,
        selected: false
      }
    )
    this.postListDataSubject.next(allPostList);
  }

  setNewPost(newItem: PostListData) {
    let allPostList = cloneDeep(this.postListDataSubject.value);
    let arrayIds =  allPostList.map(item => item.id!);
    let id = Math.max(...arrayIds) + 1;
    let postItem = {
      ...newItem,
      id
    };
    allPostList= cloneDeep(allPostList)
      .map((item) => ({
          ...item,
          selected: false
        })
    );
    allPostList.push(postItem);
    this.postListDataSubject.next(allPostList);
  }

  deletePostList(itemToDelete: PostListData) {
    let allPostList = cloneDeep(this.postListDataSubject.value).filter((postItem) => postItem.id !== itemToDelete.id);
    this.postListDataSubject.next(allPostList);
  }

}