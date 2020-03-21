// import { AuthModule } from './auth/auth.module';
import { CoreModule } from './services/core.module';
import { SharedModule } from './shared/shared.module';
// import { ShoppingListModule } from './shopping-list/shopping-list.module';
// import { RecipesModule } from './recipes/recipes.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Not needed anymore as they are imported in feature modules
    // FormsModule,
    // ReactiveFormsModule,
    HttpClientModule,
    // Bundled all recipes related components in a mobule and imported it here
    // RecipesModule, To implement lazy loading
    // ShoppingListModule,
    // Reqired for AlertComponent in Auth
    SharedModule,
    // undles all app services
    // Here only proves the interceptor service
    CoreModule,
    // AuthModule
  ],
  providers: [
    // Provided by core moduel now
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  // Group of components that will be created programmatically
  // Thesese compjents dont have a route or a selector
  // 'selector: [appPlaceholder]' is not a selctor (its a directive)
  entryComponents: [
    AlertComponent
  ]
})
export class AppModule {}
