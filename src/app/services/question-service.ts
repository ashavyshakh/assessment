import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class QuestionService {
constructor(private http: HttpClient) {

}

fetchQuestionsService(): Observable<any> {
    /*----------mock test--------------------*/
    const url = './../assets/mock.json';
    return this.http.get(`${url}`);

    /*----------end mock test--------------------*/

}

}




