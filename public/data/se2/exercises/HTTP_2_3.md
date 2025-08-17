## REST {name:"REST"}
<p>Erläutern Sie die Funktionsweise von REST.</p>

## GraphQL {name:"GraphQL"}
<p>Erläutern Sie die Funktionsweise von GraphQL.</p>

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Query:
``` json
query GetPet($id: ID!) {
  pets(id: $id) {
    name
    owner {
      name
    }
  }
}

```

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Mutation:
``` json
mutation UpdatePet($id: ID!, $name: String!) {
  updatePet(id: $id, name: $name) {
    id
    name
  }
}
```

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Mutation:
``` json
mutation CreateUser($name: String!, $email: String!) {
  createUser(input: { name: $name, email: $email }) {
    id
    name
    email
    createdAt
  }
}

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Mutation:
``` json
mutation UpdateProduct($id: ID!, $price: Float!, $stock: Int!) {
  updateProduct(id: $id, input: { price: $price, stock: $stock }) {
    id
    name
    price
    inStock
  }
}
```

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Mutation:
``` json
mutation PlaceOrder($userId: ID!, $items: [OrderItemInput!]!) {
  placeOrder(userId: $userId, items: $items) {
    id
    total
    status
    createdAt
  }
}
```

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Mutation:
``` json
query GetUserWithOrders($id: ID!) {
  user(id: $id) {
    id
    name
    email
    orders {
      id
      total
      createdAt
    }
  }
}
```

## REST {name:"REST"}
Prüfen Sie den folgenden Request-Entwurf. Beschreiben Sie mindestens drei Probleme und schlagen Sie Verbesserungen vor.
```http
POST /users/123
Content-Type: application/json

{
  "id": 123,
  "operation": "update",
  "name": "Alice",
  "zip_code": 15238
}
```