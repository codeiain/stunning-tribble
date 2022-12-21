import { Component, OnInit, Inject } from "@angular/core";
import { GameService } from "./services/game.service";
import { GameEngine } from "./services/gameEngine/game.service";

import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage  {
  public title!: string;
  size: number = 50;

  constructor(
    private gameService: GameService,
    private gameEngine: GameEngine,
    @Inject(DOCUMENT) document: Document) {
  }

  ionViewDidEnter() {
    setTimeout(()=>{
      this.UILoaded()
    }, 300)
  }

  public UILoaded(){
    let canvas = document.getElementById('canvas') as HTMLCanvasElement;
    let container = document.getElementById('container') as HTMLElement;
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

    this.gameEngine.getPlayerbyId('567f5741-0862-4dd6-a442-3d8f819a9dd5');
  }

}
