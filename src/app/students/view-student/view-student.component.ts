import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Student } from 'src/app/models/studentModel';
import { StudentService } from 'src/app/services/studentService';

// Importing store 
import { Store, select } from '@ngrx/store';
import  * as studentAction from '../../store/students.action';
import * as selectors from '../../store/students.selector';


@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {

  constructor(private studentService : StudentService, private route: ActivatedRoute, private router: Router, private store: Store ) { }
  subscription : Subscription;
  student: any;

  ngOnInit(): void {
    // this.id = this.route.snapshot.params['id'];
    // this.subscription = this.studentService.getById(this.id).subscribe( (res:any) => {
    //   this.student = res;
    //   console.warn(this.student);
    // });

    this.route.params.subscribe(params => {
      this.store.dispatch(studentAction.GetByIdStudent({id: Number.parseInt(params.id)  }));
    });
    this.subscription = this.store.select(selectors.getSelectedStudent).subscribe(res => {
      this.student = res;
      // console.log(this.student)
    });
    
  }

  updateStudent(id:any){
    this.router.navigate(['students/edit', id]);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
