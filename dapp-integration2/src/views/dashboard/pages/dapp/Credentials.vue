<template>
  <v-container id="regular-tables" fluid tag="section">
    <v-row>
      <v-col>
        <div>
          <v-progress-linear
            :active="loading"
            indeterminate
            color="teal"
          ></v-progress-linear>
        </div>
      </v-col>
    </v-row>

    <base-material-card
      icon="mdi-smart-card"
      title="Credenciales"
      class="px-5 py-3"
    >
      <v-card-text class="headline font-weight-bold">
        <div v-if="hasIdCredential">
          ID emitido para {{ nombre }} {{ apellido }}
        </div>
        <div v-else>No hay identidad emitida aun</div>
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="green">
            <v-icon>mdi-card-account-details-star-outline</v-icon>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-if="hasIdCredential"
              >Emitido {{ creds.emitido }}</v-list-item-title
            >
            <v-list-item-title v-if="!hasIdCredential"
              >Pendiente</v-list-item-title
            >
          </v-list-item-content>

          <v-row align="center" justify="end">
            <v-btn icon color="pink" @click="dialog = true"
              ><v-icon class="mr-1">mdi-account-plus</v-icon></v-btn
            >
            <span class="subheading mr-2">Emitir</span>
            <span class="mr-1">·</span>
            <v-btn icon color="indigo" @click="shareVerifier"
              ><v-icon class="mr-1">mdi-share-variant</v-icon></v-btn
            >
            <span class="subheading">Compartir verificador</span>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </base-material-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="500px">
        <base-material-card>
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Emitir credencial
            </div>
          </template>

          <v-form ref="form" v-model="valid" lazy-validation>
            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field v-model="nombre" label="Nombre" disabled />
            </v-col>

            <v-col class="d-flex" cols="12" sm="12">
              <v-text-field v-model="apellido" label="Apellido" disabled />
            </v-col>

            <v-col class="d-flex" cols="12" sm="12">
              <v-file-input
                chips
                accept="image/jpeg,jpg,png"
                v-model="files"
                label="Imagenes"
              ></v-file-input>
            </v-col>
            <v-btn
              :disabled="loading"
              color="success"
              class="mr-4"
              @click="handleCreateVC"
            >
              Emitir
            </v-btn>
          </v-form>
        </base-material-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BrowserQRCodeReader, QRCodeReader } from "@zxing/library";

import { ethers } from "ethers";
import EthCrypto from "eth-crypto";
import * as ipfs from "ipfs-http-client";
import { EventFilter } from "@decent-bet/solido";
import { filter } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { BigNumber } from "ethers/utils";
import { SolidoSingleton } from "../../components/core/SolidoSingleton";
import { CedulaVC } from "../../../../libs/cedula-vc";
import { MiddlewareOptions } from "../../../../libs";
import { decodeJWT } from "did-jwt/src";
import * as moment from "moment";
import "share-api-polyfill";
const PromiseFileReader = require("promise-file-reader");

@Component({
  name: "Credentials"
})
export default class Credentials extends Vue {
  valid = false;
  nombre = "";
  apellido = "";
  email = "";
  description = "";
  hasIdCredential = false;
  selected = [];

  items: any = [];
  dialog: boolean = false;
  loading: boolean = false;
  amount = 0;
  currentItem = null;

  files: any = [];
  search = "";
  creds = null;
  ipfsFiles: any;
  host: string;
  data = "";
  solidoProps: MiddlewareOptions;

  exitDialog() {
    this.dialog = false;
  }

  async shareVerifier() {
    const { ethereum, did, storage } = this.solidoProps;
    const cedula = new CedulaVC();
    let jwt = await storage.getIdCredential();

    const verifier = await cedula.createVerifier(jwt, {
      address: did.preferredDIDAddress,
      ethereumAddress: ethereum.account,
      resolver: did.resolver,
      issuer: did.issuer
    });
    const ref = await storage.setBinaryData(verifier, "text/plain");
    const data = {
      title: "Sharing my ID card verifier",
      text: "ID Card Verifier",
      url: `${location.host}/#/verify_credentials/${ref}`
    };

    await (navigator as any).share(data);
  }

  async fileAdded() {
    const { name, lastname, data } = (await this.handleQRFromImage()) as any;
    this.nombre = name;
    this.apellido = lastname;
    this.data = data;
  }

  async handleCreateVC() {
    await this.fileAdded();
    this.loading = true;

    const name = this.nombre;
    const lastname = this.apellido;
    const hash = this.data;
    if (!!name === false)
      alert("Cedula no es valida o no es posible leer el codigo");
    const { ethereum, storage, did } = this.solidoProps;
    const cedula = new CedulaVC();
    const creds = await cedula.issueCredential(
      { name, lastname, hash },
      {
        issuer: did.issuer,
        resolver: did.resolver,
        address: did.preferredDIDAddress,
        ethereumAddress: ethereum.account
      }
    );
    await storage.setIdCredential(creds);
    this.dialog = false;
    this.loading = false;
    this.$router.go(0);
  }

  async mounted() {
    this.loading = true;
    this.solidoProps = await SolidoSingleton.getProps();
    this.host = (Vue as any).appconfig.API_URL;

    const creds = await this.solidoProps.storage.getIdCredential();
    if (creds.length > 20) {
      const identity = decodeJWT(creds);
      this.nombre = identity.payload.vc.credentialSubject.name;
      this.apellido = identity.payload.vc.credentialSubject.familyName;
      this.creds = identity;
      this.creds.emitido = moment.unix(identity.payload.iat).format("LLL");
      this.hasIdCredential = !!creds;
    }
    this.loading = false;
  }

  async handleQRFromImage() {
    let response = {};
    try {
      const codeReader = new BrowserQRCodeReader();

      const img = await PromiseFileReader.readAsDataURL(this.files);
      const imgSrc = document.createElement("img");
      imgSrc.src = img;
      document.body.appendChild(imgSrc); // we need to append the element to the dom -> otherwise it will not work in firefox
      const result: any = await codeReader.decodeFromImage(imgSrc);
      imgSrc.remove();

      response = {
        name: result.text.split("|")[1].split(" ")[0],
        lastname: result.text.split("|")[2].split(" ")[0],
        data: result.text
      };
    } catch (e) {
      return {};
    } finally {
    }

    return response;
  }

  async handleCredentialPublish() {
    let { nombre, apellido, email, notary, description } = this.$data;

    const { web3 } = window as any;

    this.loading = true;
    email = ethers.utils.formatBytes32String(email);
    nombre = ethers.utils.formatBytes32String(nombre);
    apellido = ethers.utils.formatBytes32String(apellido);
    const docFiles = JSON.stringify(this.ipfsFiles);
    const estimate = await this.solidoProps.ethereum.contracts.Documents.instance.estimate.addDocument(
      notary,
      docFiles,
      description,
      email,
      nombre,
      apellido
    );

    const gas = estimate.toNumber();

    const res = await this.solidoProps.ethereum.contracts.Documents.instance.functions.addDocument(
      notary,
      docFiles,
      description,
      email,
      nombre,
      apellido,
      {
        gasLimit: gas,
        gasPrice: 20000000000 // 10 Gwei
      }
    );

    await res.wait(2);
    this.loading = false;
  }
}

// handle.sed'
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#create .v-speed-dial {
  position: absolute;
}

#create .v-btn--floating {
  position: relative;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
