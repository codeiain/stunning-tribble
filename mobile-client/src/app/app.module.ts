import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule as MapApiModule } from 'src/api/map/api.module';
import { ApiModule as PlayerApiModule } from 'src/api/player/api.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    MapApiModule.forRoot({rootUrl: 'https://8000-codeiain-stunningtribbl-3ouo8f6hgvq.ws-eu77.gitpod.io'}),
    PlayerApiModule.forRoot({rootUrl: 'https://8010-codeiain-stunningtribbl-9xgsuvsavzo.ws-eu78.gitpod.io/'})
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
