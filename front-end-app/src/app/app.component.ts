import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditClientComponent } from './edit-client/edit-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { AddClientComponent } from './add-client/add-client.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  clients: any = [];
  page = 1;
  totalRecord = 0;
  searchText = '';

  constructor(private apiService: ApiService, private modalService: NgbModal) {}
  
  ngOnInit() {
    this.apiService.get('/clients').subscribe((resp: any) => {
      this.clients = resp.result;
      this.totalRecord = resp.total;
    });
  }

  loadNextPage(e) {
    this.apiService.get('/clients?page=' + e).subscribe((resp: any) => {
      this.clients = resp.result;
    })
  }

  addClient(id) {
    const modalRef = this.modalService.open(AddClientComponent);
    modalRef.componentInstance.addClient.subscribe(obj => {
      this.addNewClient(obj);
    });
  }

  editClient(id) {
    const modalRef = this.modalService.open(EditClientComponent);
    modalRef.componentInstance.id = id;
  }

  deleteClient(id) {
    const modalRef = this.modalService.open(DeleteClientComponent);
    modalRef.componentInstance.id = id;
    modalRef.componentInstance.removeClient.subscribe(id => {
      this.removeClientFromList(id);
    });
  }

  removeClientFromList(id) {
    let i = this.clients.length;
    do {
      i--;
      if (this.clients[i]._id == id) {
        this.clients.splice(i, 1);
        i = -1;
      }
    } while(i > -1);
  }

  addNewClient(obj) {
    this.clients.unshift(obj);
  }

  applySearch() {
    this.apiService.get('/clients?q=' + this.searchText).subscribe((resp: any) => {
      this.clients = resp.result;
      if (this.searchText.length > 0) {
        this.totalRecord = 0;
      } else {
        this.totalRecord = resp.total;
      }
    });
  }
}
