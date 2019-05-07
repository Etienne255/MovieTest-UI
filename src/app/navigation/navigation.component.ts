import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MenuItem } from '../models/menu-item';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  public MenuItems: Array<MenuItem> = [] as Array<MenuItem>;
  public selectedMenu: MenuItem = {} as MenuItem;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
    this.getMenuData();
  }

  getMenuData() {
    this.MenuItems.push({
        id: 'Tables',
        description: 'My link 2',
        icon: 'fa-server',
        routerLink: '/movies-table',
        name: 'Movie table',
        parentId: 'root',
    });
    this.MenuItems.push({
        id: 'rankings',
        description: 'My link 2',
        icon: 'fa-server',
        routerLink: '/movies-rankings',
        name: 'Movie rankings',
        parentId: 'root',
        });
    this.MenuItems.push({
        id: 'link3',
        description: 'My link 3',
        icon: 'fa-server',
        routerLink: '',
        name: 'Link 3',
        parentId: 'root',
        });
  }

}
