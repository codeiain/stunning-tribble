import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "src/api/map/services";
import { TileModel } from "../models/tile";
import { ScreenService } from "./screen.service";
import { TileService } from "./title.service";
import { ViewportService } from "./viewport.service";

@Injectable()
export class MapService {
  currentMap: any;
  public mapone =
    [
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0, item: 3, onenter: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 0 }, { ground: 1, solid: 1, item: 2 }],
      [{ ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }, { ground: 1, solid: 1, item: 2 }]];
  public maptwo =
    [
      [{ ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }],
      [{ ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 1, item: 2 }],
      [{ ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 1, item: 2 }],
      [{ ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0, item: 6, onactivate: 2 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 1, item: 2 }],
      [{ ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 1, item: 2 }],
      [{ ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0, item: 4, onenter: 1 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 1, item: 2 }],
      [{ ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 1, item: 2 }],
      [{ ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { ground: 5, solid: 0 }, { grounmmd: 5 }, { ground: 5, solid: 1, item: 2 }],
      [{ ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }, { ground: 5, solid: 1, item: 2 }]];

  constructor(private apiService: ApiService, private screenService: ScreenService, private viewportService: ViewportService, private tileService: TileService) {

  }

  public setMap(mapData: any) {

    this.currentMap = mapData
  }

  public getMap(map_id: any): Observable<any> {
    return this.apiService.getMapMapMapIdGet$Response({map_id: map_id})
  }

  public draw() {
    console.log('MapService.draw')
    let i, j;
    let mapX = 0;
    let mapY = 0;
    let iMax = this.screenService.tilesX + this.viewportService.overflowTile;
    let jMax = this.screenService.tilesY + this.viewportService.overflowTile;
    let tile: TileModel;

    for (j = -this.viewportService.overflowTile; j < this.screenService.tilesY; j++) {
      for (i = -this.viewportService.overflowTile; i < this.screenService.tilesX; i++) {
        let mapX = i + this.viewportService.x;
        let mapY = j + this.viewportService.y;
        tile = (this.currentMap[mapY] && this.currentMap[mapY][mapX]) ? this.currentMap[mapY][mapX] : new TileModel();
        this.tileService?.draw(i, j, tile);
      }
    }
  }

}
