import { IEspecie } from './IEspecie';
import { IFoto } from './IFotos';

export interface IArvore {
    id_arvore?:  number;
    user_id?:    number;
    latitude?:   string;
    longitude?:  string;
    especie_id?: number;
    updated_at?: string;
    created_at?: string;
    fotos?:      IFoto[];
    especie?:    IEspecie;
}




