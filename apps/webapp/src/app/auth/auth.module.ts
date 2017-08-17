import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared.module'

import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AuthComponent } from './auth.component'

import { AuthRoutingModule } from './auth.routing'

const components = [
  AuthComponent,
  LoginComponent,
  RegisterComponent,
]

@NgModule({
  imports: [
    RouterModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [
    ...components,
  ],
  exports: [
    ...components,
  ],
})
export class AuthModule { }
