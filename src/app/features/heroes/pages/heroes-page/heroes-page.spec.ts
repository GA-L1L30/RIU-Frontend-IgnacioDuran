import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {OverlayModule} from '@angular/cdk/overlay';
import {of} from 'rxjs';
import {HeroesPage} from './heroes-page';
import {HeroService} from '../../../../core/services/hero.service';
import {Hero} from '../../../../core/models/hero';
import {signal} from '@angular/core';

describe('HeroesPage', () => {
  let component: HeroesPage;
  let fixture: ComponentFixture<HeroesPage>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    mockHeroService = jasmine.createSpyObj('HeroService', ['addHero', 'updateHero', 'deleteHero'], {
      heroes: signal([]),
      loading: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [HeroesPage, NoopAnimationsModule, MatDialogModule, OverlayModule],
      providers: [
        {provide: HeroService, useValue: mockHeroService}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open add dialog', () => {
    spyOn(component['dialog'], 'open').and.returnValue({afterClosed: () => of(null)} as any);
    component.onAdd();
    expect(component['dialog'].open).toHaveBeenCalled();
  });

  it('should open edit dialog', () => {
    spyOn(component['dialog'], 'open').and.returnValue({afterClosed: () => of(null)} as any);
    const hero: Hero = {id: 1, name: 'Superman'};
    component.onEdit(hero);
    expect(component['dialog'].open).toHaveBeenCalled();
  });

  it('should open delete dialog', () => {
    spyOn(component['dialog'], 'open').and.returnValue({afterClosed: () => of(false)} as any);
    component.onDeleteHero(1);
    expect(component['dialog'].open).toHaveBeenCalled();
  });
});
