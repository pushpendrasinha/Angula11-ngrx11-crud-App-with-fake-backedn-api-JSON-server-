import { Injectable } from "@angular/core";
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import  { Student } from '../models/studentModel';


const API_URL = "http://localhost:5000/students/";

@Injectable({
    providedIn: 'root'
})
export class StudentService {

    constructor (private http : HttpClient) { }

    getAll(): Observable<Student[]>{
        return this.http.get<Student[]>(API_URL);
        
    }

    add(student:Student): Observable<Student>{
        return this.http.post<Student>(API_URL, student);
    }

    getById(id:any): Observable<Student>{
        console.log(id +  " API called for getByID")
        return this.http.get<Student>(API_URL + id);
    }

    delete(id:any): Observable<Student>{
        return this.http.delete<Student>(API_URL + id);
    }

    update(student:Student): Observable<Student>{
        return this.http.put<Student>(API_URL + student.id, student);
    }



}