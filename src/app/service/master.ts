import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { IAPIResponseModel, IPropertyType, ISite } from '../model/master';

@Injectable({
  providedIn: 'root'
})
export class Master {

constructor(private http: HttpClient) { }

getAllPropertyType():Observable<IAPIResponseModel> {
return this.http.get<IAPIResponseModel>(environment.API_URL + 'getCust')
}

savePropertyType(obj: IPropertyType): Observable<IAPIResponseModel> {
return this.http.post<IAPIResponseModel> (environment.API_URL + 'AddPropertyType',obj)
}
updatePropertyType(id: string, data: IPropertyType): Observable<IAPIResponseModel> {
return this.http.put<IAPIResponseModel> (environment.API_URL + `UpdatePropertyType/${id}`,data)
}

deletePropertyType(id: string) {
  return this.http.delete<IAPIResponseModel>(environment.API_URL + `DeletePropertyType/${id}`);
}


saveSite(obj: ISite): Observable<IAPIResponseModel> {
return this.http.post<IAPIResponseModel> (environment.API_URL + 'addSite',obj)
}

getAllSites():Observable<IAPIResponseModel> {
return this.http.get<IAPIResponseModel>(environment.API_URL + 'getSites')
}


updateSite(id: string,obj:ISite): Observable<IAPIResponseModel> {
return this.http.put<IAPIResponseModel> (environment.API_URL + `updateSite/${id}`,obj)
}

deleteSite(id: string) {
  return this.http.delete<IAPIResponseModel>(environment.API_URL + `deleteSite/${id}`);
} 

saveProperty(obj: ISite): Observable<IAPIResponseModel> {
return this.http.post<IAPIResponseModel> (environment.API_URL + 'addProperty',obj)
}


getAllProperty():Observable<IAPIResponseModel> {
return this.http.get<IAPIResponseModel>(environment.API_URL + 'getAllProperty')
}

getAllPropertyBySiteId(id:string):Observable<IAPIResponseModel> {
return this.http.get<IAPIResponseModel>(environment.API_URL + `getAllPropertyBySiteId/${id}`)
}


saveBooking(obj: ISite): Observable<IAPIResponseModel> {
return this.http.post<IAPIResponseModel> (environment.API_URL + 'saveBooking',obj)
}

getAllPropertyBookingBySiteId(id:string):Observable<IAPIResponseModel> {
return this.http.get<IAPIResponseModel>(environment.API_URL + `getAllPropertyBookingBySiteId/${id}`)
}



}
