import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IAPIResponseModel, IProperty, IPropertyType, ISite } from '../../model/master';
import { map, Observable } from 'rxjs';
import { Master } from '../../service/master';
import { AsyncPipe, CommonModule } from '@angular/common';

@Component({
  selector: 'app-site',
  imports: [FormsModule, AsyncPipe, CommonModule, ReactiveFormsModule],
  templateUrl: './site.html',
  styleUrl: './site.css'
})

export class Site implements OnInit {

  propertyForm: FormGroup = new FormGroup({});


  @ViewChild('propertymodel') model: ElementRef | undefined;


  ngOnInit(): void {
    this.getGridData()
  }
  isEditMode: boolean = false;
  selectedId: string | null = null;
  currentSiteId: string = "0";
  isFormView = signal<boolean>(false);
  masterSrv = inject(Master)
  gridData: ISite[] = []
  propertyList: IProperty[] = []
  toggleView() {
    this.isFormView.set(!this.isFormView())
  }


  initializeForm() {
    this.propertyForm = new FormGroup({
      propertyById: new FormControl(0),
      propertyNo: new FormControl(''),
      facing: new FormControl(''),
      totalArea: new FormControl(''),
      rate: new FormControl(''),
      siteId: new FormControl(this.currentSiteId)

    })
  }


  formObj: ISite = new ISite()



  getGridData() {
    this.masterSrv.getAllSites().subscribe((res: IAPIResponseModel) => {
      this.gridData = res.data;
    })

  }


  getProperties() {
    this.masterSrv.getAllProperty().subscribe((res: IAPIResponseModel) => {
      this.propertyList = res.data;
     console.log(this.propertyList);

    })
 
  }


  onSave() {
    this.masterSrv.saveSite(this.formObj).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("record saved")
        this.getGridData();
        this.toggleView();
      }
      else {
        alert(res.message)

      }
    })

  }

  
  onSaveProperty() {
    this.masterSrv.saveProperty(this.propertyForm.value).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("record saved")
      this.getProperties();
             }
      else {
        alert(res.message)

      }
    })

  }

  onEdit(data: ISite) {
    this.isEditMode = true;
    this.selectedId = data._id || null;
    this.formObj = data;
    this.toggleView()
  }

  onUpdate() {
    if (!this.selectedId) return;
    this.masterSrv.updateSite(this.selectedId, this.formObj).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("record Updated")
        this.getGridData();
        this.isEditMode = false;
        this.toggleView();

      }
      else {
        alert(res.message)

      }
    })


  }
  onDelete(data: ISite) {
    if (!data._id) return;

    this.masterSrv.deleteSite(data._id).subscribe((res: IAPIResponseModel) => {
      if (res.result) {
        alert("record Deleted");
        this.getGridData();

        this.isEditMode = false;
      } else {
        alert(res.message);
      }
    });
  }


  openModel(data: ISite) {
     this.currentSiteId = data._id!;
       this.initializeForm()
       this.getProperties()
    if (this.model) {
    
      this.model.nativeElement.style.display = 'block'
    }
  }
  closeModel() {
    if (this.model) {
      this.model.nativeElement.style.display = 'none'
    }
  }

  propertyTypes$: Observable<IPropertyType[]> = new Observable<IPropertyType[]>
  constructor() {
    this.initializeForm(); 
    this.propertyTypes$ = this.masterSrv.getAllPropertyType().pipe(
      map((item: IAPIResponseModel) => {
        return item.data
      })
    );
  }
}