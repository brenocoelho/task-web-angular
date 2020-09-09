import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Tag } from '../../../models/tag';
import { TagService } from '../../../services/tag/tag.service';

import { TagFacade } from '../../../store/tag/tag.facade'
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
  master: Tag;
  tags$ = this.tagFacade.tags$;

  constructor(
    private tagFacade: TagFacade,
    public dialogRef: MatDialogRef<TagDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}

  ngOnInit(): void {
    if (this.data["tag"]) {
      this.tag = this.data.tag;
    }
    else {
      this.tag = <Tag>{
        name: "",
        priority: 1,
        color: "42a5f5" 
      };
    }
  }

  setColor(color: string): void {
    this.tag.color = color;
  }

  selectTag(tag: Tag): void {
    this.master = tag;
  }

  setMasterTagNull(): void {
    this.master = null;
  }

  save(): void {
    this.tag.path = [];
    if (this.master) {
      if (this.master.path && this.master.path.length > 0) {
        this.tag.path = Object.assign([],this.master.path);
      }
      this.tag.path.push(this.master.id);
    }

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

}
