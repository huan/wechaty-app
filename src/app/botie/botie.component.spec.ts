import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule }  from '@angular/router/testing'
import { Brolog }           from 'brolog'

import { AuthService }      from '../auth.service'

import { WechatyComponent } from '@chatie/angular'

import { BotieComponent } from './botie.component';

describe('BotieComponent', () => {
  let component: BotieComponent;
  let fixture: ComponentFixture<BotieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [
        BotieComponent,
        WechatyComponent,
      ],
      providers: [
        AuthService,
        Brolog,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BotieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
