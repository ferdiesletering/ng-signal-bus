import { Injectable, Injector, effect, signal, untracked } from '@angular/core';

export interface MetaData {
  data: any;
  timestamp: number;
}

interface EventBus {
  key: string;
  metaData: MetaData;
}

@Injectable({
  providedIn: 'root',
})
export class SignalBusService {
  private eventBus = signal<EventBus>({
    key: '',
    metaData: { data: {}, timestamp: 0 },
  });

  constructor(private injector: Injector) {}

  publish(index: string, data: any) {
    if(index.length === 0) throw new Error('Index cannot be empty');

    if( data.length === 0 || Object.keys(data).length === 0 ) throw new Error('Data cannot be empty');

    this.eventBus.set({
      key: index,
      metaData: { data: data, timestamp: new Date().getTime() },
    });
  }

  private matchQuery(key:string, query: string) {
    if(key === query) return true;

    if( query === '*' ) return true

    if( key.includes(':') && query.includes(':') ) {
      const key1 = key.split(':')[0];
      const [query1, query2] = query.split(':');

      if( key1 === query1 && query2 === '*' ) return true;
    }

    return false;
  }

  subscribe(query: string, callback: (metaData: MetaData) => void) {
    effect(
      () => {
        const data = this.eventBus();

        if (this.matchQuery(data.key, query) && data.metaData.timestamp > 0) {
          untracked(() => callback(data.metaData));
        }
      },
      { injector: this.injector }
    );
  }
}

