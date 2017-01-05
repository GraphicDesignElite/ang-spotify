import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';


@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: `navbar.component.html`,
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean = true;
  isLoggedIn: boolean = false;
  userData:any;
  

  constructor(private _spotifyService:SpotifyService ){
      
  }


  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
  }
  logOut(){
    this._spotifyService.removeAuthorization();
    this.userData = null;
  }
  ngOnInit(){
      // subscribe to authorization check in service - updated when user logs in or out
      this._spotifyService.isAuthorized$.subscribe(
      authorized => {
          this.isLoggedIn = authorized;
          if(authorized){
            this._spotifyService.getUser().subscribe(results =>{ 
              this.userData = results;
              // return the user information to the nav
            })
          }
        }
      );
  }
  

}