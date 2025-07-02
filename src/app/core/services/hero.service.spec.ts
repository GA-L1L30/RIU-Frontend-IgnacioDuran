import {TestBed} from '@angular/core/testing';
import {HeroService} from './hero.service';

describe('HeroService', () => {
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HeroService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should have initial heroes', () => {
    expect(service.heroes().length).toBe(2);
    expect(service.heroes()[0].name).toBe('Batichica');
  });

  it('should find hero by id', () => {
    const hero = service.getHeroById(1);
    expect(hero?.name).toBe('Batichica');
  });

  it('should search heroes', () => {
    const results = service.searchHeroes('bat');
    expect(results.length).toBe(2);
  });

  it('should add hero', async () => {
    await service.addHero('Superman');
    expect(service.heroes().length).toBe(3);
    expect(service.heroes()[2].name).toBe('Superman');
  });

  it('should update hero', async () => {
    await service.updateHero(1, 'Wonder Woman');
    const hero = service.getHeroById(1);
    expect(hero?.name).toBe('Wonder Woman');
  });

  it('should delete hero', async () => {
    await service.deleteHero(1);
    expect(service.heroes().length).toBe(1);
    expect(service.getHeroById(1)).toBeUndefined();
  });
});
