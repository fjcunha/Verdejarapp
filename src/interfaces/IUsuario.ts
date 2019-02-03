import { IEspecie } from './IEspecie';
import { IFoto } from './IFotos';
import { IArvore } from './IArvore';

export interface IUsuario {
    id?:       number;
    name?:       string;
    email?:      string;
    password?:	 string;
    phone?:      string;
    picture?:    string;
    admin?:      number;
    created_at?: string;
    updated_at?: string;
    active?:     number;
    arvore?:     IArvore[];
    // comentario?: any[];
    token?:		 string;
}

