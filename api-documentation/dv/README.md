# DV - Digito Verificador
## DV API v0.1.0
#### Autor:  Rogelio  Morrell C. , 2020
## Introduccion
**DV** es un contrato inteligente que encapsula el algoritmo de digito verificador utilizado por la Direccion General de Ingresos para verificacion de la secuencia de credenciales como RUCs y cedulas.  

## Contratos

### DV
`DV` contiene dos metodos:

* getFee
* calc

### getFee
Obtiene el monto en wei del costo del servicio


### calc
Solicita el calculo del DV y retorna el resultado por `LogDV`.


> Para la version 0.1.0 solo esta habilitado Personas Naturales

#### Ejemplos
```javascript
const Web3 = require('web3');
const web3 = new Web3();
const BigNumber = require('bignumber.js');
const ethers = require('ethers');

contract('DV', (accounts) => {
  let owner;

  let DVContract = artifacts.require('DV');
        let ruc20 = [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ];

  let mapper = {
    N: 5,
    NT: [4, 3],
    E: 5,
    P: 7,
    I: 9,
    AV: [1, 5],
  };

  contract('#dv', () => {
    before(async () => {
      owner = accounts[0];
      contract = await DVContract.new();
      await contract.seed();
      assert.equal(contract !== null, true);
    });

    describe('when verifying N identities', () => {
      it('should verify 827400125 to match 91', async () => {

        const id = [
          mapper.N,
          ...[0, 8],
          ...[0, 0],
          ...[2, 7, 4, 0, 0, 1, 2, 5],
        ];

        let ruc21 = [...ruc20.slice(0, 20 - id.length), ...id, 0];
      const resp = await contract.calc(ruc21.map((i) => new BigNumber(i)), {
        value: 0.002*1e18
      });
        assert.equal(resp.receipt.logs[0].args[0].join(''), 91);
      });


      it('should verify 8274301253 to match 31', async () => {

        const id = [
        mapper.N,
          ...[0, 8],
          ...[0, 0],
          ...[2, 7, 4, 3, 0],
          ...[1, 2, 5, 3],
        ];

        let ruc21 = [...ruc20.slice(0, 20 - id.length), ...id, 0];
        const resp = await contract.calc(ruc21.map((i) => new BigNumber(i)), {
        value: 0.002*1e18
      });
        assert.equal(resp.receipt.logs[0].args[0].join(''), 31);
      });

      it('should verify 87132230 to match 11', async () => {

        const id = [
        mapper.N,
          ...[0, 8],
          ...[0, 0],
          ...[7, 1, 3],
          ...[2, 2, 3],
        ];

        let ruc21 = [...ruc20.slice(0, 20 - id.length), ...id, 0];
        const resp = await contract.calc(ruc21.map((i) => new BigNumber(i)), {
        value: 0.002*1e18
      });
        assert.equal(resp.receipt.logs[0].args[0].join(''), 11);
      });


      it('should verify 8747704 to match 67', async () => {

        const id = [
        mapper.N,
          ...[0, 8],
          ...[0, 0],
          ...[7, 4, 7, 0, 0], 
          ...[7, 0, 4],
        ];

        let ruc21 = [...ruc20.slice(0, 20 - id.length), ...id, 0];
        const resp = await contract.calc(ruc21.map((i) => new BigNumber(i)), {
        value: 0.002*1e18
      });
        assert.equal(resp.receipt.logs[0].args[0].join(''), 67);
      });

      it('should verify 8NT0010024 to match 33', async () => {

        const id = [
          mapper.N,
          ...[0, 8],
          ...mapper.NT,
          ...[0, 0, 1, 0, 0, 0, 2, 4],
        ];

        let ruc21 = [...ruc20.slice(0, 20 - id.length), ...id, 0];
        const resp = await contract.calc(ruc21.map((i) => new BigNumber(i)), {
        value: 0.002*1e18
      });
        assert.equal(resp.receipt.logs[0].args[0].join(''), 33);
      });


      it('should verify 8NT001123456 to match 76', async () => {

        const id = [
          mapper.N,
          ...[0, 8],
          ...mapper.NT,
          ...[0, 0, 1, 1, 2, 3, 4, 5, 6],
        ];

        let ruc21 = [...ruc20.slice(0, 20 - id.length), ...id, 0];
        const resp = await contract.calc(ruc21.map((i) => new BigNumber(i)), {
        value: 0.002*1e18
      });
        assert.equal(resp.receipt.logs[0].args[0].join(''), 76);
      });


      it('should verify PE0010019 to match 60', async () => {

        const id = [
          mapper.N,
          ...[0, 0],
          ...[mapper.P, mapper.E],
          ...[0, 0, 1, 0, 0, 0, 1, 9],
        ];

        let ruc21 = [...ruc20.slice(0, 20 - id.length), ...id, 0];
        const resp = await contract.calc(ruc21.map((i) => new BigNumber(i)), {
        value: 0.002*1e18
      });
        assert.equal(resp.receipt.logs[0].args[0].join(''), 60);
      });


    });


  });
});

```


## Ambientes de pruebas

### Ropsten

* **DV**: `0x254007C1d411004e325e74B790DECc29D7122b1a`

## Mainnet

**Pronto**
