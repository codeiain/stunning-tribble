import { ViewPortModel } from "../models/viewport";
import { MapService } from "./map.service";
import { PlayerService } from "./player.service";

export class ScriptService {
    playerService: PlayerService;
    viewport: ViewPortModel;
    mapService: MapService;

    constructor(mapservice:MapService, viewport: ViewPortModel, playerService: PlayerService){
        this.mapService = mapservice;
        this.viewport = viewport;
        this.playerService = playerService;
    }

    public call = [()=>{
        this.mapService.setMap(this.mapService.maptwo);
        this.viewport.x = -2;
        this.viewport.y = 1;
        this.playerService.spriteIndex = 6;
        this.playerService.draw();
        this.mapService.draw();
    }, ()=>{
        this.mapService.setMap(this.mapService.mapone);
        this.viewport.x = -2;
        this.viewport.y = 5;
        this.playerService.spriteIndex = 6;
        this.playerService.draw();
        this.mapService.draw();
    }, ()=>{
        alert("Im in ur cave, scriptin' ur scientist");
    }]

}