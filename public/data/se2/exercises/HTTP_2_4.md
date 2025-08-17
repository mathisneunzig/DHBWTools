## HTTP-Anfrage {name:"HTTP-Anfrage"}
<p>Skizzieren Sie, wie eine typische <b>PATCH</b>-Anfrage von einem Client an einen Server aussieht. Achten Sie auch auf sinnhafte Werte für Request und Response sowie eine Beispieltabelle mit Daten auf dem Server.</p>

## REST {name:"REST"}
<p>Erläutern Sie die Funktionsweise von REST mit einem Beispiel.</p>

## GraphQL {name:"GraphQL"}
<p>Erläutern Sie die Funktionsweise von GraphQL mit einem Beispiel.</p>

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Mutation:
``` json
query SearchProducts($keyword: String!, $first: Int!, $after: String) {
  searchProducts(keyword: $keyword, first: $first, after: $after) {
    edges {
      node {
        id
        name
        price
      }
      cursor
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
```

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Mutation:
``` json
mutation AddReview($productId: ID!, $rating: Int!, $comment: String) {
  addReview(productId: $productId, rating: $rating, comment: $comment) {
    id
    rating
    comment
    createdAt
    author {
      id
      name
    }
  }
}

```

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Mutation:
``` json
query AllPosts {
  posts {
    id
    title
    content
    author {
      id
      name
    }
    comments {
      id
      text
      createdAt
    }
  }
}
```

## GraphQL {name:"GraphQL"}
Analysieren und erläutern Sie die folgende GraphQL-Mutation:
``` json
query GetProducts($minPrice: Float!, $maxPrice: Float!) {
  products(filter: { minPrice: $minPrice, maxPrice: $maxPrice }) {
    id
    name
    price
    inStock
  }
}
```