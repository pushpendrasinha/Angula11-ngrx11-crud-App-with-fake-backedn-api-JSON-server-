import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/studentService';
import { Student } from 'src/app/models/studentModel';
import { Subscription } from 'rxjs';

// Importing store 
import { Store, select } from '@ngrx/store';
import * as studentAction from '../../store/students.action';
import * as selectors from '../../store/students.selector';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {

  constructor(private studentService: StudentService, private router: Router, private route: ActivatedRoute, private store: Store) { }

  Student: Student;
  id: any;
  subscription: Subscription;
  isDone = false;

  ngOnInit(): void {
    // console.log(this.store);
    // this.id = this.route.snapshot.params['id'];

    this.Student = {
      firstname: '',
      middlename: '',
      lastname: '',
      email: '',
      mobile: '',
      address: '',
      city: '',
      state: '',
    }

    // this.subscription = this.studentService.getById(this.id).subscribe( (res) => {
    //   this.Student = res;
    //   console.warn(res);
    // });

    this.route.params.subscribe(params => {
      this.store.dispatch(studentAction.GetByIdStudent({ id: Number.parseInt(params.id) }));
    });
    this.subscription = this.store.select(selectors.getSelectedStudent).subscribe(res => {
      if (res != null) {
        this.Student = { ...res };
      }
    });
  }

  AddorUpdate() {
    if (this.Student.id == null || undefined) {
      this.addStudent(this.Student);
      if (this.isDone == true) {
        this.router.navigate(["/students/list"]);
      }
    }
    else {
      this.updateStudent(this.Student);
      if (this.isDone == true) {
        this.router.navigate(["/students/list"]);
      }
    }
  }

  updateStudent(Student: Student) {
    // this.studentService.update( this.Student).subscribe( (res) => {
    //   console.warn(this.Student);
    //   this.router.navigate(["/students/list"]);
    // });
    this.store.dispatch(studentAction.updateRequestAction({ payload: Student }));
    this.isDone = true;
  }

  addStudent(Student: Student) {
    //   this.studentService.add(Student).subscribe( (res)=> {
    //     console.log(Student);
    //     this.router.navigate(["/students/list"])
    //   });
    this.store.dispatch(studentAction.CreateAction({ payload: Student }));
    this.isDone = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
