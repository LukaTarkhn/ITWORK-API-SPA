import { OrganizationPhoto } from './organizationPhoto';
import { OrganizationHeadPhoto } from './organizationHeadPhoto';

export interface Organization {
    id: number;
    name: string;
    dateCreated: Date;
    description: string;
    userId: number;
    organizationPhotoUrl: string;
    organizationHeadPhotoUrl: string;
    organizationPhotos?: OrganizationPhoto[];
    organizationHeadPhotos?: OrganizationHeadPhoto[];
}
