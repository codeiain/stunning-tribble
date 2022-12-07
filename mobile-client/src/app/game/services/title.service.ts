import { Injectable } from "@angular/core";
import { TileModel } from "../models/tile";
import { ScreenService } from "./screen.service";
import { ViewportService } from "./viewport.service";

@Injectable()
export class TileService {
    private images: any = [];

    constructor(private screenService: ScreenService, private viewportService: ViewportService) {
    }

    public store(id: any, imgSrc: any) {
        let newid = this.images.length;
        let tile = [id, new Image(), false];
        tile[1].src = imgSrc;
        tile[1].onload = function () {
            tile[2] = true;
        };
        tile[1].onerror = function () {
            console.log("error");
        }
        this.images[newid] = tile;

    }

    public allLoaded() {
        let i, len = this.images.length;
        for (i = 0; i < len; i++) {
            if (this.images[i][2] === false) {
                return false;
            }
        }
        return true;
    }

    public retrieve(id: any) {
        let i, len = this.images.length;
        for (i = 0; i < len; i++) {
            if (this.images[i][0] == id) {
                return this.images[i][1] as HTMLImageElement;
            }
        }
        return new Image();
    }

    public draw(x: number, y: number, tile: any) {
        let rx = x * 16 + this.viewportService.playerOffsetX;
        let ry = y * 16 + this.viewportService.playerOffsetY;
        let t = new TileModel();
        let groundTile = (this.retrieve(tile.ground) as HTMLImageElement);
        this.screenService.handler.drawImage(groundTile, rx, ry);
        let itemTile = this.retrieve(tile.item);
        if (itemTile !== undefined) {
            this.screenService.handler.drawImage(itemTile, rx, ry);
        }
    }

    public hasProperty(tile:any, prop: string,mustHaveValue: boolean | undefined)
    {
      if (tile !== undefined && tile[prop] !== undefined){
        if (mustHaveValue !== undefined){
          return tile[prop] == mustHaveValue;
        }
        return true;
      }
      return false;
    }
}
