import { Injectable } from "@angular/core";
import { MapService } from "./map.service";
import { ScreenService } from "./screen.service";
import { ScriptService } from "./script.service";
import { ViewportService } from "./viewport.service";

@Injectable()
export class PlayerService {

    public sprite = [[new Image(), false]];
    public spriteIndex = 6;
    private leftLeg = false;
    public canInput = false;
    public model = 0;

    constructor(private screenService: ScreenService, private viewportService: ViewportService, private mapService: MapService, private scriptService: ScriptService) {
        console.log('PlayerService')
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
            width: this.screenService.width,
            height: this.screenService.height
        }

        let x = (screen.width / 2) - (character.width / 2);
        let y = (screen.height / 2) + 8 - (character.height);

        return { left: x, top: y };
    }

    public draw() {
        console.log('PlayerService.draw')
        let loc = this.calcLoc();
        this.screenService.handler.drawImage(this.sprite[this.spriteIndex][0], loc.left, loc.top);
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
        if (this.mapService.currentMap[y] && this.mapService.currentMap[y][x] && this.mapService.currentMap[y][x].onactivate != undefined) {
            this.scriptService?.call[this.mapService.currentMap[y][x].onactivate]();
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

        if (this.mapService.currentMap[toY] &&
            this.mapService.currentMap[toY][toX] &&
            this.mapService.currentMap[toY][toX].item &&
            this.mapService.currentMap[toY][toX].solid ==1) {
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
        if (this.mapService.currentMap[tileY] && this.mapService.currentMap[tileY][tileX] && this.mapService.currentMap[tileY][tileX].onenter != undefined) {
            this.scriptService.call[this.mapService.currentMap[tileY][tileX].onenter]();
        }
    }
}
