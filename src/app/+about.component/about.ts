import { Component } from '@angular/core'
import { RouterConfig } from '@angular/router'

/**
 * This class represents the lazy loaded AboutComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'about',
  templateUrl: 'about.html',
  styleUrls: ['about.css']
})
export class AboutComponent {}

export const ABOUT_ROUTES: RouterConfig = [
  {
    path: 'about',
    component: AboutComponent
  }
];
