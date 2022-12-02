import { Injectable } from "@angular/core";
import { throws } from "assert";
import { ScreenModel } from "../models/screen";
import { ViewPortModel } from "../models/viewport";
import { MapService } from "./map.service";
import { ScriptService } from "./script.service";

@Injectable()
export class PlayerService {

    public sprite = [[new Image(), false]];
    public screen: ScreenModel;
    public spriteIndex = 6;
    private leftLeg = false;
    viewport: ViewPortModel;
    public canInput = false;
    mapService: MapService;
    public ScriptService: ScriptService | undefined;
    public model = 0;

    constructor(screen: ScreenModel, viewport: ViewPortModel, mapService: MapService) {
        console.log('PlayerService')
        this.screen = screen;
        this.viewport = viewport;
        this.mapService = mapService;
    }


    public store(index: number, imgSrc: string) {
        let sprite = [new Image(), false];
        (sprite[0] as HTMLImageElement).src = imgSrc;
        (sprite[0] as HTMLImageElement).onload = function () {
            sprite[1] = true;
        }
        this.sprite[index] = sprite;
    }

    public retrieve(index: number): HTMLImageElement {
        return this.sprite[index][0] as HTMLImageElement
    }

    public allLoaded() {
        for (let i = 0; i > 12; i++) {
            if (this.sprite[i][1] === false) {
                return false;
            }
        }
        return true;
    }

    public calcLoc() {
        let character = {
            width: Math.ceil((this.sprite[0][0] as HTMLImageElement).width),
            height: Math.ceil((this.sprite[0][0] as HTMLImageElement).height),
        }
        let screen = {
            width: this.screen.width,
            height: this.screen.height
        }

        let x = (screen.width / 2) - (character.width / 2);
        let y = (screen.height / 2) + 8 - (character.height);

        return { left: x, top: y };
    }

    public draw() {
        console.log('PlayerService.draw')
        let loc = this.calcLoc();
        this.screen.handler.drawImage(this.sprite[this.spriteIndex][0], loc.left, loc.top);
    }

    public activate() {
        var x = this.viewport.x + (this.screen.tilesX / 2 - 0.5);
        var y = this.viewport.y + (this.screen.tilesY / 2 - 0.5);

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
        if (this.mapService.currentMap[y] && this.mapService.currentMap[y][x] && this.mapService.currentMap[y][x].onactivate != undefined) {
            this.ScriptService?.call[this.mapService.currentMap[y][x].onactivate]();
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

        let toX = this.viewport.x + (this.screen.tilesX / 2 - 0.5) - x;
        let toY = this.viewport.y + (this.screen.tilesY / 2 - 0.5) - y;

        if (this.mapService.currentMap[toY] && 
            this.mapService.currentMap[toY][toX] && 
            this.mapService.currentMap[toY][toX].item && 
            this.mapService.currentMap[toY][toX].solid ==1) {
            this.canInput = true;
        } else {
            this.viewport.playerOffsetX = x * 5;
            this.viewport.playerOffsetY = y * 5;
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
        this.viewport.playerOffsetX = x;
        this.viewport.playerOffsetY = y;
        this.draw();
    }

    public reset() {
        let index, x, y;
        x = this.viewport.x;
        y = this.viewport.y;

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
        this.viewport.x = x;
        this.viewport.y = y;
        this.viewport.playerOffsetX = 0;
        this.viewport.playerOffsetY = 0;
        this.spriteIndex = index;
        this.canInput = true;

        this.draw();
        let tileX = x + (this.screen.tilesX / 2 - 0.5);
        let tileY = y + (this.screen.tilesY / 2 - 0.5);
        if (this.mapService.currentMap[tileY] && this.mapService.currentMap[tileY][tileX] && this.mapService.currentMap[tileY][tileX].onenter != undefined) {
            this.ScriptService?.call[this.mapService.currentMap[tileY][tileX].onenter]();
        }
    }
}