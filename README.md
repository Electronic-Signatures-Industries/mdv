# document-escrow-contracts

## Test environment

Use mnemonic `will plastic soccer recipe portion cancel leg any history hawk chunk million`

`ganache-cli -m "will plastic soccer recipe portion cancel leg any history hawk chunk million" -i 10`

## Compile

`npm run compile`

## Migrations

`truffle migrate --network development`

## Build Dapp

`NODE_ENV=production NODE_OPTIONS=--max_old_space_size=4096 npm run build`


## Validate p7m

`openssl smime -verify -binary -inform PEM -in a.p7m -content Downloads/Bancos\ Adoptan\ nuevas\ medidas_rev4.pdf.pdf -certfile gfcert.pem -nointern -noverify > /dev/null`