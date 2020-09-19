import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { State } from './tag/tag.state';
import * as fromSelectors from './tag/tag.selectors';
import * as fromActions from './tag/tag.actions';

import { Tag } from '../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagFacade {

  constructor(private store: Store<State>) {}

  tags$ = this.store.pipe(select(fromSelectors.selectAllTags));

  selectedTag$ = this.store.pipe(select(fromSelectors.selectedTag));

  loadTags() {
    this.store.dispatch(fromActions.loadTags());
  }

  addTag(tag: Tag) {
    this.store.dispatch(fromActions.addTag({tag}));
  }

  updateTag(tag: Tag) {
    this.store.dispatch(fromActions.updateTag({tag}));
  }

  deleteTag(tag: Tag) {
    this.store.dispatch(fromActions.deleteTag({tag}));
  }

  selectTag(tag: Tag) {
    this.store.dispatch(fromActions.selectTag({tag}));
  }

  cleanTag() {
    this.store.dispatch(fromActions.cleanTag());
  }

}