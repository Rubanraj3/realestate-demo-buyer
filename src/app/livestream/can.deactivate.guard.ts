import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import { Observable } from "rxjs";

export interface ComponentCanDeactivate {
  canDeactivate: () => boolean | Observable<boolean>;
}


@Injectable()
export class PendingChangesGuard_sub implements CanDeactivate<any> {
  canDeactivate(component: ComponentCanDeactivate): any | Observable<any> {
    if (confirm('Are you sure you want to leave this page?')) {
      return true;
    } else {
      return false;
    }
  }

}