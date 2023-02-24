import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentService } from './services/studentService';
import { EffectsModule } from '@ngrx/effects';

import { MetaReducer, StoreModule } from '@ngrx/store';
import { studentReducer } from './store/students.reducer';
import { StudentsEffect } from './store/students.effect';
import { debug } from './store/meta-reducer';

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({studentsState: studentReducer}),
    EffectsModule.forRoot([StudentsEffect]),
    StoreModule.forRoot((studentReducer) as any, { metaReducers })
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
