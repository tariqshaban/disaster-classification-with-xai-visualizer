import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { of, timeout } from 'rxjs';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ApiEndpointService } from '../services/api-endpoint.service';

@Component({
  selector: 'app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.css', '../app.component.css']
})
export class ClassificationComponent implements OnInit {
  @ViewChild('uploadForm', { static: false }) uploadForm: any;

  uploadStatus = 'Drop image here'
  timeout = false;
  isHTTPRequesting: boolean = false;
  selectedImage: String = '';
  classificationResult: String = '';
  original: String = '';
  lime: String = '';
  gradCam: String = '';
  gradCamPlusPlus: String = '';

  constructor(private http: HttpClient, private _apiEndpointService: ApiEndpointService) { }

  ngOnInit(): void { }

  onUploadClick() {
    this.uploadForm.nativeElement.click();
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  onDropSuccess(event: any) {
    event.preventDefault();

    this.onFileChange(event.dataTransfer.files);
  }

  onChange(event: any) {
    this.onFileChange(event.target.files);
  }

  private onFileChange(files: any) {
    if (files.length) {
      this.issueRequest(files[0])
    }
  }

  issueRequest(file: any) {
    this.timeout = false;
    this.isHTTPRequesting = true;
    this.uploadStatus = 'Processing...'

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.original = reader.result as any;
    };

    this.classificationResult = '';
    this.lime = '';
    this.gradCam = '';
    this.gradCamPlusPlus = '';

    var url = this._apiEndpointService.classificationEndpoint;

    var formData: FormData = new FormData();
    formData.append('file', file, file.name);

    this.http.post<any>(url, formData)
      .pipe(timeout(100 * 1000))
      .subscribe({
        next: (data) => {
          this.uploadForm.nativeElement.value = '';

          this.classificationResult = data.classification;
          this.lime = 'data:image/jpeg;base64,' + data.lime;
          this.gradCam = 'data:image/jpeg;base64,' + data.grad_cam;
          this.gradCamPlusPlus = 'data:image/jpeg;base64,' + data.grad_cam_plus_plus;

          console.log(data);

          this.isHTTPRequesting = false;
          this.uploadStatus = 'Drop image here'
        },
        error: () => {
          this.uploadForm.nativeElement.value = '';

          this.classificationResult = '';

          this.timeout = true;
          this.isHTTPRequesting = false;
          this.uploadStatus = 'Drop image here'

          return of(null);
        }
      })
  }

  public getColor(element: any): string {
    console.log(element.id)

    if (this.classificationResult == element.attributes.id) {
      return 'primary'
    }

    return '';
  }
}
