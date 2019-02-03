import { IFoto } from './IFotos';
import { IArvore } from './IArvore';
import { UserType } from './enums/UserType.enum';
import { Status } from './enums/Status.enum';

export interface IUsuario {
  UserID?:number;
  Name?:string;
  Email?:string;
  Password?:string;
  Type?:UserType;
  Status?:Status;
  Photos?:IFoto[];
  Trees?:IArvore[];
}

