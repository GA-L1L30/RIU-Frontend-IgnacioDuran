import {Component} from '@angular/core';
import {Hero} from '../../../../core/models/hero';
import {HeroService} from '../../../../core/services/hero.service';
import {HeroList} from '../../components/hero-list/hero-list';
import {HeroForm} from '../../components/hero-form/hero-form';
import {ConfirmDialog} from '../../../../shared/components/confirm-dialog/confirm-dialog';
import {UppercaseDirective} from '../../../../shared/directives/uppercase.directive';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {CommonModule} from '@angular/common';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-heroes-page',
  templateUrl: './heroes-page.html',
  styleUrl: './heroes-page.scss',
  standalone: true,
  imports: [CommonModule, HeroList, HeroForm, ConfirmDialog, UppercaseDirective, MatButton, MatDialogModule, RouterOutlet, RouterLink]
})
export class HeroesPage {
  constructor(
    private heroService: HeroService,
    private dialog: MatDialog
  ) {
  }

  onAdd() {
    const dialogRef = this.dialog.open(HeroForm, {
      width: '500px',
      data: {hero: null},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.name) {
        await this.heroService.addHero(result.name);
      }
    });
  }


  onEdit(hero: Hero) {
    const dialogRef = this.dialog.open(HeroForm, {
      width: '500px',
      data: {hero},
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (result && result.name) {
        await this.heroService.updateHero(hero.id, result.name);
      }
    });
  }

  onDeleteHero(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      width: '320px',
      data: {message: 'Estás seguro de borrar este héroe?'},
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(async (confirmed) => {
      if (confirmed) {
        await this.heroService.deleteHero(id);
      }
    });
  }
}
