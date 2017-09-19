import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdInputModule, MdButtonModule, MdExpansionModule, MdProgressBarModule, MdPaginatorModule } from '@angular/material';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CityCardComponent } from './city-card.component';

describe('CityCardComponent', () => {
  let component: CityCardComponent;
  let fixture: ComponentFixture<CityCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MdInputModule, MdButtonModule, MdExpansionModule, MdProgressBarModule, MdPaginatorModule,
        BrowserAnimationsModule, NoopAnimationsModule
      ],
      declarations: [
        CityCardComponent
      ]
    })
      .compileComponents().then(() => {
      const fixture = TestBed.createComponent(CityCardComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app).toBeTruthy();
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
