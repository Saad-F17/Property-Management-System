import { Component, inject } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IAPIResponseModel, IProperty, ISite } from '../../model/master';
import { Master } from '../../service/master';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking',
  imports: [AsyncPipe, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './booking.html',
  styleUrl: './booking.css',
  standalone: true
})
export class Booking {
  _id: string = '';
  propertyList: IProperty[] = [];
   bookingList: any[] = [];
  sites$: Observable<ISite[]>;
  masterSrv = inject(Master);





  constructor() {
    this.sites$ = this.masterSrv.getAllSites().pipe(
      map((res: IAPIResponseModel) => res.data)
    );
    this.initializeForm();
  }


  bookingForm: FormGroup = new FormGroup({});
  currentPropertyId: number = 0;

  initializeForm() {
    this.bookingForm = new FormGroup({

      bookingId: new FormControl(0),
      propertyId: new FormControl(this.currentPropertyId),
      bookingDate: new FormControl(''),
      bookingRate: new FormControl(0),
      totalAmount: new FormControl(0),
      custId: new FormControl(0),
      name: new FormControl(''),
      mobile: new FormControl(''),
      emailid: new FormControl(''),
      address: new FormControl(''),




    })


  }


checkIfPropertyId(propertyById:number){
const record= this.bookingList.find(m=>m.propertyId==propertyById);
console.log(record)
if(record!=undefined){
  return record
}else{
  return null;
}

}


  getProperty() {
    if (!this._id) return;
this.getBookingBySiteId();
    this.masterSrv.getAllPropertyBySiteId(this._id).subscribe((res: IAPIResponseModel) => {
      this.propertyList = res.data;
   
    });
  }


  getBookingBySiteId() {
    if (!this._id) return;

    this.masterSrv.getAllPropertyBookingBySiteId(this._id).subscribe((res: IAPIResponseModel) => {
      this.bookingList = res.data;
      console.log(this.propertyList);
    });
  }


  openModel(data: IProperty) {
    this.currentPropertyId = data.propertyById;
    this.initializeForm();
    const modal = document.getElementById('modal')
    if (modal) {

      modal.style.display = 'block'
    }
  }
  closeModel() {
    const modal = document.getElementById('modal')
    if (modal) {

      modal.style.display = 'none'
    }
  }



doBooking(){
      this.masterSrv.saveBooking(this.bookingForm.value).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("record saved")
    this.getBookingBySiteId();
             }
      else {
        alert(res.message)

      }
    })

}







}
