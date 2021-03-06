import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AdminComponent } from './admin.component'

import { AdminGuard } from '../state'

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'users', loadChildren: './users/users.module#UsersModule' },
      { path: 'roles', loadChildren: './roles/roles.module#RolesModule' },
      {
        path: 'controls',
        loadChildren: './controls/controls.module#ControlsModule',
      },
      { path: '', redirectTo: 'users', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
