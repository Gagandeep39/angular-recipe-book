import { FormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: 'auth', component: AuthComponent }
]

@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule
  ]
})
export class AuthModule {}
