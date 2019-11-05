import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { OrganizationPhoto } from 'src/app/_models/organizationPhoto';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-organization-photo-editor',
  templateUrl: './organization-photo-editor.component.html',
  styleUrls: ['./organization-photo-editor.component.css']
})
  export class OrganizationPhotoEditorComponent implements OnInit {
    @Input() organizationPhotos: OrganizationPhoto[];
    @Input() currentOrganizationId: number;
    @Output() getOrganizationPhotoChange = new EventEmitter<string>();
    uploader: FileUploader;
    hasBaseDropZoneOver = false;
    baseUrl = environment.apiUrl;
    currentMainPhoto: OrganizationPhoto;

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
        url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/organizations/' + this.currentOrganizationId  + '/photos',
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
          const res: OrganizationPhoto = JSON.parse(response);
          const organizationPhoto = {
            id: res.id,
            url: res.url,
            dateAdded: res.dateAdded,
            description: res.description,
            isMain: res.isMain
          };
          this.organizationPhotos.push(organizationPhoto);
          this.getOrganizationPhotoChange.emit(organizationPhoto.url);
        }
      };
    }
}
