import { Component, OnInit, Inject } from "@angular/core";
import { GameService } from "./services/game.service";
import { DOCUMENT } from '@angular/common';
import { MapService } from "./services/map.service";
import { ScreenModel } from "./models/screen";
import { ViewPortModel } from "./models/viewport";

@Component({
    selector: 'app-game',
    templateUrl:'./game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
    public title!: string;

    constructor(private gameService: GameService, private mapServer: MapService,@Inject(DOCUMENT) document: Document) {
        this.gameService = gameService;
        this.mapServer = mapServer;
        
    }

    ngOnInit(): void {
        let screen = new ScreenModel();
        screen.canvas =  document.getElementById('canvas') as HTMLCanvasElement;
        screen.handler = screen.canvas.getContext('2d');
        screen.height = screen.canvas.height;
        screen.width = screen.canvas.width;
        screen.tilesX = screen.canvas.width / 16;
        screen.titleY = screen.canvas.height / 16;
        let viewport = new ViewPortModel();
        viewport.x = 0;
        viewport.y = 0;
        this.mapServer.setup(screen, viewport);
        this.mapServer.drawMap(this.mapServer.mapone);
    }
    
}