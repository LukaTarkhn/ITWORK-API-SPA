import { Photo } from './photo';
import { Organization } from './organization';

export interface User {
    id: number;
    username: string;
    photoUrl: string;
    lastAction: Date;
    created: Date;
    photos?: Photo[];
    organizations?: Organization[];
}
