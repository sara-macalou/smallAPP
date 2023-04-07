import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { tap } from "rxjs/operators";
import { PostListData } from "src/models/postList.model";

@Component({
  selector: 'create-postItem',
  templateUrl: './create-postItem.component.html',
  styleUrls: ['./create-postItem.component.scss']
})
export class createPostItemComponent implements OnInit {
  createForm: FormGroup;
  hasInvalidName: boolean= true;

  @Output()
  onSavingPost: EventEmitter<PostListData> = new EventEmitter<PostListData>()

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name : new FormControl('', {}),
      description:  new FormControl('', {}),
    });
    this.createForm.get('name')?.valueChanges.pipe(
      tap((nameValue: string) => this.hasInvalidName = !(nameValue.length > 6))
    ).subscribe()
  }

  resetPost() {
    this.createForm.patchValue({
      name : '',
      description: ''
    })
  }

  savePost() {
    let newItem: any ={
      name : this.createForm.get('name')?.value,
      content:  this.createForm.get('description')?.value,
      selected: true
    }
    this.onSavingPost.emit(newItem);
    this.resetPost()
  }
}