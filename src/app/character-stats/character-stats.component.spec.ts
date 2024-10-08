import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterStatsComponent } from './character-stats.component';

describe('CharacterStatsComponent', () => {
  let component: CharacterStatsComponent;
  let fixture: ComponentFixture<CharacterStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
