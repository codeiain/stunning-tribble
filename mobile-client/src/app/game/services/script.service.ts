import { Injectable } from "@angular/core";

import { MapService } from "./map.service";

import { ViewportService } from "./viewport.service";
@Injectable()
export class ScriptService {
    player: any;


    constructor(private mapService:MapService, private viewportService: ViewportService){

    }
    public setPlayer(player:any)
    {
      this.player = player;
    }

    public scripts = [()=>{
        this.mapService.setMap(this.mapService.maptwo);
        this.viewportService.x = -32;
        this.viewportService.y = -14;
        this.mapService.draw();
        this.player.draw();
    }, ()=>{
        this.mapService.setMap(this.mapService.mapone);
        this.viewportService.x = -32;
        this.viewportService.y = -10;
        this.mapService.draw();
        this.player.draw();
    }, ()=>{
        alert("Im in ur cave, scriptin' ur scientist");
    }]

}
