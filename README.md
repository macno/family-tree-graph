# Family Tree

## Development

### Install requirements

`npm ci`

### Prepare family-tree data

copy `public/assets/family-tree-sample.json` to `public/assets/family-tree.json` and edit it

### Live preview

`npm start`


## Data structure

```
"id": {
      "first_name": "",
      "second_name": "",
      "surname": "",
      "sex": "", 
      "born": {
        "where": "",
        "date": ""
      },
      "dead": {
        "where": "",
        "date": ""
      },
      "parents": ["parent_1_id", "parent_2_id"]
    }
```

