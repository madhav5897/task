import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CrudService } from './crud.service';
import { EmployeeModel } from './employee-model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myapp';

  editemployee:boolean=false;
  noteditemployee:boolean=true;
  allfilled:boolean=false;

  firstname:string;
  lastname:string;
  email:string;
  company:string;
  birthday:string;
  phone:string;
  gender:string;
  password:string;
  conform:string;

  firstnamerequired:boolean=false;
  lastnamerequired:boolean=false;
  emailrequired:boolean=false;
  companyrequired:boolean=false;
  birthdayrequired:boolean=false;
  phonerequired:boolean=false;
  genderrequired:boolean=false;
  passwordrequired:boolean=false;
  conformrequired:boolean=false;


  employeeModelObj:EmployeeModel;
  employeeForm = new FormGroup ({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email:new FormControl(),
    company:new FormControl(),
    birthday:new FormControl(),
    phone:new FormControl(),
    gender:new FormControl(),
    password:new FormControl(),
    conform:new FormControl()
  });

  employeeData:any=[];
  singleEmployeeData:any;
  idselected:any;

constructor(  public crudService:CrudService){

   this.getAll();
}

ngOnInIt(){
}


submitForm(){

  this.validate()
  console.log(this.allfilled)
  if(this.allfilled){
  this.crudService.add(this.employeeForm.value)
this.getAll();
this.employeeForm.reset()
  }

}
validate(){
  if(this.firstname==undefined){this.firstnamerequired=true}else{this.firstnamerequired=false};
  if(this.lastname==undefined){this.lastnamerequired=true}else{this.lastnamerequired=false};
  if(this.email==undefined){this.emailrequired=true}else{this.emailrequired=false};
  if(this.phone==undefined){this.phonerequired=true}else{this.phonerequired=false};
  if(this.company==undefined){this.companyrequired=true}else{this.companyrequired=false};
  if(this.birthday==undefined){this.birthdayrequired=true}else{this.birthdayrequired=false};
  if(this.password==undefined){this.passwordrequired=true}else{this.passwordrequired=false};
  if(this.conform==undefined){this.conformrequired=true}else{this.conformrequired=false};

  if(this.firstnamerequired==true ||this.lastnamerequired==true || this.emailrequired==true
    || this.phonerequired==true || this.companyrequired==true || this.birthdayrequired==true
    || this.genderrequired==true || this.passwordrequired==true || this.conformrequired==true)
  {
    this.allfilled=false;
  }
  else{
    this.allfilled=true;
  }
}

getAll(){
  this.crudService.getAll().subscribe(
    response => {
      this.employeeData=response;
      console.log(this.employeeData)
    },
    error => {
      console.log(error);
    });
}

cancel(){
  this.firstname="";
  this.lastname="";
  this.email="";
  this.company='';
  this.birthday="";
  this.phone="";
  this.password="";
  this.conform="";

}

edit(employee:any){
  this.editemployee=true;
  this.noteditemployee=false;

   this.firstname=employee.firstname;
  this.lastname=employee.lastname;
  this.email=employee.email;
  this.company=employee.company;
  this.phone=employee.phone;
  this.birthday=employee.birthday;
  this.gender=employee.gender;
  this.password=employee.password
}

update( ){
   this.crudService.updateinservice(this.idselected,this.employeeForm.value)
   this.getAll();
   this.editemployee=false;
   this.noteditemployee=true;
}

delete(employee:any){
  this.crudService.delete(employee.id);
  this.getAll()
}

}
