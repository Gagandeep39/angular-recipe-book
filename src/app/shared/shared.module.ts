import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownDirective } from './dropdown.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
  declarations: [
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective
  ],
  imports: [CommonModule],
  exports: [
    // Most shared modulesthat are declared are required to be exported as they are meant to be shared
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
    PlaceholderDirective,
    CommonModule
  ],
  // Group of components that will be created programmatically
  // Thesese compjents dont have a route or a selector
  // 'selector: [appPlaceholder]' is not a selctor (its a directive)
  entryComponents: [
    AlertComponent
  ]
})
export class SharedModule {}
