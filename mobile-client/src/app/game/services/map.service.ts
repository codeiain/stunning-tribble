import { Injectable } from "@angular/core";
import { title } from "process";
import { throwError } from "rxjs";
import { ScreenModel } from "../models/screen";
import { TileModel } from "../models/tile";
import { ViewPortModel } from "../models/viewport";
import { TileService } from './title.service';
@Injectable()
export class MapService {
    public mapone =
        [[{ ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1, item: 3, onenter: 0 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1 }, { ground: 1, item: 2 }], [{ ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }, { ground: 1, item: 2 }]];
    public maptwo =
        [[{ ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }], [{ ground: 5, item: 2 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5, item: 2 }], [{ ground: 5, item: 2 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5, item: 2 }], [{ ground: 5, item: 2 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5, item: 6, onactivate: 2 }, { ground: 5 }, { ground: 5 }, { ground: 5, item: 2 }], [{ ground: 5, item: 2 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5, item: 2 }], [{ ground: 5, item: 2 }, { ground: 5 }, { ground: 5, item: 4, onenter: 1 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5, item: 2 }], [{ ground: 5, item: 2 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5, item: 2 }], [{ ground: 5, item: 2 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { ground: 5 }, { grounmmd: 5 }, { ground: 5, item: 2 }], [{ ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }, { ground: 5, item: 2 }]];
    private screen: ScreenModel;
    private viewport: ViewPortModel;
    private tileService: TileService | undefined;
    currentMap: any;


    constructor() {
        console.log("MapService")
        this.screen = new ScreenModel();
        this.viewport = new ViewPortModel()
    }

    public setMap(mapData: any) {
        this.currentMap = mapData;
    }


    public setup(screen: ScreenModel, viewport: ViewPortModel, tileService: TileService) {
        this.screen = screen;
        this.viewport = viewport
        this.tileService = tileService
    }

    public draw() {
        console.log('MapService.draw')
        let i, j;
        let mapX = 0;
        let mapY = 0;
        let iMax = this.screen.tilesX + this.viewport.overflowTile;
        let jMax = this.screen.tilesY + this.viewport.overflowTile;
        let tile: TileModel;

        for (j = -this.viewport.overflowTile; j < this.screen.tilesY; j++) {
            for (i = -this.viewport.overflowTile; i < this.screen.tilesX; i++) {
                let mapX = i + this.viewport.x;
                let mapY = j + this.viewport.y;
                tile = (this.currentMap[mapY] && this.currentMap[mapY][mapX]) ? this.currentMap[mapY][mapX] : new TileModel();
                this.tileService?.draw(i, j, tile);
            }
        }
    }

}