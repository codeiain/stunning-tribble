import { Component, OnInit, Inject } from "@angular/core";
import { GameService } from "./services/game.service";
import { DOCUMENT } from '@angular/common';
import { MapService } from "./services/map.service";
import { ScreenModel } from "./models/screen";
import { ViewPortModel } from "./models/viewport";
import { KeyboardService } from "./services/keyboard.service";
import { PlayerService } from "./services/player.service";
import { TileService } from "./services/title.service";
import { ScriptService } from "./services/script.service";

@Component({
    selector: 'app-game',
    templateUrl: './game.page.html',
    styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
    public title!: string;
    screen: ScreenModel;
    tileService: TileService;
    player: PlayerService;
    viewport: ViewPortModel;
    keyboardService: KeyboardService;
    scriptService: ScriptService;

    constructor(private gameService: GameService, private mapServer: MapService, @Inject(DOCUMENT) document: Document) {
        this.gameService = gameService;
        this.mapServer = mapServer;
        this.screen = new ScreenModel();
        this.viewport = new ViewPortModel();
        this.tileService = new TileService(this.screen, this.viewport);
        this.player = new PlayerService(this.screen, this.viewport, this.mapServer);
        this.keyboardService = new KeyboardService(this.viewport, this.mapServer, this.player);
        this.scriptService = new ScriptService(this.mapServer, this.viewport, this.player);
        this.player.ScriptService = this.scriptService;
    }

    ngOnInit(): void {

        this.screen.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.screen.handler = this.screen.canvas.getContext('2d');
        this.screen.height = this.screen.canvas.height;
        this.screen.width = this.screen.canvas.width;
        this.screen.tilesX = this.screen.canvas.width / 16;
        this.screen.tilesY = this.screen.canvas.height / 16;

        this.viewport.x = 0;
        this.viewport.y = 0;

        this.tileService.store(0, '/assets/tile_black.png');
        this.tileService.store(1, '/assets/tile_grass.png');
        this.tileService.store(2, '/assets/tile_rock.png');
        this.tileService.store(3, '/assets/ladderdown.png');
        this.tileService.store(4, '/assets/ladderup.png');
        this.tileService.store(5, '/assets/cave.png');
        this.tileService.store(6, '/assets/sign.png');

        this.mapServer.setup(this.screen, this.viewport, this.tileService);
        this.mapServer.setMap(this.mapServer.mapone);
        

        this.player.canInput = true;
        window.addEventListener('keydown', (e) => { this.keyboardService.parseInput(e) }, false);

        this.player.store(0, '/assets/scientist/scientist_n0.png')
        this.player.store(1, '/assets/scientist/scientist_n1.png')
        this.player.store(2, '/assets/scientist/scientist_n2.png')
        this.player.store(3, '/assets/scientist/scientist_e0.png');
        this.player.store(4, '/assets/scientist/scientist_e1.png');
        this.player.store(5, '/assets/scientist/scientist_e2.png');
        this.player.store(6, '/assets/scientist/scientist_s0.png');
        this.player.store(7, '/assets/scientist/scientist_s1.png');
        this.player.store(8, '/assets/scientist/scientist_s2.png');
        this.player.store(9, '/assets/scientist/scientist_w0.png');
        this.player.store(10, '/assets/scientist/scientist_w1.png');
        this.player.store(11, '/assets/scientist/scientist_w2.png');

        this.drawMap();
    }

    public drawMap() {
        let self = this;
        if (this.tileService.allLoaded() === false || this.player.allLoaded() === false) {
            setTimeout(() => { 
                self.drawMap() 
            }, 100);
        } else {
            self.mapServer.draw();
            self.player.draw();
        }
    }
    

}