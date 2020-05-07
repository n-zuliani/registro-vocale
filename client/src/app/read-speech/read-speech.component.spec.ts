import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadSpeechComponent } from './read-speech.component';

describe('ReadSpeechComponent', () => {
  let component: ReadSpeechComponent;
  let fixture: ComponentFixture<ReadSpeechComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadSpeechComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
