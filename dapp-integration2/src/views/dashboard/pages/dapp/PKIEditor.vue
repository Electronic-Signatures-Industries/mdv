<template>
  <div id="app">
    <PDFView
      :src.sync="file"
      ref="pdfView"
      :fileName="filename"
      :sidebarFeatureVisible="false"
      :downloadFeatureVisible="true"
      :dropzoneFeatureVisible="true"
      :toolbarVisible="true"
      scale.sync="scale"
    >
      <template slot="right-toolbox"></template>
      <!-- Add more buttons/features on the right side of the toolbar -->
      <template slot="left-toolbox"></template>
      <!-- Add more buttons/features on the left side of the toolbar -->
      <template slot="error"></template>
      <!-- Change the error message design -->
      <template slot="loading">
        Cargando...
      </template>
      <!-- Change the pdf loader design -->
    </PDFView>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import { ethers } from "ethers";
import EthCrypto from "eth-crypto";
import * as moment from "moment";
import * as ipfs from "ipfs-http-client";
import { EventFilter } from "@decent-bet/solido";
import { filter } from "rxjs/operators";
import { forkJoin } from "rxjs";

import { PDFView } from "vue_pdfjs_viewer";
import {
  SolidoSingleton,
} from "../../components/core/SolidoSingleton";
import { MiddlewareOptions } from "../../../../libs";
const PromiseFileReader = require("promise-file-reader");

@Component({
  name: "PKIEditor",
  components: {
    PDFView
  }
})
export default class PKIEditor extends Vue {
  contracts: any;
  items: any = [];
  dialog: any = false;
  headers: any = [];
  loading: boolean = false;
  address = "";
  message = "";
  menu = false;
  license = "";
  description = "";
  expires: any = new Date().toISOString().substr(0, 10);

  certDialog: any = false;
  licenseDialog: any = false;
  role = "";
  host = "";
  roles = [
    {
      label: "Notario",
      value: 1
    },
    {
      label: "Usuario",
      value: 2
    }
  ];
  file = null;
  filename = "pending";

  async mounted() {
    const solidoProps: MiddlewareOptions = await SolidoSingleton.getProps();

    const contracts = solidoProps.ethereum.contracts;

    this.contracts = contracts;
    this.host = (Vue as any).appconfig.API_URL;

    const { getDownloadURL } = solidoProps.storage;
    this.filename = this.$route.params.name;
    this.file = await getDownloadURL(this.$route.params.id, 'application/pdf');
  }
}
</script>

<style scoped>
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
