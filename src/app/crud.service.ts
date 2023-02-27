import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { EmployeeModel } from './employee-model';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  add(EmployeeModel:any) {
    return this.httpClient.post<EmployeeModel>(this.apiServer + '/Employees/',EmployeeModel) .subscribe({
      next: (res) => {
      },
      error: (e) => console.error(e)
    });
  }  



  getAll(){
    return this.httpClient.get<EmployeeModel[]>(this.apiServer + '/Employees/')
  }

  updateinservice(id:any, EmployeeModel:any){
    return this.httpClient.put<EmployeeModel>(this.apiServer + '/Employees/' + id, EmployeeModel).subscribe({
      next: (res) => {
      },
      error: (e) => console.error(e)
    });
    
  }

  delete(id:Number){
    console.log(id)
    return this.httpClient.delete<EmployeeModel>(this.apiServer + '/Employees/' + id).subscribe({
      next: (res) => {
      },
      error: (e) => console.error(e)
    });
    
  }
  
}