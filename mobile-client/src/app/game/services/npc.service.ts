import { Injectable } from "@angular/core";
import { ModelService } from "./model.service";
import { ViewportService } from "./viewport.service";

@Injectable()
export class NpcService {

  private x: number = 0;
  private y: number = 0;
  private model:any;

  constructor(private modelService: ModelService, private viewportService: ViewportService) {

  }

  public list: any[] = [];

  public add(id: number, model: any, x: number, y: number) {
    this.list[id] = { model: model, x: x, y: x }
  }

  public draw(id: number) {
    let npc = this.list[id];
    let loc = this.modelService.fixScreenLoc(id, { x: 16, y: 16 });
    var x = (this.x * 16) - (this.viewportService.x * 16) + loc.x + this.viewportService.playerOffsetX;
    var y = (this.y * 16) - (this.viewportService.y * 16) + loc.y + this.viewportService.playerOffsetY;
    this.modelService.draw(npc.model, 6, x, y);
  }
}
