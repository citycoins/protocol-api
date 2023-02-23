# CityCoins Protocol API

The new and improved version of the [CityCoins API](https://github.com/citycoins/api), developed to work with the [CityCoins Protocol](https://github.com/citycoins/protocol) contracts.

## Endpoints

The base URL is `https://protocol.citycoins.co/api/`

The URLs are formatted: `contract-name/function-name?param1=x&param2=y`

Function and parameter names match the contract function definitions.

## Development

To run locally:

```
npm install
npm run build
npx wrangler pages dev dist/
```

Or as a one-liner:

`npm run build && npx wrangler pages dev dist/`
