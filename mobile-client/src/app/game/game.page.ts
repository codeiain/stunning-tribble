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

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  public title!: string;


  constructor(
    private keyboardService: KeyboardService,
    private playerService: PlayerService,
    private tileService: TileService,
    private viewportService: ViewportService,
    private screenService: ScreenService,
    private mapServer: MapService,
    private modelService: ModelService,
    private npcService: NpcService,
    @Inject(DOCUMENT) document: Document) {

  }

  ngOnInit(): void {

    this.screenService.canvas = document.getElementById('canvas') as HTMLCanvasElement;
    this.screenService.handler = this.screenService.canvas.getContext('2d');
    this.screenService.height = this.screenService.canvas.height;
    this.screenService.width = this.screenService.canvas.width;
    this.screenService.tilesX = this.screenService.canvas.width / 16;
    this.screenService.tilesY = this.screenService.canvas.height / 16;

    this.viewportService.set(1,1);

    this.tileService.store(0, '/assets/tile_black.png');
    this.tileService.store(1, '/assets/tile_grass.png');
    this.tileService.store(2, '/assets/tile_rock.png');
    this.tileService.store(3, '/assets/ladderdown.png');
    this.tileService.store(4, '/assets/ladderup.png');
    this.tileService.store(5, '/assets/cave.png');
    this.tileService.store(6, '/assets/sign.png');

    this.playerService.canInput = true;
    window.addEventListener('keydown', (e) => { this.keyboardService.parseInput(e) }, false);

    // this.playerService.store(0, '/assets/scientist/scientist_n0.png')
    // this.playerService.store(1, '/assets/scientist/scientist_n1.png')
    // this.playerService.store(2, '/assets/scientist/scientist_n2.png')
    // this.playerService.store(3, '/assets/scientist/scientist_e0.png');
    // this.playerService.store(4, '/assets/scientist/scientist_e1.png');
    // this.playerService.store(5, '/assets/scientist/scientist_e2.png');
    // this.playerService.store(6, '/assets/scientist/scientist_s0.png');
    // this.playerService.store(7, '/assets/scientist/scientist_s1.png');
    // this.playerService.store(8, '/assets/scientist/scientist_s2.png');
    // this.playerService.store(9, '/assets/scientist/scientist_w0.png');
    // this.playerService.store(10, '/assets/scientist/scientist_w1.png');
    // this.playerService.store(11, '/assets/scientist/scientist_w2.png');

    this.modelService.load(0, 'scientist')

    // this.mapServer.getMap('2b918e3c-7c62-4089-8d7a-5144cb186eca').subscribe((mapdata:any) => {
    //   this.mapServer.setMap(this.mapServer.mapone);
    //   this.drawMap();
    // })

    this.npcService.add(0, 0, 6,2)
    this.npcService.add(1, 0, 6,3)
    this.npcService.add(2, 0, 7,3)
    this.npcService.add(3, 0, 8,2)
    this.npcService.add(4, 0, 8,3)
    this.npcService.add(5, 0, 9,2)
    this.npcService.add(6, 0, 9,3)
    this.mapServer.setMap(this.mapServer.mapone);
    this.drawMap();
  }

  public drawMap() {
    let self = this;
    if (this.tileService.allLoaded() === false || this.modelService.isLoaded(0) === false) {
      setTimeout(() => {
        self.drawMap()
      }, 100);
    } else {
      self.mapServer.draw();
      self.playerService.draw();
      self.npcService.draw(0);
      self.npcService.draw(1);
      self.npcService.draw(2);
      self.npcService.draw(3);
      self.npcService.draw(4);
      self.npcService.draw(5);
      self.npcService.draw(6);
    }
  }


}
