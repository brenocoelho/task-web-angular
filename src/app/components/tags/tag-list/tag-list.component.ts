import { Component, OnInit } from '@angular/core';

import { TagDetailComponent } from '../tag-detail/tag-detail.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TagFacade } from '../../../store/tag/tag.facade'
import { TaskFacade } from '../../../store/task/task.facade'

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
  }

  changeSelect() {
    this.taskFacade.setFilter(this.select);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TagDetailComponent, {
      width: '420px',
      height: '250px',
      data: {tag: null}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

}
