import { Component, OnInit, OnDestroy } from '@angular/core'
import { DashCard, NgxUiService, NavItem } from '../../ui'
import { AccountApi, RoleApi, ACLApi } from '@ngx-plus/ngx-sdk'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import 'rxjs/add/operator/map'

@Component({
  selector: 'home-dashboard',
  template: `
    <ngx-dash-cards [items]="dashCards"></ngx-dash-cards>
  `,
})
export class HomeDashboardComponent implements OnInit, OnDestroy {
  public dashCards: DashCard[]
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    private ui: NgxUiService,
    private users: AccountApi,
    private roles: RoleApi,
    private controls: ACLApi
  ) {}

  ngOnInit() {
    this.setDashCards()
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    )
  }

  setDashCards() {
    this.dashCards = [
      // {
      //   name: 'Users',
      //   icon: 'users',
      //   data: this.users.count().map(c => c.count),
      //   link: '/admin/users',
      //   class: 'primary',
      // },
      // {
      //   name: 'Roles',
      //   icon: 'tags',
      //   data: this.roles.count().map(c => c.count),
      //   link: '/admin/roles',
      //   class: 'warning',
      // },
      // {
      //   name: 'Controls',
      //   icon: 'ban',
      //   data: this.controls.count().map(c => c.count),
      //   link: '/admin/controls',
      //   class: 'danger',
      // }
    ]
  }
}
