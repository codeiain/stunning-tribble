import { Injectable } from "@angular/core";

import { MapService } from "./map.service";

import { ViewportService } from "./viewport.service";
@Injectable()
export class ScriptService {


    constructor(private mapService:MapService, private viewportService: ViewportService){

    }

    public call = [()=>{
        this.mapService.setMap(this.mapService.maptwo);
        this.viewportService.x = -2;
        this.viewportService.y = 1;
        this.mapService.draw();
    }, ()=>{
        this.mapService.setMap(this.mapService.mapone);
        this.viewportService.x = -2;
        this.viewportService.y = 5;
        this.mapService.draw();
    }, ()=>{
        alert("Im in ur cave, scriptin' ur scientist");
    }]

}
