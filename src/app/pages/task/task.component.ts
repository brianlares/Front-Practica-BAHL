import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task/task.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddComponent } from '../modal-add/modal-add.component';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task!: Task;
  tasks!: Task[];

  constructor(public taskService: TaskService, private _matDialog:MatDialog,private router:Router) { }

  ngOnInit()
  {
    this.tasks = this.taskService.getTasks();
    console.log(this.tasks);
    debugger;
  }

  openModalAdd():void{

    this._matDialog.open(ModalAddComponent,{
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '85%',
      width: '40%',
      autoFocus: false
    });
  }

  openModalEdit(task:Task):void
  {
    this._matDialog.open(ModalEditComponent,{
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '85%',
      width: '40%',
      autoFocus: false,
      data: task
    });

    this._matDialog.afterAllClosed.subscribe(() => { window.location.href = window.location.href } );
  }

  deleteTask(task: Task) {
    if (confirm('Are you sure you want to delete this User?')) {
      this.taskService.deleteTask(task);
    }
  }

}
