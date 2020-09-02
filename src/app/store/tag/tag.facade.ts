import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { State } from './tag.state';
import * as fromSelectors from './tag.selectors';
import * as fromActions from './tag.actions';

import { Tag } from '../../models/tag';

@Injectable({
  providedIn: 'root'
})
export class TagFacade {

  constructor(private store: Store<State>) {}

  tags$ = this.store.pipe(select(fromSelectors.selectAllTags));

  editTag$ = this.store.pipe(select(fromSelectors.selectEditTag));

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

  editTag(tag: Tag) {
    this.store.dispatch(fromActions.editTag({tag}));
  }

  cleanTag() {
    this.store.dispatch(fromActions.cleanTag());
  }

}