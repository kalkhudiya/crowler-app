import { Component, EventEmitter, OnInit, ViewChild, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  @ViewChild('addForm') addForm: HTMLFormElement;
  @Output() addClient = new EventEmitter();

  formData: any = {};
  constructor(public activeModal: NgbActiveModal, private apiService: ApiService) { }

  ngOnInit() {
  }

  addNew() {
    this.apiService.post('/clients', this.formData).subscribe((resp: any) => {
      this.addClient.next(Object.assign(this.formData, {
        _id: resp.id
      }));
      this.activeModal.close('Close click');
    }, err => {
      err.error.errors.forEach(el => {
        this.addForm.form.controls[el.param].setErrors({'incorrect': true});
      });
    });
  }
}
