import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { TaskFacade } from '../../store/task.facade'
import { TagFacade } from '../../store/tag.facade'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    public authService: AuthService,
    private taskFacade: TaskFacade,
    private tagFacade: TagFacade,
    ){ }

  ngOnInit(): void {
    this.taskFacade.loadTasks();
    this.tagFacade.loadTags();
  }

  logout() {
    this.authService.doLogout();
  }

}