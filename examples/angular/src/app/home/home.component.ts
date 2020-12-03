import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute,) { }

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((params) => {
      console.log(params.get('token'));
     })
  }

}
