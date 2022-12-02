import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePage } from './game.page';
import { GamePageRoutingModule } from './game-routing.module';
import { GameService } from './services/game.service';
import { MapService } from './services/map.service';
import { TileService } from './services/title.service';
import { ScreenService } from './services/screen.service';
import { ViewportService } from './services/viewport.service';
import { KeyboardService } from './services/keyboard.service';
import { PlayerService } from './services/player.service';
import { ScriptService } from './services/script.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,

  ],
  providers:[GameService, MapService,
    TileService,
    ScreenService,
    ViewportService,KeyboardService, PlayerService, ScriptService],
  declarations: [GamePage]
})
export class GamePageModule {}
