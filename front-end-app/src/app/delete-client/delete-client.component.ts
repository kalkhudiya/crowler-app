import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-delete-client',
  templateUrl: './delete-client.component.html',
  styleUrls: ['./delete-client.component.css']
})
export class DeleteClientComponent implements OnInit {
  @Input() id;
  @Output() removeClient = new EventEmitter<string>();
  
  constructor(public activeModal: NgbActiveModal, private apiService: ApiService) { }

  ngOnInit() {
  }

  deleteCLient() {
    this.apiService.delete('/clients/' + this.id).subscribe(resp => {
      this.activeModal.close('Close click');
      this.removeClient.next(this.id);
    });
  }

}
