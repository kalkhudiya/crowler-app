import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { DeleteClientComponent } from './delete-client/delete-client.component';
import { AddClientComponent } from './add-client/add-client.component';

@NgModule({
  declarations: [
    AppComponent,
    EditClientComponent,
    DeleteClientComponent,
    AddClientComponent
  ],
  imports: [
    FormsModule,
    NgbModule.forRoot(),
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents: [
    AddClientComponent,
    EditClientComponent,
    DeleteClientComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
