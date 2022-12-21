import { Injectable } from "@angular/core";
import { PlayerService } from "./player.service";
import { v4 as uuidv4 } from 'uuid';
import { Player } from "./models/player";
import { TruthyTypesOf } from "rxjs";

@Injectable()
export class GameEngine {

  currentPlayer: Player

  constructor(private playerService:PlayerService){
    this.currentPlayer = new Player()
  }

  public getPlayerbyId(player_id:string) {
    this.playerService.getPlayerbyId(player_id).subscribe((playerData:Player)=>{
      this.currentPlayer = playerData
    })
  }

}



