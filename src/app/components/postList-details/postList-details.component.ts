import { Component, EventEmitter, Input, Output } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PostListData } from "src/models/postList.model";

@Component({
  selector: 'postList-details',
  templateUrl: './postList-details.component.html',
  styleUrls: ['./postList-details.component.scss']
})
export class PostListDetailsComponent {

  @Input()
  postListData: any;

  @Output()
  onDeleting: EventEmitter<PostListData> = new EventEmitter<PostListData>();

  deleteItem(itemToDelete: PostListData) {
    if (confirm('Are you sure you want to delete this post?')) {
      this.onDeleting.emit(itemToDelete);
    }
  }
}