import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from 'le5le-store';
import { environment } from 'src/environments/environment';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private activateRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }

  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((params) => {
      localStorage.setItem("projectId", params.get('pid'));
      localStorage.setItem("tenantId", params.get('tid'))
      localStorage.setItem('token', params.get('sid'));
      this.userService.getUserInfo().subscribe(x => {
        console.log(x)
        if(x.state === 'true') {
          localStorage.setItem('user', JSON.stringify( x.user));
          this.router.navigateByUrl(`/workspace`);
        }
      });
     })
  }

}
