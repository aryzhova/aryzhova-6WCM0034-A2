import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyRecipesPage } from './my-recipes.page';

describe('MyRecipesPage', () => {
  let component: MyRecipesPage;
  let fixture: ComponentFixture<MyRecipesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRecipesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyRecipesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
