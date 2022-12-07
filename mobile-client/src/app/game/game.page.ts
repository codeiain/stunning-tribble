import { Component, OnInit, Inject } from "@angular/core";
import { GameService } from "./services/game.service";
import { DOCUMENT } from '@angular/common';
import { KeyboardService } from "./services/keyboard.service";
import { PlayerService } from "./services/player.service";
import { TileService } from "./services/title.service";
import { ScriptService } from "./services/script.service";
import { ScreenService } from "./services/screen.service";
import { ViewportService } from "./services/viewport.service";
import { MapService } from "./services/map.service";
import { ModelService } from "./services/model.service";
import { NpcService } from "./services/npc.service";
import { create } from 'nipplejs';


@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public title!: string;
  size: number = 50;

  constructor(
    private gameService: GameService,
    @Inject(DOCUMENT) document: Document) {

  }

  ionViewDidEnter() {
    setTimeout(()=>{
      this.UILoaded()
    }, 300)
  }

  public UILoaded(){
    var canvas = document.getElementById('canvas') as HTMLCanvasElement;
    var container = document.getElementById('container') as HTMLElement;
    let joystick = document.getElementById('nipple') as HTMLCanvasElement;

    let containerWidth = Math.floor(container.clientWidth / 16) * 16;
    let containerHeight = Math.floor(container.clientHeight / 16) *16;

    canvas.width = containerWidth;
    canvas.height = containerHeight;

    joystick.width = containerWidth;
    joystick.height = containerHeight;

    this.gameService.setScreenAndViewport(canvas, canvas.width, canvas.height);
    this.gameService.LoadTiles();
    this.gameService.LoadModels();
    this.gameService.startGame(joystick);
  }


  ngOnInit(): void {

  }


}
