import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppService } from 'src/services/AppService.service';
import { PostListFilterComponent } from './components/postList-filter/postList-filter.component';
import { PostListDetailsComponent } from './components/postList-details/postList-details.component';
import { createPostItemComponent } from './components/create-postItem/create-postItem.component';
import { EventService } from 'src/services/EventService.service';
import { ListEventComponent } from './components/list-event/list-event.component';


@NgModule({
  declarations: [
    AppComponent,
    PostListFilterComponent,
    PostListDetailsComponent,
    createPostItemComponent,
    ListEventComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AppService, EventService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
