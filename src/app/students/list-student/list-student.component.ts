import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { StudentService } from 'src/app/services/studentService';
import  { Student } from '../../models/studentModel';
import { Router } from '@angular/router';

// Importing store 
import { Store, select } from '@ngrx/store';
import  * as studentAction from '../../store/students.action';
import  * as studentSelector from '../../store/students.selector';

@Component({
  selector: 'app-list-student',
  templateUrl: './list-student.component.html',
  styleUrls: ['./list-student.component.css']
})
export class ListStudentComponent implements OnInit {

  constructor(private studentService : StudentService, private router: Router, private store: Store) { }

  // subscription : Subscription;
  Students : Observable<Student[]>;
  getStudentList: Subscription;

  ngOnInit(): void {
    // this.subscription = this.studentService.getAll().subscribe( (res) => {
    //   this.Students = res;
    //   console.log(this.Students);
    // });
    // console.log(this.store)
    this.store.dispatch(studentAction.ShowAllAction());
    this.Students  =  this.store.select(studentSelector.getStudents);

    // console.log(this.Students)
  }

  viewStudent(id:any){
    this.router.navigate(['students/view' , id]);
  }

  deleteStudent(id:any){
    // this.studentService.delete(id).subscribe( (res) =>{
    //   console.warn(res);
    //   this.ngOnInit();
    // });
    this.store.dispatch(studentAction.deleteRequestAction({id}));
  }

  updateStudent(id:any){
    this.router.navigate(['students/edit' , id]);
  }

  // ngOnDestroy(){
  //   this.subscription.unsubscribe();
  // }

}
