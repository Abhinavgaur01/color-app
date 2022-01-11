import { Component, OnInit, TemplateRef } from '@angular/core';
import { from, Subject } from 'rxjs';
import { ColorService } from './service/color.service'
import { debounceTime, distinctUntilChanged } from 'rxjs/operators'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public colorList;
  public searchText: string;

  public searchTerm: Subject<string> = new Subject();

  public isNoResultFound:boolean = false;

  constructor(
    private colorService: ColorService,
  ) { }


  ngOnInit() {
    this.colorService.getAllColors();
    this.searchTerm.pipe(
      debounceTime(500),
      distinctUntilChanged()
    )
      .subscribe((searchTerm: string) => {
        if (searchTerm && searchTerm.length > 2) {
          this.colorList = this.colorService.getColorsBySearchTerm(searchTerm);
          if(!this.colorList || this.colorList.length < 1){
            this.isNoResultFound = true;
          }
        }
        else{
          this.colorList = null;
        }
        this.isNoResultFound = false;
        console.log(this.colorList);
      });
  }

  onSearch(term: string) {
      this.searchTerm.next(term);
  }


}
