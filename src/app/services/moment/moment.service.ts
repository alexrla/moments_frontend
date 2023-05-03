import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMoment } from 'src/app/interfaces/Moment';
import { IResponse } from 'src/app/interfaces/Response';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  private baseApiUrl = environment.baseApiUrl;
  private apiURL = `${this.baseApiUrl}api/moments`;

  constructor( private http: HttpClient ) { }

  createMoment(formData: FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiURL, formData);
  }

  getMoments(): Observable<IResponse<IMoment[]>> {
    return this.http.get<IResponse<IMoment[]>>(this.apiURL);
  }
}
