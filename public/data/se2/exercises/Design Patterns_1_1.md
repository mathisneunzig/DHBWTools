## Design Patterns {name:"Design Patterns"}
<p>Nennen Sie ein Design Patterns aus der Kategorie der Creational Patterns.</p>

## Design Patterns {name:"Design Patterns"}
<p>Nennen Sie ein Design Patterns aus der Kategorie der Structural Patterns.</p>

## Design Patterns {name:"Design Patterns"}
<p>Nennen Sie ein Design Patterns aus der Kategorie der Behavioral Patterns.</p>

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Factory Method</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Factory</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Builder</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Singleton</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Decorator</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Strategy</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Design Pattern Implementierung {name:"Design Pattern Implementierung"}
Um welches Design Pattern handelt es sich hier im Code?
``` javascript
class AnimalMaker {
  create() { return this.make(); }
}
class DogMaker extends AnimalMaker {
  make() { return { sound: 'woof' }; }
}
class CatMaker extends AnimalMaker {
  make() { return { sound: 'meow' }; }
}
console.log(new DogMaker().create(), new CatMaker().create());
```

## Design Pattern Implementierung {name:"Design Pattern Implementierung"}
Um welches Design Pattern handelt es sich hier im Code?
``` javascript
class Meal {
  constructor(){ this.parts=[]; }
  add(p){ this.parts.push(p); return this; }
  finish(){ return this.parts.join(' '); }
}
console.log(new Meal().add('🥩').add('🥗').finish());
```

## Design Pattern Implementierung {name:"Design Pattern Implementierung"}
Um welches Design Pattern handelt es sich hier im Code?
``` javascript
const Config = (()=>{ let inst; return ()=>inst??(inst={ lang:'en' }); })();
console.log(Config() === Config());
```

## Design Pattern Implementierung {name:"Design Pattern Implementierung"}
Um welches Design Pattern handelt es sich hier im Code?
``` javascript
function base(){ return 'x'; }
function extra(fn){ return ()=> fn()+'+'; }
console.log(extra(base)());
```