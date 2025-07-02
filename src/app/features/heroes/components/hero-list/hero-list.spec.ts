import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HeroList} from './hero-list';
import {HeroService} from '../../../../core/services/hero.service';
import {Hero} from '../../../../core/models/hero';
import {signal} from '@angular/core';

const mockHeroes: Hero[] = [
  {id: 1, name: 'SUPERMAN'},
  {id: 2, name: 'BATMAN'},
  {id: 3, name: 'SPIDERMAN'},
];

describe('HeroList', () => {
  let component: HeroList;
  let fixture: ComponentFixture<HeroList>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['addHero'], {
      heroes: signal([...mockHeroes]),
      loading: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [HeroList, NoopAnimationsModule],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter heroes by name', () => {
    component.nameFilter.set('man');
    expect(component.filteredHeroes().length).toBe(3);
  });

  it('should filter heroes by id', () => {
    component.idFilter.set('1');
    expect(component.filteredHeroes().length).toBe(1);
    expect(component.filteredHeroes()[0].id).toBe(1);
  });

  it('should paginate heroes', () => {
    expect(component.pagedHeroes().length).toBe(3);
    component.page.set(2);
    expect(component.pagedHeroes().length).toBe(0);
  });

  it('should clear filters', () => {
    component.nameFilter.set('test');
    component.idFilter.set('1');
    component.clearFilters();
    expect(component.nameFilter()).toBe('');
    expect(component.idFilter()).toBe('');
  });

  it('should emit edit event', () => {
    spyOn(component.editHeroEvent, 'emit');
    component.editHero(mockHeroes[0]);
    expect(component.editHeroEvent.emit).toHaveBeenCalledWith(mockHeroes[0]);
  });

  it('should emit delete event', () => {
    spyOn(component.deleteHeroEvent, 'emit');
    component.deleteHero(1);
    expect(component.deleteHeroEvent.emit).toHaveBeenCalledWith(1);
  });
});
