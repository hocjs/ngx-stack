import { get } from 'lodash'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Effect, Actions } from '@ngrx/effects'
import { Action, Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'
import { defer } from 'rxjs/observable/defer'
import { NgxUiService } from '../../ui'
import { AccountApi, LoopBackAuth } from '@ngx-plus/ngx-sdk'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/let'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/startWith'

import * as Auth from '../actions/auth.actions'
import * as Ui from '../actions/ui.actions'

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private store: Store<any>,
    private userApi: AccountApi,
    private ui: NgxUiService,
    private auth: LoopBackAuth,
    private router: Router,
  ) {}

  @Effect()
  public init$: Observable<Action> = defer(() => {
    const token = this.auth.getToken()
    if (!token.user) {
      return of(new Auth.CheckTokenFail(token))
    }
    return of(new Auth.CheckTokenSuccess(token))
  })

  @Effect()
  protected checkToken$: Observable<Action> = this.actions$
    .ofType(Auth.CHECK_TOKEN)
    .mergeMap((action: Auth.CheckToken) =>
      this.userApi
        .getCurrent()
        .map((response: any) => new Auth.CheckTokenSuccess(response))
        .catch((error: any) => of(new Auth.CheckTokenFail(error))),
    )

  @Effect({ dispatch: false })
  protected checkTokenSuccess = this.actions$
    .ofType(Auth.CHECK_TOKEN_SUCCESS)
    .do((action: Auth.CheckTokenSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Valid Token',
        body: `Your access token has been validated.`,
      }),
    )

  @Effect({ dispatch: false })
  protected checkTokenFail = this.actions$
    .ofType(Auth.CHECK_TOKEN_FAIL)
    .do((action: Auth.CheckTokenFail) => {
      this.router.navigate(['auth'])
      this.ui.alerts.notifyError({
        title: 'Invalid Token',
        body: 'Redirecting to Log In screen',
      })
    })

  @Effect()
  protected logIn$: Observable<Action> = this.actions$
    .ofType(Auth.LOG_IN)
    .do(() => this.store.dispatch(new Ui.ActivateLoader()))
    .mergeMap((action: Auth.LogIn) =>
      this.userApi
        .login(action.payload, 'user', true)
        .map((response: any) => new Auth.LogInSuccess(response))
        .catch((error: any) => of(new Auth.LogInFail(error))),
    )

  @Effect({ dispatch: false })
  protected logInSuccess = this.actions$
    .ofType(Auth.LOG_IN_SUCCESS)
    .do((action: Auth.LogInSuccess) => this.router.navigate(['dashboard']))
    .do((action: Auth.LogInSuccess) => {
      this.store.dispatch(new Auth.UpdateUser(action.payload.user.id))
      this.store.dispatch(new Ui.ActivateFooter())
      this.store.dispatch(new Ui.ActivateHeader())
      this.store.dispatch(new Ui.ActivateSidebar())
    })
    .do((action: Auth.LogInSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Log In Success',
        body: `You are logged in as ${action.payload.user.email}.`,
      }),
    )
    .do(() =>
      setTimeout(() => this.store.dispatch(new Ui.DeactivateLoader()), 1000),
    )

  @Effect({ dispatch: false })
  protected logInFail = this.actions$
    .ofType(Auth.LOG_IN_FAIL)
    .do((action: Auth.LogInFail) =>
      this.ui.alerts.notifyError({
        title: 'Log In Failure',
        body: `${action.payload.message}`,
      }),
    )
    .do(() =>
      setTimeout(() => this.store.dispatch(new Ui.DeactivateLoader()), 1000),
    )

  @Effect()
  protected register$: Observable<Action> = this.actions$
    .ofType(Auth.REGISTER)
    .mergeMap((action: Auth.Register) =>
      this.userApi
        .create(action.payload)
        .map((response: any) => new Auth.RegisterSuccess(response))
        .catch((error: any) => of(new Auth.RegisterFail(error))),
    )

  @Effect({ dispatch: false })
  protected registerSuccess = this.actions$
    .ofType(Auth.REGISTER_SUCCESS)
    .map((action: Auth.RegisterSuccess) => {
      this.router.navigate(['auth'])
      this.ui.alerts.notifySuccess({
        title: 'Registration Success',
        body: `You have registered successfully as ${action.payload.email}.`,
      })
    })

  @Effect({ dispatch: false })
  protected registerFail = this.actions$
    .ofType(Auth.REGISTER_FAIL)
    .map((action: Auth.RegisterFail) =>
      this.ui.alerts.notifyError({
        title: action.payload.name,
        body: action.payload.message,
      }),
    )

  @Effect()
  protected logOut$: Observable<Action> = this.actions$
    .ofType(Auth.LOG_OUT)
    .do(() => this.store.dispatch(new Ui.ActivateLoader()))
    .mergeMap((action: Auth.LogOut) =>
      this.userApi
        .logout()
        .map((response: any) => new Auth.LogOutSuccess(response))
        .catch((error: any) => of(new Auth.LogOutFail(error))),
    )

  @Effect({ dispatch: false })
  protected logOutSuccess = this.actions$
    .ofType(Auth.LOG_OUT_SUCCESS)
    .do((action: Auth.LogOutSuccess) => this.router.navigate(['auth']))
    .do((action: Auth.LogOutSuccess) =>
      this.ui.alerts.notifySuccess({
        title: 'Log Out Success',
        body: `You have logged out successfully.`,
      }),
    )
    .do(() =>
      setTimeout(() => this.store.dispatch(new Ui.DeactivateLoader()), 1000),
    )

  @Effect({ dispatch: false })
  protected logOutFail = this.actions$
    .ofType(Auth.LOG_OUT_FAIL)
    .do((action: Auth.LogOutFail) => this.router.navigate(['auth']))
    .do((action: Auth.LogOutFail) =>
      this.ui.alerts.notifySuccess({
        title: 'Log Out Success',
        body: `You have logged out successfully.`,
      }),
    )
    .do(() =>
      setTimeout(() => this.store.dispatch(new Ui.DeactivateLoader()), 1000),
    )

  @Effect()
  protected updateUser$: Observable<Action> = this.actions$
    .ofType(Auth.UPDATE_USER)
    .mergeMap((action: Auth.UpdateUser) =>
      this.userApi
        .findById(action.payload, { include: 'roles' })
        .map((response: any) => {
          this.auth.setUser(response)
          return new Auth.UpdateUserSuccess(response)
        })
        .catch((error: any) => of(new Auth.UpdateUserFail(error))),
    )
}
