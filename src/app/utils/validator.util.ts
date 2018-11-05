import {FormControl} from "@angular/forms";

export class ValidatorUtil {

  public static matchWithValidator(toControlName: string) {
    let ctrl: FormControl;
    let toCtrl: FormControl;
    return function matchWith(control: FormControl): {[key: string]: any} {

      if (!control.parent) {
        return null;
      }

      if (!ctrl) {
        ctrl = control;
        toCtrl = control.parent.get(toControlName) as FormControl;

        if (!toCtrl) {
          return null;
        }

        toCtrl.valueChanges.subscribe(() => {
          ctrl.updateValueAndValidity();
        });
      }

      if (ctrl.value !== "" && toCtrl.value !== ctrl.value) {
        return {
          matchWith: true
        }
      }
      return null;
    }
  }
}