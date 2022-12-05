import { Injectable } from "@angular/core";
import { ScreenService } from "./screen.service";

@Injectable()
export class ViewportService {
  public x: number = 0;
  public y: number = 0;
  public playerOffsetX: number = 0;
  public playerOffsetY: number = 0;
  public overflowTile = 1;

  constructor(private screenService: ScreenService) { }

  public set(x: number, y: number) {
    let vx = x - (this.screenService.width - 16) / 32;
    let vy = y - (this.screenService.height - 16) / 32;
    this.x = vx;
    this.y = vy;
  }
}
