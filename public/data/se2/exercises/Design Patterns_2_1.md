## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Facade</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Prototype</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Adapter</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Iterator</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Memento</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Observer</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Composite</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Multiple-Choice-Aufgabe {name:"Multiple-Choice-Aufgabe Design Patterns"}
Zu welcher Kategorie von Patterns gehört das <b>Visitor</b> Pattern?
- [ ] Creational Pattern
- [ ] Messaging Pattern
- [ ] Structural Pattern
- [ ] Behavioral Pattern

## Design Pattern Implementierung {name:"Design Pattern Implementierung"}
Um welches Design Pattern handelt es sich hier im Code?
``` javascript
const base = { hello(){ return `hi ${this.name}`; } };
const copy = Object.assign(Object.create(base), { name: 'X' });
console.log(copy.hello());
```

## Design Pattern Implementierung {name:"Design Pattern Implementierung"}
Um welches Design Pattern handelt es sich hier im Code?
``` javascript
const arr=[10,20]; const it=arr[Symbol.iterator]();
console.log(it.next().value, it.next().value);

```

## Design Pattern Implementierung {name:"Design Pattern Implementierung"}
Um welches Design Pattern handelt es sich hier im Code?
``` javascript
const nodes=[{type:'a',v:1},{type:'b',v:2}];
const visit={ a:n=>'A'+n.v, b:n=>'B'+n.v };
console.log(nodes.map(n=>visit[n.type](n)).join(''));
```