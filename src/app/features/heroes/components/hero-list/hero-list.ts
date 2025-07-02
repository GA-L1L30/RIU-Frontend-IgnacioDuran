import {Component, computed, signal, Output, EventEmitter} from '@angular/core';
import {HeroService} from '../../../../core/services/hero.service';
import {Hero} from '../../../../core/models/hero';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Loading} from '../../../../shared/components/loading/loading';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.html',
  styleUrl: './hero-list.scss',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatPaginatorModule, MatLabel, MatFormField, MatInput, Loading]
})
export class HeroList {
  @Output() editHeroEvent = new EventEmitter<Hero>();
  @Output() deleteHeroEvent = new EventEmitter<number>();

  nameFilter = signal('');
  idFilter = signal('');
  page = signal(1);

  readonly pageSize = 3;

  readonly loading;


  filteredHeroes = computed(() => {
    const nameFilterTerm = this.nameFilter().toLowerCase();
    const idFilterTerm = this.idFilter();

    let heroes = this.heroService.heroes();

    if (nameFilterTerm) {
      heroes = heroes.filter(hero =>
        hero.name.toLowerCase().includes(nameFilterTerm)
      );
    }

    if (idFilterTerm) {
      const idNumber = parseInt(idFilterTerm, 10);
      if (!isNaN(idNumber)) {
        heroes = heroes.filter(hero => hero.id === idNumber);
      }
    }

    return heroes;
  });

  pagedHeroes = computed(() => {
    const start = (this.page() - 1) * this.pageSize;
    return this.filteredHeroes().slice(start, start + this.pageSize);
  });

  totalPages = computed(() => {
    return Math.ceil(this.filteredHeroes().length / this.pageSize) || 1;
  });


  constructor(private heroService: HeroService) {
    this.loading = this.heroService.loading;
  }

  onNameFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.nameFilter.set(value);
    this.page.set(1);
  }

  onIdFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.idFilter.set(value);
    this.page.set(1);
  }

  clearFilters() {
    this.nameFilter.set('');
    this.idFilter.set('');
    this.page.set(1);
  }

  nextPage() {
    if (this.page() < this.totalPages()) {
      this.page.set(this.page() + 1);
    }
  }

  prevPage() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
    }
  }

  addHero(name: string) {
    this.heroService.addHero(name);
    this.nameFilter.set('');
    this.idFilter.set('');
    this.page.set(this.totalPages());
  }

  editHero(hero: Hero) {
    this.editHeroEvent.emit(hero);
  }

  deleteHero(id: number) {
    this.deleteHeroEvent.emit(id);
    if (this.page() > this.totalPages()) {
      this.page.set(this.totalPages());
    }
  }
}
