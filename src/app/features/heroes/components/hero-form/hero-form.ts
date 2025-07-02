import {Component, Inject} from '@angular/core';
import {Hero} from '../../../../core/models/hero';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {signal, computed} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {UppercaseDirective} from '../../../../shared/directives/uppercase.directive';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.html',
  styleUrl: './hero-form.scss',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule, ReactiveFormsModule, UppercaseDirective]
})
export class HeroForm {
  nameControl = new FormControl('', [Validators.required, Validators.minLength(3)]);

  name = toSignal(this.nameControl.valueChanges, {initialValue: ''});
  touched = signal(false);

  constructor(
    public dialogRef: MatDialogRef<HeroForm>,
    @Inject(MAT_DIALOG_DATA) public data: { hero: Hero | null }
  ) {
    if (data.hero) {
      this.nameControl.setValue(data.hero.name);
    }
  }

  readonly nameValid = toSignal(this.nameControl.statusChanges.pipe(
    map(() => this.nameControl.valid)
  ), {initialValue: this.nameControl.valid});

  nameError = computed(() => {
    if (!this.touched()) return '';
    if (this.nameControl.hasError('required')) return 'Nombre Obligatorio';
    return '';
  });

  onSubmit() {
    this.touched.set(true);
    if (this.nameValid()) {
      this.dialogRef.close({id: this.data.hero?.id, name: this.name()});
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
