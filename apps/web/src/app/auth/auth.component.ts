import { Component, OnInit, OnDestroy } from '@angular/core'
import { Router } from '@angular/router'
import { AccountApi } from '@ngx-plus/ngx-sdk'
import { Store } from '@ngrx/store'
import { Subscription } from 'rxjs/Subscription'

import { NgxUiService } from '../ui'
import { UiActions } from '../state'

@Component({
  selector: 'ngx-auth',
  template: `
  <div class="container">
    <div class="row align-items-center justify-content-center">
      <div class="col-12 col-lg-6">
        <ngx-card [config]="cardConfig">
          <router-outlet></router-outlet>
        </ngx-card>
      </div>
    </div>
  </div>
  `,
  styles: [
    `
    .row {
      height: calc(100vh - 30px);
    }
    `,
  ],
})
export class AuthComponent implements OnInit, OnDestroy {
  public cardConfig
  private subscriptions: Subscription[] = new Array<Subscription>()

  constructor(
    public router: Router,
    private ui: NgxUiService,
    private store: Store<any>
  ) {}

  ngOnInit() {
    this.cardConfig = {
      headerImg: this.ui.authHeaderImg,
      nav: {
        title: 'Auth',
        items: [
          { name: 'Log In', link: '/auth/login', icon: 'fa fa-fw fa-sign-in' },
          {
            name: 'Register',
            link: '/auth/register',
            icon: 'fa fa-fw fa-registered',
          },
        ],
      },
      postHeaderImg: this.ui.postHeaderImg,
      preHeaderImg: this.ui.preHeaderImg,
    }
    // TODO: Consider moving Auth routes through a component without these components
    this.store.dispatch(new UiActions.DeactivateHeader())
    this.store.dispatch(new UiActions.DeactivateSidebar())
    this.store.dispatch(new UiActions.DeactivateFooter())
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) =>
      subscription.unsubscribe()
    )
  }
}
