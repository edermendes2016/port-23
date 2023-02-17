import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { Routes, RouterModule } from '@angular/router';
import { PongGameComponent } from './pong-game/pong-game.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'pong', component: PongGameComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PongGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    [RouterModule.forRoot(routes)]
    
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

