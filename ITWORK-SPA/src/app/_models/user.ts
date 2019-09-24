import { Photo } from './photo';

export interface User {
    id: number;
    username: string;
    photoUrl: string;
    lastAction: Date;
    created: Date;
    photos?: Photo[];
}
