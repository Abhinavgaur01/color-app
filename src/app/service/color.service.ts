import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import {IColorViewModel} from '../models/colors.interface'

@Injectable()

export class ColorService {

  private colorList:IColorViewModel[];
  constructor(
    private http: HttpClient,
  ){}

  getAllColors() : void{
    this.http.get("https://gist.githubusercontent.com/jennyknuth/e2d9ee930303d5a5fe8862c6e31819c5/raw/e4ec571a9b49ddc5c1789a4e7f3c67ec5271398e/colors.json")
    .subscribe((data:IColorViewModel[]) =>{
      this.colorList = data;
    })
  }

  getColorsBySearchTerm(term:string):IColorViewModel[] {
    return this.colorList.filter(color => color.name.toLowerCase().includes(term.toLowerCase() ) );
  }
}
