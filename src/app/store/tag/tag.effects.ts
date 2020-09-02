import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { EMPTY, Observable, of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

import * as TagActions from "./tag.actions";
import { TagService } from "../../services/tag/tag.service";
import { Tag } from '../../models/tag';

@Injectable()
export class TagEffects {

  constructor(
    private actions$: Actions,
    private tagService: TagService
  ) {}

  loadTags$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(TagActions.loadTags),
      mergeMap(() => this.tagService.getTags()
        .pipe(
          map((tags: Tag[]) => {
              return TagActions.loadTagsSuccess({ tags: tags });
          }),          
          catchError(() => EMPTY)
        )
      )
    )
  );

  createTag$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(TagActions.addTag),
      mergeMap(action => this.tagService.createTag(action.tag)
        .pipe(
          map((tag: Tag) => {
            return TagActions.addTagSuccess({ tag: tag });
          }),
          catchError(() => EMPTY)
          // catchError((error: Error) => { return of(appActions.ErrorToDoAction(error)); })
        )
      )
    )
  ); 

  updateTag$: Observable<Action> = createEffect(() => this.actions$.pipe(
      ofType(TagActions.updateTag),
      mergeMap(action => this.tagService.updateTag(action.tag).pipe(
          map((tag: Tag) => {
            return TagActions.updateTagSuccess({ tag: tag });
          }),
          catchError(() => EMPTY)
          // catchError((error: Error) => { return of(appActions.ErrorToDoAction(error)); })
        )
      )
    )
  );  

  deleteTag$: Observable<Action> = createEffect(() => 
    this.actions$.pipe(
      ofType(TagActions.deleteTag),
      mergeMap(action => this.tagService.deleteTag(action.tag)
        .pipe(
          map(() => {
            return TagActions.deleteTagSuccess({ tag: action.tag });
          }),
          catchError(() => EMPTY)
          // catchError((error: Error) => { return of(appActions.ErrorToDoAction(error)); })
        )
      )
    )
  ); 

}