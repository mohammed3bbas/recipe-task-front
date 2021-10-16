
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AppComponent } from './../../app.component';

@Component({
  selector: 'app-head-bar',
  templateUrl: './head-bar.component.html',
  styleUrls: ['./head-bar.component.css']
})
export class HeadBarComponent implements OnInit {

  @Output('searchBoxEvent') searchBoxEvent = new EventEmitter<string>();

  
 

  constructor() { }

  ngOnInit(): void {
  }

  

  search(searchValue : string ) {
    console.log(searchValue);

    this.searchBoxEvent.emit(searchValue);
    
    console.log("finished")

  

  }


  

}
