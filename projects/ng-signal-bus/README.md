# SignalBus

Angular signal based message/event bus service for Angular.
Under the hood it's using a signal to store and mutate data, the effect() calls the callback function to update subscribers.

Note: Only tested with Angular v18.

## Use cases

- Communication between component without a state library, just straightforward communication.
- Widget A updates Widgets B anywhere in the application
- Logger

## Playground

[Stackblitz](https://stackblitz.com/edit/stackblitz-starters-ahglvf?file=src%2Fapp%2Fwidget-add-grocery-items%2Fwidget-add-grocery-items.component.html)

# Installation

```
npm install --save ng-signal-bus
```

# Usage

## Basic implementation

```
import { SignalBusService } from 'ng-signal-bus' 

@Component({
  selector: 'app-widget-add-grocery-items',
  standalone: true,
})
export class WidgetAddGroceryItemsComponent {
  signalBus = inject(SignalBusService)
}

```

## Publish
```
import { SignalBusService } from 'ng-signal-bus' 

@Component({
  selector: 'app-widget-add-grocery-items',
  standalone: true,
})
export class WidgetAddGroceryItemsComponent {
  signalBus = inject(SignalBusService)

  constructor() {
    this.publish('grocerylist:add', 'Banana')
  }

  publish(key:string, data: any) {
    this.signalBus.publish(key, data)
  }
}
```

## Subscribe

```
import { SignalBusService } from 'ng-signal-bus' 

@Component({
  selector: 'app-widget-add-grocery-items',
  standalone: true,
})
export class WidgetAddGroceryItemsComponent {
  signalBus = inject(SignalBusService)

  ngOnInit() {
     this.signalBus.subscribe('grocerylist:add', (metaData) => {
      // Outputs { data: 'Banana', timestamp: 1434342 }
      console.log(metaData);
    });
  }
}
```

# Set signal values inside the callback

The callback function runs in the effect() excecution context which not allow to update/write to any signals.
To allow this, untracked is used. Untracked will run the function without creating dependencies.

```
untracked(() => callback(data.metaData));
```

## Example

```
import { model } from '@angular/core';

items = model<Item[]>([]);

addItem(title: string = '') {
    this.items.update((items: Item[]) => {
      return [...items, { title }];
    });
}

ngOnInit() {
  this.signalBus.subscribe('*', (metaData) => {
    this.addItem(metaData.data);
  });
}
```
