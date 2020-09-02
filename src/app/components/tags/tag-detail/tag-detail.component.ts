import { Component, OnInit, Input, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { Tag } from '../../../models/tag';
import { TagService } from '../../../services/tag/tag.service';

import { TagFacade } from '../../../store/tag/tag.facade'

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

}
