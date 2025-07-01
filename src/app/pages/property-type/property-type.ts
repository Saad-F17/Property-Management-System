import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Master } from '../../service/master';
import { IAPIResponseModel, IPropertyType } from '../../model/master';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-property-type',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './property-type.html',
  styleUrl: './property-type.css'
})
export class PropertyType implements OnInit{
masterSrv = inject (Master)
gridData: IPropertyType[]=[];
 isEditMode: boolean = false;
selectedId: string | null = null;

 constructor() {
this.initializeForm()
 }

ngOnInit(): void {
  this.getGridData()

}

getGridData() {
this.masterSrv.getAllPropertyType().subscribe((res:IAPIResponseModel)=>{

this.gridData=res.data; 
 
})
}

onSave(){
this.masterSrv.savePropertyType(this.form.value).subscribe((res:IAPIResponseModel)=>{
if(res.result){
  this.getGridData();
  
}else{
  alert(res.message)
}
})
}
onEdit(item: IPropertyType) {
  this.isEditMode = true;
  this.selectedId = item._id || null;

  this.form.patchValue({
    propertTypeId: item.propertyTypeId,
    propertyType: item.propertyType
  });
}

onUpdate() {
  if (!this.selectedId) return;

  this.masterSrv.updatePropertyType(this.selectedId, this.form.value).subscribe(res => {
    if (res.result) {
      alert("Record updated");
      this.getGridData();
      this.isEditMode = false;
      this.form.reset({ propertTypeId: 0, propertyType: '' });
    } else {
      alert(res.message);
    }
  });
}

onDelete(id: string) {
  if (confirm('Are you sure you want to delete this property?')) {
    this.masterSrv.deletePropertyType(id).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert('Property deleted successfully');
        this.getGridData();
        this.initializeForm();
            this.isEditMode = false;
      } else {
        alert(res.message);
      }
    });
  }
}



form: FormGroup = new FormGroup({
})
initializeForm(item?:IPropertyType) {
this.form = new FormGroup({
propertTypeId: new FormControl<number>(item? item.propertyTypeId:0),
propertyType: new FormControl<string>(item? item.propertyType:'',[Validators.required,Validators.minLength(5)])
})

}


}  
