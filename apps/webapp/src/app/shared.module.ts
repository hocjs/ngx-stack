import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgxUiModule } from '@ngx-plus/ngx-ui'

const modules = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  NgxUiModule,
]

@NgModule({
  imports: [
    ...modules,
  ],
  exports: [
    ...modules,
  ],
})
export class SharedModule { }
