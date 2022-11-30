import { Injectable } from "@angular/core";
import { title } from "process";
import { throwError } from "rxjs";
import { ScreenModel } from "../models/screen";
import { ViewPortModel } from "../models/viewport";
import { TileService } from './title.service';
@Injectable()
export class MapService {
    public mapone = [['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'g', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'r', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'], ['r', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'g', 'r'], ['r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r', 'r']];
    private screen: ScreenModel;
    private viewport: ViewPortModel;
    private tileService: TileService | undefined;
    
    constructor() {
        this.screen = new ScreenModel();
        this.viewport = new ViewPortModel()
        
    }

    public drawMap(mapData:any){
        let self = this;
        if (this.tileService?.allLoaded() === false){
            setTimeout(function(md){
                return function() { 
                    self.draw(md);
                }
            }(mapData), 100)
        }else{
            this.draw(mapData);
        }
    }

    public setup(screen: ScreenModel, viewport: ViewPortModel) {
        this.screen = screen;
        this.viewport = viewport
        this.tileService = new TileService(this.screen);
        this.tileService.store('g', '/assets/tile_grass.png');
        this.tileService.store('r', '/assets/tile_rockgrass.png');
        this.tileService.store(' ', '/assets/tile_black.png');
    }

    public draw(mapData: any) {
        let i, j, tile;
        for (j = 0; j < this.screen.titleY; j++) {
            for (i = 0; i < this.screen.tilesX; i++) {
                let mapX = i + this.viewport.x;
                let mapY = j + this.viewport.y;
                //tile = this.mapone[mapY][mapX];
                tile = (mapData[mapY] && mapData[mapY][mapX]) ? mapData[mapY][mapX] : '';
                this.tileService?.draw(i, j, tile);
            }
        }
    }

}