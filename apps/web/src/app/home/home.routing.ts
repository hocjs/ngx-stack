import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './home.component'

import { AuthGuard } from '../state'

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'projects',
        loadChildren: './projects/projects.module#ProjectsModule',
      },
      {
        path: 'storage',
        loadChildren: './storage/storage.module#StorageModule',
      },
      { path: '', redirectTo: 'projects', pathMatch: 'full' },
    ],
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
