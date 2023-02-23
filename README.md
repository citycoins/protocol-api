# CityCoins Protocol API

The new and improved version of the [CityCoins API](https://github.com/citycoins/api), developed to work with the [CityCoins Protocol](https://github.com/citycoins/protocol) contracts.

## Endpoints

The base URL is `https://protocol.citycoins.co/api/`

The URLs are formatted: `contract-name/function-name?param1=x&param2=y`

Function and parameter names match the contract function definitions.

Responses include:

- `status: 400` for missing parameters and
- `status: 404` if a none value is returned, or if there is an issue with the query
- `status: 200` returns data as JSON strings _(formats coming soon)_
  - single values are returned as-is: number, string, and boolean
  - object types are defined in [`lib/api-helpers.ts`](./lib/api-helpers.ts)

### Examples

**base-dao:** What block height was ccip012-bootstrap executed at?
https://protocol.citycoins.co/api/base-dao/executed-at?proposal=SP8A9HZ3PKST0S42VM9523Z9NV42SZ026V4K39WH.ccip012-bootstrap

**ccd001-direct-execute:** Is the address `SP7DGES13508FHRWS1FB0J3SZA326FP6QRMB6JDE` an approver?
https://protocol.citycoins.co/api/ccd001-direct-execute/is-approver?who=SP7DGES13508FHRWS1FB0J3SZA326FP6QRMB6JDE

**ccd002-treasury**: What is the balance of the `ccd002-treasury-mia-mining` contract?
https://protocol.citycoins.co/api/ccd002-treasury/get-balance-stx?contractName=ccd002-treasury-mia-mining

**ccd003-user-registry:** What is the user ID for `SP7DGES13508FHRWS1FB0J3SZA326FP6QRMB6JDE`?
https://protocol.citycoins.co/api/ccd003-user-registry/get-user-id?user=SP7DGES13508FHRWS1FB0J3SZA326FP6QRMB6JDE

**ccd004-city-registry:** What is the city ID for MIA?
https://protocol.citycoins.co/api/ccd004-city-registry/get-city-id?cityName=mia

**ccd005-city-data:** What are the city activation details and treasury info for MIA?
https://protocol.citycoins.co/api/ccd005-city-data/get-city-info?cityId=1&treasuryName=mining

**ccd006-citycoin-mining:** What are the mining stats at block 87,000?
https://protocol.citycoins.co/api/ccd006-citycoin-mining/get-mining-stats?cityId=1&height=87000

**ccd007-citycoin-stacking:** What is the current reward cycle?
_note: matches Stacks reward cycles now!_
https://protocol.citycoins.co/api/ccd007-citycoin-stacking/get-current-reward-cycle

**ccd011-stacking-payouts:** Who is the pool operator?
https://protocol.citycoins.co/api/ccd011-stacking-payouts/get-pool-operator

## Development

To run locally:

```
npm install
npm run build
npx wrangler pages dev dist/
```

Or as a one-liner:

`npm run build && npx wrangler pages dev dist/`
