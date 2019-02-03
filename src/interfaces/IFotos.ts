import { Status } from "./enums/Status.enum";
import { IUsuario } from "./IUsuario";
import { IArvore } from "./IArvore";

export interface IFoto {
  PhotoID:number;
  Url:string;
  Status:Status;

  //Foreign Keys
  UserID:number;
  User:IUsuario;

  TreeID:number;
  Tree:IArvore;
}