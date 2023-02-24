import  { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { StudentService } from "../services/studentService";
import * as studentAction from "./students.action";
import { switchMap, map, catchError, mergeMap } from "rxjs/operators";
import { of } from "rxjs";
import { Student } from "../models/studentModel";

@Injectable()

export class StudentsEffect {
    constructor (private studentService: StudentService, private actions$ : Actions  ) {}

 getAllStudents = createEffect(() => this.actions$.pipe(
      ofType(studentAction.ShowAllAction),
      mergeMap(() => this.studentService.getAll()
      .pipe(
        map(students => studentAction.ShowAllSuccessAction({payload:students})
      ))     
    ),
  ));

  getStudentById = createEffect(() => this.actions$.pipe(
    ofType(studentAction.GetByIdStudent) ,
    map(action => action.id),
    switchMap(id =>
      this.studentService.getById(id).pipe(
        map((res) => studentAction.GetByIdSuccessAction({ payload: res })),
        catchError(error => of(studentAction.GetByIdFailedAction({error: error})))
      )
    )
  ));

  createStudent = createEffect(() => this.actions$.pipe(
    ofType(studentAction.CreateAction),
    map(action => action.payload),
    mergeMap(student =>
      this.studentService.add(student).pipe(
        map(res => studentAction.CreateSuccessAction({payload: res})),
        catchError(error => of(studentAction.CreateFailureAction({payload: error})))
      )
    )
  ),
  {dispatch:false}
  );

  deleteStudent = createEffect(() => this.actions$.pipe(
    ofType(studentAction.deleteRequestAction),
    switchMap(student => {
      return this.studentService.delete(student.id).pipe(
        map(res => {
          return studentAction.deleteSuccessAction({id: student.id})
        }),
        catchError(error => of(studentAction.deleteFailureAction({error})))
      )
    })
  ));

  updateStudent = createEffect(() => this.actions$.pipe(
    ofType(studentAction.updateRequestAction),
    switchMap(student => {
      return this.studentService.update(student.payload).pipe(
        map(payload => {
          return studentAction.updateSuccessAction({payload})
        }),
        catchError(error => of(studentAction.updateFailureAction({error})))
      )
    })
  ));


}
