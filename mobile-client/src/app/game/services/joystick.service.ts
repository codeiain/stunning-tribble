import { Injectable } from "@angular/core";
import { MapService } from "./map.service";
import { NpcService } from "./npc.service";
import { PlayerService } from "./player.service";
import { create, JoystickManagerOptions } from 'nipplejs';

@Injectable()
export class JoystickService {
  size: number = 50;
  manager: any;

  constructor(
    private mapService: MapService,
    private playerService: PlayerService,
    private npcService: NpcService) {

  }

  public setup(element: HTMLElement) {
    let options: JoystickManagerOptions = {
      zone: element,
      position: { left: '10%', bottom: '10%' },
      color: 'red',
      dynamicPage: true,
      size: 2 * this.size,
      mode: 'static'
    };

    this.manager = create(options);

    this.manager.on('move', (e: any, data: any) => {
      if (data.direction.angle) {
        this.parseInput(data.direction.angle)
      }
    })
  }

  public parseInput(event: string) {
    if (this.playerService.canInput === true) {
      switch (event) {
        case 'up':
          this.playerService.move('up');
          break;
        case 'down':
          this.playerService.move('down');
          break;
        case 'left':
          this.playerService.move('left');
          break;
        case 'right':
          this.playerService.move('right');
          break;

      }
    }
    this.mapService.draw();
    this.playerService.draw();
    this.npcService.draw(0);

  }
}
