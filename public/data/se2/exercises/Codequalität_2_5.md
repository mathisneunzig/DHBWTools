## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class SystemManager {
  users = []; logs = []; config = {};
  addUser(u){ this.users.push(u); this.logs.push("ADD:"+u.name); }
  saveToDisk(){ /* ... */ }
  renderUI(){ document.body.innerHTML = JSON.stringify(this.users); }
}
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
function priceFor(type, base) {
  switch (type) {
    case "student": return base * 0.5;
    case "vip": return base * 0.8;
    default: return base;
  }
}
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class Bird { 
    fly(speed){ return `flying ${speed}`; } 
}
```
``` javascript
class Penguin extends Bird { 
    fly(){ throw new Error("Penguins don't fly"); } 
}
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class USER_Service_ALLINONE {
  constructor() {
    this.DB = [];
    this.endpointURL = "/api/user";
  }
  createUSER(u) {
    if (!u || !u.name || typeof u.age !== "number" || u.age < 0) {
      alert("INVALID");
      return null;
    }
    u.id = String(Date.now());
    this.DB.push(u);
    document.body.innerHTML += "<div>" + u.name + "</div>";
    fetch(this.endpointURL, { method: "POST", body: JSON.stringify(u) });
    return u;
  }
  getALL() { return this.DB; }
}
const S = new USER_Service_ALLINONE();
S.createUSER({ name: "Alice", age: 21 });
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
function CALC_price_BY_TYPE(tp, base) {
  if (tp === "student") return base * 0.5;
  if (tp === "vip") return base * 0.8;
  if (tp === "senior") return base * 0.7;
  if (tp === "employee") return base * 0.6;
  return base;
}
const P1 = CALC_price_BY_TYPE("vip", 100);
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class BaseCounter {
  inc(x) { return x + 1; }
  dec(x) { return x - 1; }
}
```
``` javascript
class WeirdCounter extends BaseCounter {
  inc(x) { throw "no increase"; }
  dec(x) { return [x, x - 1]; }
}
```
``` javascript
const C0 = new BaseCounter().inc(5);
try { new WeirdCounter().inc(5); } catch(e) {}
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class FatContract {
  open() {}
  save() {}
  print() {}
  share() {}
}
```
``` javascript
class ImgThing extends FatContract {
  open() {}
  save() {}
  print() { throw "not implemented"; }
  share() { throw "not implemented"; }
}
```
``` javascript
function useFat(x) {
  x.open();
  x.save();
}
```
``` javascript
const it = new ImgThing();
useFat(it);
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class ChipX {
  constructor(id) { this.id = id; }
  readSerial() { return this.id; }
}
```
``` javascript
class CardY {
  constructor(chip) { this.chip = chip; }
  getChip() { return this.chip; }
}
```
``` javascript
class AccountZ {
  constructor(card) { this.card = card; }
  getCard() { return this.card; }
}
```
``` javascript
class USER_A {
  constructor(account) { this.account = account; }
  getAccount() { return this.account; }
}
```
``` javascript
const u1 = new USER_A(new AccountZ(new CardY(new ChipX("abc123"))));
const serialUPPER = u1.getAccount().getCard().getChip().readSerial().toUpperCase();
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class bank_account {
  constructor() {
    this.balance = 100;
    this.history = [];
  }
}
```
``` javascript
const BA = new bank_account();
BA.balance = -999;
BA.history.push("hack");
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class payMENT_SERVICE_MAIN {
  constructor() {
    this.BASE_rate = 1.0;
  }
  CALC_final_PRICE(userTp, base) {
    if (userTp === "vip") return base * 0.8 + 3;
    if (userTp === "student") return base * 0.5 + 1;
    if (userTp === "employee") return base * 0.6 + 2;
    if (userTp === "senior") return base * 0.7 + 1.5;
    if (userTp === "partner") return base * 0.65 + 2.2;
    if (userTp === "guest") return base + 5;
    return base * this.BASE_rate;
  }
  RUN_pay(nAme, userTp, amt) {
    const idV = String(Date.now());
    const f = this.CALC_final_PRICE(userTp, amt);
    return { idV, nAme, userTp, amt, f };
  }
}
```
``` javascript
const S1_MAIN = new payMENT_SERVICE_MAIN();
S1_MAIN.RUN_pay("Alice", "vip", 120);
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class ShAPE_APP_ALL {
  constructor() {
    this.OUT_path = "/api/out";
  }
  RENDER_SHAPE(s) {
    if (s.kind === "circle") return "CIRC:" + s.r + ":" + s.cx + ":" + s.cy;
    if (s.kind === "square") return "SQR:" + s.a + ":" + s.x + ":" + s.y;
    if (s.kind === "triangle") return "TRI:" + s.ax + ":" + s.ay + ":" + s.bx + ":" + s.by + ":" + s.cx + ":" + s.cy;
    if (s.kind === "hexagon") return "HEX:" + s.s + ":" + s.x + ":" + s.y;
    return "UNK";
  }
  EXPORT(data, fmt) {
    if (fmt === "csv") return data.map(x => Object.values(x).join(",")).join("\n");
    if (fmt === "json") return JSON.stringify(data);
    if (fmt === "xlsx") return "XLSX_" + data.length;
    if (fmt === "pdf") return "PDF_" + data.length;
    return "NA";
  }
}
```
``` javascript
const APPx = new ShAPE_APP_ALL();
const LISTx = [
  { kind: "circle", r: 5, cx: 2, cy: 3 },
  { kind: "square", a: 4, x: 10, y: 10 }
];
APPx.RENDER_SHAPE(LISTx[0]);
APPx.EXPORT(LISTx, "csv");
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip

## Codequalität {name:"Codequalität"}
Nennen Sie, gegen welche Coderegeln im Folgenden verstoßen wird. Beschreiben Sie danach auch, wie dieser Verstoß aufgehoben werden kann.
``` javascript
class NOTIFY_SYSTEM {
  constructor() {
    this.RETRY_cnt = 2;
  }
  send(providerTp, to, msg) {
    if (providerTp === "email") return "EMAIL->" + to + "::" + msg;
    if (providerTp === "sms") return "SMS->" + to + "::" + msg;
    if (providerTp === "push") return "PUSH->" + to + "::" + msg;
    if (providerTp === "slack") return "SLACK->" + to + "::" + msg;
    if (providerTp === "teams") return "TEAMS->" + to + "::" + msg;
    return "NO_PROVIDER";
  }
  broadCast(list, providerTp) {
    const res = [];
    for (let i = 0; i < list.length; i++) {
      const r = this.send(providerTp, list[i].to, list[i].msg);
      res.push(r);
    }
    return res;
  }
}
```
``` javascript
const notification_system = new NOTIFY_SYSTEM();
notification_system.broadCast([{ to: "ops@x", msg: "up" }, { to: "+49123", msg: "ok" }], "sms");
```
- [ ] Single-Responsibility_Prinzip
- [ ] Open-Closed-Prinzip
- [ ] Namenskonventionen
- [ ] Liskovsche Substitutionsprinzip
- [ ] Information Hiding
- [ ] Interface-Segregation-Prinzip
- [ ] Law of Demeter
- [ ] Dependency-Inversion-Prinzip