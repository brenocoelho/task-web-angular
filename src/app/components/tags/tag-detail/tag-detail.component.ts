import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Tag } from '../../../models/tag';
import { TagService } from '../../../services/tag/tag.service';

import { TagFacade } from '../../../store/tag.facade'
import { stringToKeyValue } from '@angular/flex-layout/extended/typings/style/style-transforms';

export interface DialogData {
  tag: Tag;
}

@Component({
  selector: 'app-tag-detail',
  templateUrl: './tag-detail.component.html',
  styleUrls: ['./tag-detail.component.scss']
})
export class TagDetailComponent implements OnInit {

  tag: Tag;
  tags$ = this.tagFacade.tags$;
  selectedTag$ = this.tagFacade.selectedTag$;
  tags: Tag[];
  expanded: string[] = [];

  isTagTreeVisible: boolean = false;

  constructor(
    private tagFacade: TagFacade,
    public dialogRef: MatDialogRef<TagDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  ngOnInit(): void {
    this.tags$.subscribe( tags => this.tags = tags as Tag[] );

    this.selectedTag$.subscribe( tag => {
      this.tag = !!tag ? {...tag} : null;
      this.expanded = !!tag.path ? tag.path : [];      
      this.isTagTreeVisible = (!!tag && tag.id) ? false : true;
    });

  }

  setColor(color: string): void {
    this.tag.color = color;
  }

  selectTag(tag: Tag): void {
    this.tag.path = !!tag.path ? [...tag.path] : []
    this.tag.path.push(tag.id);
  }

  save(): void {
    if (this.tag.id) {
      this.tagFacade.updateTag(this.tag);
    } else {
      this.tagFacade.addTag(this.tag);  
    }
    this.dialogRef.close();
  }

  delete(): void {
    this.tagFacade.deleteTag(this.tag);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  showExpandIcon(tag: Tag) {
    if (!this.tags.some(t => !!t.path && t.path.length > 0 && t.path.includes(tag.id))) {
      return 'no';
    } else if (!!this.expanded && this.expanded.length > 0 && this.expanded.includes(tag.id)) {
      return 'collapse';
    } else {
      return 'expand';
    }
  }

  showTag(tag: Tag) {  
    //tag doesn't have parent
    if (!tag.path || (!!tag.path && tag.path.length == 0)) {
      return true;
    //tag parent is in EXPANDED
    } else if (!!this.expanded && this.expanded.length > 0 && this.expanded.includes(tag.path[tag.path.length-1])) {
      return true;
    } else {
      return false;
    }
  }

  expandTag(tag: Tag) {
    this.expanded.push(tag.id);
  }

  collapseTag(tag: Tag) {
    var all: Tag[] = this.tags.filter(t => !!t.path && t.path.length > 0 && t.path.includes(tag.id));
    all.push(tag);
    this.expanded = this.expanded.filter(id => !all.some(t => t.id == id));
  }

  hasTag(tag: Tag): boolean {
    return !!this.tag && !!this.tag.path && this.tag.path.includes(tag.id);
  }
  
}
