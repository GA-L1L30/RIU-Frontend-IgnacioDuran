import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialog} from '@angular/material/dialog';
import {of} from 'rxjs';
import {HeroesPage} from './heroes-page';
import {HeroService} from '../../../../core/services/hero.service';
import {Hero} from '../../../../core/models/hero';
import {signal} from '@angular/core';

describe('HeroesPage', () => {
  let component: HeroesPage;
  let fixture: ComponentFixture<HeroesPage>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let mockHeroService: jasmine.SpyObj<HeroService>;

  beforeEach(async () => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    mockHeroService = jasmine.createSpyObj('HeroService', ['addHero', 'updateHero', 'deleteHero'], {
      heroes: signal([]),
      loading: signal(false)
    });

    await TestBed.configureTestingModule({
      imports: [HeroesPage, NoopAnimationsModule],
      providers: [
        {provide: MatDialog, useValue: mockDialog},
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
    const mockDialogRef = {afterClosed: () => of(null)};
    mockDialog.open.and.returnValue(mockDialogRef as any);

    component.onAdd();

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should open edit dialog', () => {
    const hero: Hero = {id: 1, name: 'Superman'};
    const mockDialogRef = {afterClosed: () => of(null)};
    mockDialog.open.and.returnValue(mockDialogRef as any);

    component.onEdit(hero);

    expect(mockDialog.open).toHaveBeenCalled();
  });

  it('should open delete dialog', () => {
    const mockDialogRef = {afterClosed: () => of(false)};
    mockDialog.open.and.returnValue(mockDialogRef as any);

    component.onDeleteHero(1);

    expect(mockDialog.open).toHaveBeenCalled();
  });
});
