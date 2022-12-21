import { Injectable } from "@angular/core";
import { ApiService } from "src/api/player/services";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class PlayerService {

  constructor(private apiService : ApiService){

  }

  public getPlayerbyId(player_id: any){
    return this.apiService.getPlayerPlayerPlayerIdGet({player_id: player_id});
  }

}
