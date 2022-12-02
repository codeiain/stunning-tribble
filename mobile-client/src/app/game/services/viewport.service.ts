import { Injectable } from "@angular/core";

@Injectable()
export class ViewportService
{
    public x: number = 0;
    public y: number = 0;
    public playerOffsetX: number =0;
    public playerOffsetY: number =0;
    public overflowTile = 1;
}
