import { Injectable } from '@angular/core';
import { Task } from '../../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks!: Task[];
  localUsers = localStorage.getItem('angular17users');

  constructor() {
    // this.tasks = [
    //   {title: 'Create a Website', description: 'Create a wordpress website', hide: true},
    //   {title: 'write a document', description: 'Do other stuff', hide: true}
    // ];
  }

  getTasks()
  {
    if(this.localUsers === null)
    {
      this.tasks = [];
    }
    else
    {
      this.tasks = JSON.parse(this.localUsers);
    }

    return this.tasks;
  }

  addTask(task: Task)
  {
    this.tasks.push(task);

    let tasks = [];

    if(this.localUsers === null)
    {
      tasks = [];
      tasks.push(task);
      localStorage.setItem('angular17users', JSON.stringify(tasks));
    }
    else
    {
      tasks = JSON.parse(this.localUsers);
      tasks.push(task);
      localStorage.setItem('angular17users', JSON.stringify(tasks));
    }
  }

  deleteTask(task: Task)
  {
    for (let i = 0; i < this.tasks.length; i++)
    {
      if (task == this.tasks[i])
      {
        this.tasks.splice(i, 1);
        localStorage.setItem('angular17users', JSON.stringify(this.tasks));
      }
    }
  }

  updateTask(task: Task)
  { debugger;
    if(this.localUsers === null)
    {
      this.tasks = [];
    }
    else
    {
      const users = localStorage.getItem('angular17users');

      if (users != null)
      {
        this.tasks = JSON.parse(users);

        var foundIndex = this.tasks.findIndex(x => x.email == task.email);

        this.tasks[foundIndex] = task

        localStorage.setItem('angular17users', JSON.stringify(this.tasks));
      }
    }
  }
}
