import { Injectable } from "@angular/core";
import { Mode } from "@ionic/core";
import { map, Observable } from "rxjs";
import { ApiService } from "src/api/player/services";
import { MapService } from "./map.service";
import { ModelService } from "./model.service";
import { ScreenService } from "./screen.service";
import { ScriptService } from "./script.service";
import { TileService } from "./title.service";
import { ViewportService } from "./viewport.service";

@Injectable()
export class PlayerService {

  public sprite = [[new Image(), false]];
  public spriteIndex = 6;
  private leftLeg = false;
  public canInput = false;
  public model = 0;

  constructor(private screenService: ScreenService,
    private viewportService: ViewportService,
    private mapService: MapService,
    private scriptService: ScriptService,
    private modelService: ModelService,
    private tileService: TileService,
    private apiService: ApiService) {
    console.log('PlayerService')
  }
  public getPlayerFromService(player_id: any): Observable<any> {
    return this.apiService.getPlayerPlayerPlayerIdGet({ player_id: player_id })
  }


  public retrieve(index: number): HTMLImageElement {
    return this.sprite[index][0] as HTMLImageElement
  }


  public draw(){
    let loc = this.modelService.fixScreenLoc(this.model, {x:this.screenService.width, y: this.screenService.height});
    this.modelService.draw(this.model, this.spriteIndex, loc.x, loc.y);
  }

  public activate() {
    var x = this.viewportService.x + (this.screenService.tilesX / 2 - 0.5);
    var y = this.viewportService.y + (this.screenService.tilesY / 2 - 0.5);

    switch (this.spriteIndex) {
      case 0:
        y--;
        break;
      case 3:
        x++;
        break;
      case 6:
        y++;
        break;
      case 9:
        x--;
        break;

    }
    let toTile = this.mapService.getTile(x, y);

    if (this.tileService.hasProperty(toTile, 'onactivate', false)) {
      var ScriptId = toTile.onactivate;
      this.scriptService.scripts[ScriptId].call(this);
    }
  }


  public move(direction: string) {
    var index, x, y;
    index = x = y = 0;
    this.canInput = false;
    switch (direction) {
      case 'up':
        index = 0;
        y = 1;
        break;
      case 'right':
        index = 3;
        x = -1;
        break;
      case 'left':
        index = 9;
        x = 1;
        break;
      case 'down':
        index = 6;
        y = -1;
        break;
    }

    let toX = this.viewportService.x + (this.screenService.tilesX / 2 - 0.5) - x;
    let toY = this.viewportService.y + (this.screenService.tilesY / 2 - 0.5) - y;

    var toTile = this.mapService.getTile(toX, toY);

    if (this.tileService.hasProperty(toTile, 'solid', true)) {
      this.canInput = true;
    } else {
      this.viewportService.playerOffsetX = x * 5;
      this.viewportService.playerOffsetY = y * 5;
      setTimeout(() => {
        this.animate();
      }, 100);
      setTimeout(() => {
        this.reset();
      }, 200);

    }

    this.spriteIndex = index;
    this.draw();
  }

  public animate() {
    let x, y
    x = y = 0;
    switch (this.spriteIndex) {
      case 0:
        y = 11;
        break;
      // 11 = (6 from the player.move) + 5
      case 3:
        x = -11;
        break;
      case 6:
        y = -11;
        break;
      case 9:
        x = 11;
        break;
    }
    this.spriteIndex += (this.leftLeg === true) ? 1 : 2;
    this.leftLeg = !this.leftLeg;
    this.viewportService.playerOffsetX = x;
    this.viewportService.playerOffsetY = y;
    this.draw();
  }

  public reset() {
    let index, x, y;
    x = this.viewportService.x;
    y = this.viewportService.y;

    index = 0;
    switch (this.spriteIndex) {
      case 1:
      case 2:
        y--;
        index = 0;
        break;
      case 4:
      case 5:
        x++;
        index = 3;
        break;
      case 7:
      case 8:
        y++;
        index = 6;
        break;
      case 10:
      case 11:
        x--;
        index = 9;
        break;
    }
    this.viewportService.x = x;
    this.viewportService.y = y;
    this.viewportService.playerOffsetX = 0;
    this.viewportService.playerOffsetY = 0;
    this.spriteIndex = index;
    this.canInput = true;

    this.draw();
    let tileX = x + (this.screenService.tilesX / 2 - 0.5);
    let tileY = y + (this.screenService.tilesY / 2 - 0.5);

    let toTile = this.mapService.getTile(tileX, tileY);

    if (this.tileService.hasProperty(toTile, 'onenter', false)) {
      var ScriptId = toTile.onenter;
      this.scriptService.scripts[ScriptId].call(this);
    }

  }
}
