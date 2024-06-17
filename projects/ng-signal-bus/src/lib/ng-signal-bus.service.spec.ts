import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MetaData, SignalBusService } from './ng-signal-bus.service';

describe('SignalBusService', () => {
  let service: SignalBusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalBusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should throw error when index is empty', () => {
    expect(() => {
      service.publish('', 'Netherlands wins over Germany in the finals');
    }).toThrow(new Error('Index cannot be empty'));
  });

  it('Send and listen to eventBus', fakeAsync(() => {
    let metaData: MetaData = { data: {}, timestamp: 0};
    service.subscribe('sport', data => {
      metaData = data;
    });
    service.publish('sport', 'Netherlands wins over Germany in the finals');
    tick();
    expect(metaData.data).toEqual('Netherlands wins over Germany in the finals');
    expect(metaData.timestamp).toBeGreaterThan(0);
  }));

  it('Wildcards with matchquery', () => {
    expect(service.matchQuery('sport', 'sport')).toBeTruthy()
    expect(service.matchQuery('sport', 'sports')).toBeFalsy()
    expect(service.matchQuery('anyValue', '*')).toBeTruthy()
    expect(service.matchQuery('sports:soccer', 'sports:*')).toBeTruthy()
  });

  it('Send and listen to eventBus with wildcards', fakeAsync(() => {
    let metaData: MetaData = { data: {}, timestamp: 0};
    service.subscribe('sport:*', data => {
      metaData = data;
    });
    service.publish('sport:soccer', 'Latest news about soccer');
    tick();
    expect(metaData.data).toEqual('Latest news about soccer');
    expect(metaData.timestamp).toBeGreaterThan(0);
  }));
});
