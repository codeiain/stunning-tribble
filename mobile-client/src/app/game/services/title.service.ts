import { Injectable } from "@angular/core";
import { ScreenModel } from "../models/screen";
import { TileModel } from "../models/tile";
import { ViewPortModel } from "../models/viewport";

@Injectable()
export class TileService {
    private images: any = [];
    private screen: ScreenModel;
    viewport: ViewPortModel;

    constructor(screen: ScreenModel, viewport: ViewPortModel) {
        this.screen = screen;
        this.viewport = viewport;
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
        let rx = x * 16 + this.viewport.playerOffsetX;
        let ry = y * 16 + this.viewport.playerOffsetY;
        let t = new TileModel();
        let groundTile = (this.retrieve(tile.ground) as HTMLImageElement);
        console.log(groundTile);
        this.screen.handler.drawImage(groundTile, rx, ry);
        let itemTile = this.retrieve(tile.item);
        if (itemTile !== undefined) {
            this.screen.handler.drawImage(itemTile, rx, ry);
        }
    }
}