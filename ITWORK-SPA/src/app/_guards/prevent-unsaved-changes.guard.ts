import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../main-authorized/members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanged implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure? changes will be lost');
        }
        return true;
    }
}
