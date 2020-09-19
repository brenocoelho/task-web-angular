import { Component, OnInit } from '@angular/core';

import { TagDetailComponent } from '../tag-detail/tag-detail.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TagFacade } from '../../../store/tag.facade';
import { TaskFacade } from '../../../store/task.facade';

import { Tag } from '../../../models/tag'

interface Condition {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  tags$ = this.tagFacade.tags$;
  selectedTags$ = this.taskFacade.selectedTags$;

  tags: Tag[];
  selectedTags: Tag[];
  expanded: string[] = [];

  conditions: Condition[] = [
    {value: 'OR', viewValue: 'OR'},
    {value: 'AND', viewValue: 'AND'},
    {value: 'NOT', viewValue: 'NOT'}
  ];
  select: string = 'OR';

  constructor(
    public dialog: MatDialog,
    private tagFacade: TagFacade,
    private taskFacade: TaskFacade,   
  ) { }

  ngOnInit(): void {
    this.tags$.subscribe( tags => {
      this.tags = tags as Tag[];
    });
    this.selectedTags$.subscribe( tags => {
      this.selectedTags = tags as Tag[];
    });
  }

  selectTag(tag) {
    if (this.selectedTags.includes(tag)) {
      this.taskFacade.unselectTag(tag);
    } else {
      this.taskFacade.selectTag(tag);
    }
  }

  changeSelect() {
    this.taskFacade.setFilter(this.select);
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

  editTag(tag): void {
    this.tagFacade.selectTag(tag);
    this.openDialog();
  }

  creatTag(): void {

    var tag: Tag = <Tag>{
      name: "",
      priority: 1,
      color: "42a5f5" 
    };
    this.tagFacade.selectTag(tag);
    
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TagDetailComponent, {
      width: '420px',
      height: '450px',
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

}
