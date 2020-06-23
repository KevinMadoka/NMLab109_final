# Bidchain - secure online bidding system 
## Prerequisites
node.js, npm, ganache-cli, truffle, Metamask(browser add-ons)

## Using Bidchain
clone this repo
```
$ cd NMLab109_final
```
open ganache-cli
```
$ truffle compile
$ truffle migrate
$ cd client
$ npm install
```
In order to import files outside `src` directory,
you should modify line 44 at 
`client/node\_modules/react-dev-utils/ModuleScopePlugin.js` to `return true;`
or run this shell script in `client`:
```
$ chmod -x changeScope.sh
$ bash changeScope.sh
```
After that run `npm start` in `client`
Open browser and go to `http://localhost:3000/`
Copy ganache accounts' private key to Metamask "import account"

