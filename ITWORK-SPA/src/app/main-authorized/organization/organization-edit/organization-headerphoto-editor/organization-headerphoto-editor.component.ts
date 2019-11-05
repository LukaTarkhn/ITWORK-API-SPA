import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { OrganizationHeadPhoto } from 'src/app/_models/organizationHeadPhoto';

@Component({
  selector: 'app-organization-headerphoto-editor',
  templateUrl: './organization-headerphoto-editor.component.html',
  styleUrls: ['./organization-headerphoto-editor.component.css']
})
export class OrganizationHeaderphotoEditorComponent implements OnInit {
  @Input() organizationPhotos: OrganizationHeadPhoto[];
  @Input() currentOrganizationId: number;
  @Output() getOrganizationHeadPhotoChange = new EventEmitter<string>();
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private authService: AuthService, private userService: UserService,
              private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/organizations/' + this.currentOrganizationId  + '/headphotos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: OrganizationHeadPhoto = JSON.parse(response);
        const organizationPhoto = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.organizationPhotos.push(organizationPhoto);
        this.getOrganizationHeadPhotoChange.emit(organizationPhoto.url);
      }
    };
  }
}
