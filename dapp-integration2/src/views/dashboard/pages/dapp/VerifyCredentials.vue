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
      <v-card-title>
      <v-icon
        large
        left
      >
        mdi-ethereum
      </v-icon>
      <span class="title font-weight-light">{{ this.owner }}</span>
    </v-card-title>
      <v-card-text >
        <h2 color="blue" class="px-3 py-3">Documento de Identificacion a nombre de {{ this.vc.credentialSubject.name }} {{ this.vc.credentialSubject.familyName }}</h2>
        <h4 color="gray" class="px-3 py-3">Hash del contenido escaneado {{ this.vc.credentialSubject.hash }}</h4>
      </v-card-text>

      <v-card-actions>
        <v-list-item class="grow">
          <v-list-item-avatar color="red" v-if="hasExpire">
            <v-icon>mdi-card-account-details-star-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-avatar color="green" v-if="!hasExpire">
            <v-icon>mdi-card-account-details-star-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-if="!hasExpire"
              >Expira {{ expira }}</v-list-item-title
            >
            <v-list-item-title v-if="hasExpire">Expirado</v-list-item-title>
          </v-list-item-content>

          <v-row align="center" justify="end" v-if="!hasExpire">
            <v-btn icon :color="hasVerify1" @click="verify"
              ><v-icon class="mr-1">mdi-check-decagram</v-icon></v-btn
            >
            <span class="subheading mr-2">Verificar firma</span>
            <span class="mr-1">·</span>
            <v-btn icon :color="hasVerify2" @click="verify2"
              ><v-icon class="mr-1">mdi-certificate</v-icon></v-btn
            >
            <span class="subheading">Verificar firma y cedula</span>
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
              @click="verify2"
            >
              Verificar
            </v-btn>
          </v-form>
        </base-material-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { BrowserQRCodeReader } from "@zxing/library";

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

@Component({
  name: "VerifyCredentials"
})
export default class VerifyCredentials extends Vue {
  valid = false;

  hasVerify1 = "gray";
  hasVerify2 = "gray";
  expira = "";
  email = "";
  selected = [];
  hasExpire = false;
  items: any = [];
  dialog: boolean = false;
  headers: any = [];
  loading: boolean = false;
  amount = 0;
  currentItem = null;
  nombre = "";
  apellido = "";

  files: any = [];
  search = "";
  creds = { payload: { iss: null } };
  verificationPresentation = null;
  ipfsFiles: any;
  host: string;
  data = "";
  owner = '';
  vc = {};
  solidoProps: MiddlewareOptions;

  exitDialog() {
    this.dialog = false;
  }

  async verify() {
    const { resolver } = this.solidoProps.did;
    const cedula = new CedulaVC();
    const ref = this.verificationPresentation;
    const verifier = await cedula.verify(this.verificationPresentation, {
      resolver
    } as any);
    this.hasVerify1 =
      verifier.signer.owner === this.creds.payload.iss ? "green" : "red";
  }

  async verify2() {}

  async mounted() {
    this.loading = true;
    this.solidoProps = await SolidoSingleton.getProps();
    this.host = (Vue as any).appconfig.API_URL;

    // await this.fetchDocuments();
    const hash = this.$route.params.id;
    if (hash.length > 20) {
      const res = await this.solidoProps.storage.getBinaryData(
        hash,
        "text/plain"
      );
      const jwt = await res.text();
      const identity = decodeJWT(jwt);
      this.owner = identity.payload.iss;
      this.vc = decodeJWT(identity.payload.vp.verifiableCredential[0]).payload.vc;
      this.verificationPresentation = jwt;
      this.creds = identity as any;
      // @ts-ignore
      this.expira = moment.unix(identity.payload.exp).format("LLL");

      // @ts-ignore
      this.hasExpire = moment().unix() > moment(moment.unix(identity.payload.exp)).unix();
    }
    this.loading = false;
    // await this.signClaim();
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
