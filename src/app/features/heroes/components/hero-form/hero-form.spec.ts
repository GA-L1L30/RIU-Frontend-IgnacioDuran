import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {HeroForm} from './hero-form';
import {Hero} from '../../../../core/models/hero';

describe('HeroForm', () => {
  let component: HeroForm;
  let fixture: ComponentFixture<HeroForm>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<HeroForm>>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [HeroForm, NoopAnimationsModule],
      providers: [
        {provide: MatDialogRef, useValue: mockDialogRef},
        {provide: MAT_DIALOG_DATA, useValue: {hero: null}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeroForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be invalid when name is empty', () => {
    component.nameControl.setValue('');
    expect(component.nameControl.valid).toBeFalse();
  });

  it('should be invalid when name is too short', () => {
    component.nameControl.setValue('ab');
    expect(component.nameControl.valid).toBeFalse();
  });

  it('should be valid when name is correct', () => {
    component.nameControl.setValue('Superman');
    expect(component.nameControl.valid).toBeTrue();
  });

  it('should submit when valid', () => {
    component.nameControl.setValue('Superman');
    component.onSubmit();
    expect(mockDialogRef.close).toHaveBeenCalledWith({
      id: undefined,
      name: 'Superman'
    });
  });

  it('should cancel', () => {
    component.onCancel();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it('should load hero data', () => {
    const hero: Hero = {id: 1, name: 'Batman'};
    component.data.hero = hero;
    component.nameControl.setValue(hero.name);
    expect(component.nameControl.value).toBe('Batman');
  });
});
