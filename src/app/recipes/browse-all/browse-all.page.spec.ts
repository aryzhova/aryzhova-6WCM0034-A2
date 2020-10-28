import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BrowseAllPage } from './browse-all.page';

describe('BrowseAllPage', () => {
  let component: BrowseAllPage;
  let fixture: ComponentFixture<BrowseAllPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseAllPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BrowseAllPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
