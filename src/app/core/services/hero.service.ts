import {computed, Injectable, signal} from '@angular/core';
import {Hero} from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private readonly _heroes = signal<Hero[]>([
    {id: 1, name: 'Batichica'},
    {id: 2, name: 'Batman'}
  ]);

  readonly loading = signal(false);
  readonly heroes = computed(() => this._heroes());

  readonly nextId = computed(() =>
    this.heroes().length + 1
  );

  getHeroById(id: number): Hero | undefined {
    return this._heroes().find(hero => hero.id === id);
  }

  searchHeroes(term: string): Hero[] {
    return this._heroes().filter(hero =>
      hero.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  async addHero(name: string): Promise<void> {
    await this.withLoading(() => {
      const newHero: Hero = {id: this.nextId(), name};
      this._heroes.update(heroes => [...heroes, newHero]);
    });
  }

  async updateHero(id: number, name: string): Promise<void> {
    await this.withLoading(() => {
      this._heroes.update(heroes =>
        heroes.map(hero => (hero.id === id ? {...hero, name} : hero))
      );
    });
  }

  async deleteHero(id: number): Promise<void> {
    await this.withLoading(() => {
      this._heroes.update(heroes => heroes.filter(hero => hero.id !== id));
    });
  }

  private async withLoading(action: () => void | Promise<void>): Promise<void> {
    this.loading.set(true);
    try {
      await new Promise(res => setTimeout(res, 700));
      await action();
    } finally {
      this.loading.set(false);
    }
  }
}
