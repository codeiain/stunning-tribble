import { Injectable } from "@angular/core";
import { JoystickService } from "./joystick.service";
import { KeyboardService } from "./keyboard.service";
import { MapService } from "./map.service";
import { ModelService } from "./model.service";
import { NpcService } from "./npc.service";
import { PlayerService } from "./player.service";
import { ScreenService } from "./screen.service";
import { ScriptService } from "./script.service";
import { TileService } from "./title.service";
import { ViewportService } from "./viewport.service";

@Injectable()
export class GameService {

  constructor(private keyboardService: KeyboardService,
    private playerService: PlayerService,
    private tileService: TileService,
    private viewportService: ViewportService,
    private screenService: ScreenService,
    private mapServer: MapService,
    private modelService: ModelService,
    private npcService: NpcService,
    private joystickService:JoystickService,
    private scriptService: ScriptService) {
  }
  public LoadModels() {
    this.modelService.load(0, 'scientist')
  }

  public startGame(joystick:HTMLElement) {
    this.joystickService.setup(joystick);
    this.playerService.canInput = true;
    this.scriptService.player = this.playerService;
    window.addEventListener('keydown', (e) => { this.keyboardService.parseInput(e) }, false);
    // this.mapServer.getMap('2b918e3c-7c62-4089-8d7a-5144cb186eca').subscribe((mapdata:any) => {
    //   this.mapServer.setMap(this.mapServer.mapone);
    //   this.drawMap();
    // })

    this.mapServer.setMap(this.mapServer.mapone);
    this.draw();
  }


  public setScreenAndViewport(canvas: HTMLCanvasElement, width: number, height: number) {
    this.screenService.canvas = canvas
    this.screenService.handler = canvas.getContext('2d');
    this.screenService.width = width
    this.screenService.height = height;
    this.screenService.tilesX = Math.ceil(width / 16);
    this.screenService.tilesY = Math.ceil(height / 16);
    this.viewportService.set(1, 1);
  }

  public LoadTiles() {
    this.tileService.store(0, '/assets/tile_cell.png');
    this.tileService.store(1, '/assets/tile_grass.png');
    this.tileService.store(2, '/assets/tile_rock.png');
    this.tileService.store(3, '/assets/ladderdown.png');
    this.tileService.store(4, '/assets/ladderup.png');
    this.tileService.store(5, '/assets/cave.png');
    this.tileService.store(6, '/assets/sign.png');
  }

  public draw() {
    let self = this;
    if (this.tileService.allLoaded() === false || this.modelService.isLoaded(0) === false) {
      setTimeout(() => {
        self.draw()
      }, 100);
    } else {
      self.mapServer.draw();
      self.playerService.draw();
    }
  }
}
