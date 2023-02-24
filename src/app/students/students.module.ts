import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListStudentComponent } from './list-student/list-student.component';
import { AddStudentComponent } from './add-student/add-student.component';
import { ViewStudentComponent } from './view-student/view-student.component';
import { RouterModule,Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { studentReducer } from '../store/students.reducer';
import { StudentsEffect } from '../store/students.effect';
import { EffectsModule } from "@ngrx/effects";

const routes: Routes = [
  { path: " ", redirectTo:"list", pathMatch: 'full' },
  { path: 'list', component: ListStudentComponent },
  { path: 'add', component: AddStudentComponent },
  { path: 'view/:id',  component: ViewStudentComponent },
  { path: 'edit/:id',  component: AddStudentComponent }
]

@NgModule({
  declarations: [ListStudentComponent, AddStudentComponent, ViewStudentComponent],
  imports: [
    CommonModule,
    RouterModule.forChild (routes),
    FormsModule,
    StoreModule.forFeature('studentsState', studentReducer),
    EffectsModule.forFeature([StudentsEffect]),
  ]
})
export class StudentsModule { }
