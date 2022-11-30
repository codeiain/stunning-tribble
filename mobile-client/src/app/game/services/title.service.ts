import { Injectable } from "@angular/core";
import { ScreenModel } from "../models/screen";

@Injectable()
export class TileService {
    private images: any = [];
    private screen: ScreenModel;

    constructor(screen: ScreenModel) {
        this.screen = screen;
    }

    public store(id: any, imgSrc: any) {
        let newid = this.images.length;
        let tile = [id, new Image(), false];
        tile[1].src = imgSrc;
        tile[1].onload = function () { 
            tile[2] = true; 
        };
        tile[1].onerror = function(){
            console.log("error");
        }
        this.images[newid] = tile;

    }

    public allLoaded(){
        let i, len = this.images.length;
        for (i = 0; i <len; i ++){
            if (this.images[i][2] === false){
                return false;
            }
        }
        return true;
    }

    public retrieve(id: any) {
        let i, len = this.images.length;
        for (i = 0; i < len; i++) {
            if (this.images[i][0] == id) {
                return this.images[i][1];
            }
        }
    }

    public draw(x: number, y: number, tile: any) {
        //this.screen.handler.fillText(tile, x * 16, y * 16);
        let img = this.retrieve(tile);
        this.screen.handler.drawImage(img, x * 16, y * 16);
    }
}