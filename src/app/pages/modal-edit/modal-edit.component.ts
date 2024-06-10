import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { TaskService } from '../../services/task/task.service';
import { DatePipe } from '@angular/common';
import { Task } from 'src/app/models/task';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent {

  editError:string="";
  reader = new FileReader();

  constructor(
    public taskService: TaskService,
    private datePipe: DatePipe,
    private formBuilder:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:Task)
    { }

    editForm=this.formBuilder.group({
      email:[this.data.email,[Validators.required,Validators.email]],
      password: [this.data.password,Validators.required],
      name: [this.data.name,Validators.required],
      image: [this.data.image],
      fechaRegistro: [this.datePipe.transform(new Date(), this.data.fechaRegistro)],
      profile: [this.data.profile,Validators.required]
    })

  get email(){
    return this.editForm.controls.email;
  }

  get password()
  {
    return this.editForm.controls.password;
  }

  get name()
  {
    return this.editForm.controls.name;
  }

  get image()
  {
    return this.editForm.controls.image;
  }

  get profile()
  {
    return this.editForm.controls.profile;
  }

  editTask()
  {
    if (this.editForm.valid)
    {
      this.editError = "";

      this.editForm.controls.image.setValue(this.reader.result as string);

      this.taskService.updateTask(this.editForm.value as Task);
    }
    else
    {
      this.editForm.markAllAsTouched();
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
