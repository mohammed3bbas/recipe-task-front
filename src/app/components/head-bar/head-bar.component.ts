
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent implements OnInit {

  @Output() headBarEvent = new EventEmitter<string>();
  // @Output('addButtonEvent') addButtonEvent = new EventEmitter<string>();

  
 

  constructor() { }

  ngOnInit(): void {
  }

  

  search(searchValue : string ) {
    console.log(searchValue);

    this.headBarEvent.emit(searchValue);
    
    console.log("finished")
  }


  // addFormView(){
  //   console.log("add form ")
  //   this.headBarEvent.emit("addFormViewMode")
  //   console.log("finished")

  // }


  

}
