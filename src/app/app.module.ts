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
})
export class AppModule {}

// .FireBase contains data related to hosting in firebase
// It can be deleted from the repository later on

// _config.yml contains data related to Github page theme
// Its not being used because we are depoying our github project there so it can be removed

// 404.html is a workaorund for github pages
// Added "src/404.html" in angular.json
// Github is static host and doesnt allow us to firectly send index.html incase of error
// A workaroud is to keep an index.html renamed as 404.html to fix the error while routing
// Error was that when we manually add a path in addressbar, the server gives us 404 error
// With work around it will give us index.html file
