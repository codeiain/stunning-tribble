import { Injectable } from "@angular/core";

@Injectable()
export class ScreenService
{
    public width: number = 0;
    public height : number = 0;
    public tilesX : number =0;
    public tilesY : number =0 ;
    public canvas? : HTMLCanvasElement;
    public handler?: any;
}
