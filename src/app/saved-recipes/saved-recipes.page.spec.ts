import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavedRecipesPage } from './saved-recipes.page';

describe('SavedRecipesPage', () => {
  let component: SavedRecipesPage;
  let fixture: ComponentFixture<SavedRecipesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedRecipesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavedRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
