import { Injectable } from "@angular/core";
import { MapService } from "./map.service";
import { NpcService } from "./npc.service";
import { PlayerService } from "./player.service";
import { create } from 'nipplejs';

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
    let options = {
      zone: element,
      mode: 'static',
      position: { left: '10%', bottom: '10%' },
      color: 'red',
      dynamicPage: true,
      size: 2 * this.size
    };

    this.manager = create(options);
    this.manager.on('dir:up', () => {
      console.log('up')
      this.parseInput('up');
    })
    this.manager.on('dir:left', () => {
      console.log('left')
      this.parseInput('left');
    })
    this.manager.on('dir:down', () => {
      console.log('down')
      this.parseInput('down');
    })
    this.manager.on('dir:right', () => {
      console.log('right')
      this.parseInput('right');
    })
    this.manager.on('move', (e:any)=>{
      console.log(e)
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
