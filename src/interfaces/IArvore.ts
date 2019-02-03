import { IEspecie } from './IEspecie';
import { IFoto } from './IFotos';
import { IUsuario } from './IUsuario';
import { Status } from './enums/Status.enum';

export interface IArvore {
  TreeID:number;
  Latitude:string;
  Longitude:string;
  //Foreing key
  UserID:number;
  User:IUsuario;
  SpecieID:number;
  Specie:IEspecie;
  Status:Status;
  Photos:IFoto[];
  
}




