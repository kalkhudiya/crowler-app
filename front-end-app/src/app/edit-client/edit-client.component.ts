import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  @ViewChild('editForm') editForm: HTMLFormElement;
  @Input() id;
  formData: any = {};
  constructor(public activeModal: NgbActiveModal, private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.get('/clients/' + this.id).subscribe((resp: any) => {
      this.formData = resp;
    });
  }

  editClient() {
    this.apiService.put('/clients/' + this.id, this.formData).subscribe((resp: any) => {
      this.activeModal.close('Close click');
    }, err => {
      err.error.errors.forEach(el => {
        this.editForm.form.controls[el.param].setErrors({'incorrect': true});
      });
    });
  }
}
