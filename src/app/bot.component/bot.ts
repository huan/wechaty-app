import { Component } from '@angular/core'
import { RouterConfig } from '@angular/router'

@Component({
  moduleId: module.id,
  selector: 'wechaty bot',
  templateUrl: 'bot.html',
  styleUrls: ['bot.css']
})
export class BotComponent {}


export const BotRoutes: RouterConfig = [
  {
    path: 'bot/:id',
    component: BotComponent
  }
];
