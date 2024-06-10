import { Component } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { TaskService } from '../../services/task/task.service';
import { DatePipe } from '@angular/common';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-modal-add',
  templateUrl: './modal-add.component.html',
  styleUrls: ['./modal-add.component.css']
})
export class ModalAddComponent {

  addError:string="";
  reader = new FileReader();

  constructor(
    public taskService: TaskService,
    private datePipe: DatePipe,
    private formBuilder:FormBuilder){ }

  addForm=this.formBuilder.group({
    email:['',[Validators.required,Validators.email]],
    password: ['',Validators.required],
    name: ['',Validators.required],
    image: [''],
    fechaRegistro: [this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')],
    profile: ['',Validators.required]
  })

  get email(){
    return this.addForm.controls.email;
  }

  get password()
  {
    return this.addForm.controls.password;
  }

  get name()
  {
    return this.addForm.controls.name;
  }

  get image()
  {
    return this.addForm.controls.image;
  }

  get profile()
  {
    return this.addForm.controls.profile;
  }

  addTask()
  {
    if (this.addForm.valid)
    {
      this.addError = "";

      this.addForm.controls.image.setValue(this.reader.result as string);

      this.taskService.addTask(this.addForm.value as Task);
    }
    else
    {
      this.addForm.markAllAsTouched();
      alert("Error al ingresar los datos.");
    }
  }

  onFileSelected(event:any)
  {
    const file = event.target.files[0];
    this.reader = new FileReader();
    this.reader.readAsDataURL(file);
  }
}
