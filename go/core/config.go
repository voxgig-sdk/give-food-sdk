package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "GiveFood",
			"slug": "give-food",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://www.givefood.org.uk/api/2",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"article": map[string]any{},
				"donationpoint": map[string]any{},
				"foodbank": map[string]any{},
				"item": map[string]any{},
			},
		},
		"entity": map[string]any{
			"article": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "foodbank_slug",
						"short": "Related food bank identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the article",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "published",
						"short": "Publication date",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "source",
						"short": "Publication source",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Article title",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "URL to the article",
						"type": "`$STRING`",
					},
				},
				"name": "article",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/articles/",
								"parts": []any{
									"articles",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"donationpoint": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"short": "Physical address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "foodbank_slug",
						"short": "Associated food bank identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the donation point",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"short": "Postal code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"short": "Unique identifier for the donation point",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of donation point (e.g., supermarket, collection point)",
						"type": "`$STRING`",
					},
				},
				"name": "donationpoint",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/donationpoints/",
								"parts": []any{
									"donationpoints",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/donationpoints/{slug}/",
								"parts": []any{
									"donationpoints",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"foodbank": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "address",
						"short": "Physical address of the food bank",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"short": "Contact email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "items_needed",
						"short": "List of items currently needed for donation",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "latitude",
						"short": "Latitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "longitude",
						"short": "Longitude coordinate",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the food bank",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "needs",
						"short": "Current needs status",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "phone",
						"short": "Contact phone number",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "postcode",
						"short": "Postal code",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "shopping_list_url",
						"short": "URL to the food bank's detailed shopping list",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "slug",
						"short": "Unique identifier for the food bank",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated",
						"short": "Last update timestamp",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "Website URL",
						"type": "`$STRING`",
					},
				},
				"name": "foodbank",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/foodbanks/",
								"parts": []any{
									"foodbanks",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "slug",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/foodbanks/{slug}/",
								"parts": []any{
									"foodbanks",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"slug": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"item": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "created",
						"short": "When this need was recorded",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "foodbank_slug",
						"short": "Food bank identifier",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the item need record",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "item",
						"short": "Name of the item needed",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "updated",
						"short": "Last update timestamp",
						"type": "`$STRING`",
					},
				},
				"name": "item",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"example": "json",
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/items/",
								"parts": []any{
									"items",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
