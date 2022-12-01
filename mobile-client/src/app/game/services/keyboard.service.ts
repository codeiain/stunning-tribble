import { Injectable } from "@angular/core";
import { ViewPortModel } from "../models/viewport";
import { MapService } from "./map.service";
import { PlayerService } from "./player.service";

@Injectable()
export class KeyboardService {

    private viewport: ViewPortModel;
    private mapService: MapService;
    playerService: PlayerService;


    constructor(viewport: ViewPortModel, mapService: MapService, playerService: PlayerService) {
        this.viewport = viewport;
        this.mapService = mapService;
        this.playerService = playerService;
    }

    public getKeycode(key: string) {
        switch (key) {
            case 'up': return 38;
            case 'down': return 40;
            case 'left': return 37;
            case 'right': return 39;
            case 'a':return 65;
        }
        return 0;
    }

    public parseInput(event: any) {
        if (this.playerService.canInput === true) {
            switch (event.keyCode) {
                case this.getKeycode('up'):
                    this.playerService.move('up');
                    break;
                case this.getKeycode('down'):
                    this.playerService.move('down');
                    break;
                case this.getKeycode('left'):
                    this.playerService.move('left');
                    break;
                case this.getKeycode('right'):
                    this.playerService.move('right');
                    break;
                case this.getKeycode('a'):
                    this.playerService.activate();
                    break;
            }
        }
        this.mapService.draw();
        this.playerService.draw();
    }
}