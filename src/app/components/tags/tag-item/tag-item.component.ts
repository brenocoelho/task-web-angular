import { Component, OnInit, Input } from '@angular/core';
import { Tag } from '../../../models/tag';
import { TagFacade } from '../../../store/tag/tag.facade'
import { TaskFacade } from '../../../store/task/task.facade'
import { TagDetailComponent } from '../tag-detail/tag-detail.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-tag-item',
  templateUrl: './tag-item.component.html',
  styleUrls: ['./tag-item.component.scss']
})
export class TagItemComponent implements OnInit {

  @Input() tag: Tag;

  constructor(
    public dialog: MatDialog,
    private tagFacade: TagFacade,
    private taskFacade: TaskFacade,
    ) { }

  ngOnInit(): void {
  }

  selectTag(selected: Boolean) {
    if (selected) {
      this.taskFacade.selectTag(this.tag);
    } else {
      this.taskFacade.unselectTag(this.tag);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(TagDetailComponent, {
      width: '420px',
      height: '250px',
      data: {tag: {...this.tag}}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

}
