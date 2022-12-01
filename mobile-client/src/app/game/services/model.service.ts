import { retry } from "rxjs";

export class ModelService {
    list: any;

    public load(id: number, folder: string) {
        let imgNames = ['n0', 'n1', 'n2', 'e0', 'e1', 'e2', 's0', 's1', 's2', 'w0', 'w1', 'w2'];
        this.list[id] = [];
        for (let i = 0; i < 12; i++) {
            var self = this
            this.list[id][i] = [new Image(),false];
            this.list[id][i][0].src = "/assets/" + folder +'/'+ folder + '_' + imgNames[i] + '.png';
            this.list[id][i][0].onload = function(pid, pi){
                return function(){
                    self.list[pid][pi][1] = true;
                }
            }(id, i)
        }
    }

    public isLoaded(id: string | number){
        for(let i = 0; i <12; i ++){
            if (this.list[id][i][1] === false){
                return false;
            }
        }
        return true;
    }
}