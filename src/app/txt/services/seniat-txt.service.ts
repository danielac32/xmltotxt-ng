import { Injectable , inject} from '@angular/core';
import { Observable ,throwError} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development'
import {ListResponse,ResponseData} from '../interface/SeniatTxt-interface'

@Injectable({
  providedIn: 'root'
})
export class SeniatTxtService {
 private baseUrl = environment.apiUrl;//'http://localhost:4000';
 private httpClient=inject(HttpClient);

  constructor() { }


  list(): Observable<any> {
     return this.httpClient.get<any>(`${ this.baseUrl }/txtlist`);
  }

  listProcess(): Observable<any> {
     return this.httpClient.get<any>(`${ this.baseUrl }/txtlistProcess`);
  }

  listError(): Observable<any> {
     return this.httpClient.get<any>(`${ this.baseUrl }/txtlistError`);
  }


  delete():Observable<any>{
      return this.httpClient.post<any>(`${ this.baseUrl }/xmldelete`,{});
  } 


  process():Observable<ResponseData>{
      return this.httpClient.post<ResponseData>(`${ this.baseUrl }/process`,{});
  } 


  downloadFile(): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/download`, { responseType: 'blob' });
  }

  
}
