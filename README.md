# trash_back

trash_back is an application that allows user to search for packaging recycling instructions based on UPC code (barcode).

The original version's scope 1 was built as a group project in September 2023.
This is my modified version.

## current features in front-end
- search products' recycling instructions based on UPC code
- look at a list of products of "Company 1"
- sort products - active/inactive
- activate inactive products
- add new product, product-components and component-materials.

## upcoming features in front-end
- logging in (Company)
- deleting products, product-components and component-materials associated with product
- adding recycling info to each component separately (currently bin can only be added to product)
- logging in (Admin)
- adding new Companies (admin feature)
- activating or deactivating companies (admin feature)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
