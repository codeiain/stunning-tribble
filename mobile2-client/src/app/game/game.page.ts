import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GameScene } from './scenes/game.scene';
import { DOCUMENT } from '@angular/common';
import { BootScene } from './scenes/boot.scene';
import { MainMenuScene } from './scenes/mainmenu.scene';
import { GridEngine } from 'grid-engine';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  phaserGame: Phaser.Game | undefined;
  config: Phaser.Types.Core.GameConfig;

  constructor(@Inject(DOCUMENT) document: Document) {


    this.config = {
      type: Phaser.AUTO,
      parent: 'GameHolder',
      width: 400,
      height: 224,
      zoom: 3,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          gravity: {
            y: 0
          },
          debug: false // set to true to view zones
        }
      },
      scene: [
        BootScene,
        MainMenuScene,
        GameScene
      ],
      plugins: {
        scene: [
          {
            key: 'gridEngine',
            plugin: GridEngine,
            mapping: 'gridEngine',
          },
        ],
      },
      backgroundColor: '#000000',
    }

  }

  ngOnInit(): void {
    this.phaserGame = new Phaser.Game(this.config);
  }

}
