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
      icon="mdi-clipboard-text"
      title="Solicitudes notariales pendientes"
      class="px-5 py-3"
    >
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Buscar"
        single-line
        hide-details
      ></v-text-field>
      <v-data-table
        :loading="loading"
        :headers="this.headers"
        v-model="selected"
        :items="items"
        :search="search"
        sort-by="Tx"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
          </v-toolbar>
        </template>
        <template v-slot:item.files="{ item }">
          <v-btn icon color="blue" @click.stop="handleFiles(item.decoded)">
            <v-icon>mdi-file</v-icon>
          </v-btn>
        </template>
        <template v-slot:item.certfiles="{ item }">
          <v-col
            v-if="!!getActions(item).find(i => i.text.indexOf('cert') > -1)"
          >
            <v-btn
              icon
              color="pink"
              @click.stop="handleCertFiles(item.decoded)"
            >
              <v-icon>mdi-file-check</v-icon>
            </v-btn>
          </v-col>
        </template>
        <template v-slot:item.action="{ item }">
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select
                v-model="action"
                :items="getActions(item).filter(i => !!i.skipTasks === false)"
                item-text="text"
                item-value="callback"
                single-line
                label="Tarea"
                @change="handleAction(item.decoded)"
              />
            </v-col>
          </v-row>
        </template>
        <template v-slot:no-data>
          No hay registros
        </template>
      </v-data-table>
    </base-material-card>
    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="700" persistent>
        <v-card>
          <v-card-title class="headline">Archivos</v-card-title>
          <v-card-text>
            <div>
              <v-file-input
                chips
                v-model="cert"
                label="Certificado"
              ></v-file-input>
            </div>
            <v-list-item v-for="f in files" v-bind:key="f.hash">
              <v-list-item-content>
                <v-row>
                  <v-col>
                    <router-link
                      target="_blank"
                      :to="{
                        name: 'Navegador PDF',
                        params: { name: f.path, id: f.hash }
                      }"
                      >{{ f.path }}</router-link
                    >
                  </v-col>
                  <v-chip
                    class="ma-2"
                    :disabled="!!cert === false"
                    color="teal"
                    text-color="white"
                    @click="handleSignedValidation(f)"
                  >
                    <v-icon v-if="p7mValid" left
                      >mdi-checkbox-marked-circle</v-icon
                    >

                    Validar
                  </v-chip>
                </v-row>
              </v-list-item-content>
            </v-list-item>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialog = false">
              OK
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="uploadDocsDialog" max-width="690" persistent>
        <v-card>
          <v-card-title class="headline">Liberar documentos</v-card-title>
          <v-card-text>
            <div>
              <v-file-input
                chips
                v-model="pvk"
                label="Llave Privada"
              ></v-file-input>
            </div>
            <div>
              <v-file-input
                chips
                v-model="cert"
                label="Certificado"
              ></v-file-input>
            </div>
            <div>
              <v-file-input
                accept="application/pdf"
                chips
                multiple
                v-model="files"
                label="Archivos"
              ></v-file-input>
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="loading || !!cert === false || !!pvk === false"
              color="success"
              class="mr-4"
              @click="handlePKCS7"
            >
              Agregar Firma Calificada
            </v-btn>

            <v-btn
              :disabled="loading"
              color="success"
              class="mr-4"
              @click="handleEncryptedFileUpload(files)"
            >
              Subir archivos
            </v-btn>

            <v-btn
              color="success"
              class="mr-4"
              :disabled="loading"
              @click="setFileUpload"
            >
              Publicar
            </v-btn>
            <v-btn color="green darken-1" text @click="exitDialog()">
              Salir
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script lang="ts">
// @ts-nocheck
import { Component, Vue } from "vue-property-decorator";
import { ethers } from "ethers";
import EthCrypto from "eth-crypto";
import * as ipfs from "ipfs-http-client";
import { EventFilter } from "@decent-bet/solido";
import { filter } from "rxjs/operators";
import { forkJoin } from "rxjs";
import { PKCS7Utils } from "../../pages/dapp/PKCS7Utils";
import { BigNumber } from "ethers/utils";
import {
  SolidoSingleton
} from "../../components/core/SolidoSingleton";
import { MiddlewareOptions } from "../../../../libs";

const arrayBufferToString = require("arraybuffer-to-string");
const forge = require("node-forge");
const md5 = require("js-md5");

@Component({
  name: "Notary"
})
export default class Notary extends Vue {
  action = null;
  actions = [
    {
      state: -1,
      skipTasks: true,
      text: "Ver archivos",
      callback: this.handleFiles
    },
    {
      state: 6,
      text: "Ver archivos certificados",
      callback: this.handleCertFiles,
      skipTasks: true
    },
    {
      state: 1,
      text: "Aceptar",
      callback: this.acceptDocuments
    },
    {
      state: 1,
      text: "Rechazar",
      callback: this.rejectDocuments
    },
    {
      state: 2,
      text: "Certificar",
      callback: this.certifyDocuments
    },
    {
      state: 4,
      text: "Pago Recibido",
      callback: this.paymentReceived
    },
    {
      state: 5,
      text: "Liberar documentos",
      callback: this.setFileUpload
    }
  ];

  p7mValid = null;
  selected = [];
  contracts: any;
  items: any = [];
  dialog: any = false;
  headers: any = [];
  documentHeaders: any = [];
  loading: boolean = false;
  search = null;

  files = [];
  pvk = null;
  cert = null;
  ipfsFiles = [];
  uploadDocsDialog = false;
  amount = 0;
  currentId = 0;
  host: string;

  getActions(item) {
    return this.actions.filter(
      i => i.state === -1 || i.state === item.decoded.statusInt
    );
  }

  hasStatus(status) {
    return !!this.actions.filter(i => i.state === status);
  }

  exitDialog() {
    this.uploadDocsDialog = false;
    this.action = null;
  }

  async handleIpfsFile(hash: string, name: string) {
    const resp = await fetch(`${this.host}${hash}`, {
      method: "GET"
    });
    const serverChecksum = resp.headers.get("app-file-checksum");
    const blob = await resp.blob();
    const ab = await (blob as any).arrayBuffer();

    // validate checksum
    const checksum = md5(ab);

    if (serverChecksum.toUpperCase() === checksum.toUpperCase()) {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = name;
      document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
      a.click();
      a.remove();
    } else {
      throw new Error("Invalid file checksum");
    }
  }

  handleFiles(item) {
    this.dialog = true;
    this.files = item.files;
  }

  handleCertFiles(item) {
    this.dialog = true;
    this.files = item.certFiles.map(i => {
      return {
        hash: i.hash.split(",")[0],
        path: i.path,
        ids: i.hash.replace(" ", "")
      };
    });

    this.action = null;
  }

  async handleAction(item) {
    if (this.action) {
      await Promise.resolve(this.action(item));
    }
  }

  async mounted() {
    const solidoProps: MiddlewareOptions = await SolidoSingleton.getProps();

    this.loading = true;
    const contracts = solidoProps.ethereum.contracts;
    this.contracts = contracts;
    this.host = (Vue as any).appconfig.API_URL;

    this.headers = [
      {
        text: "Tx",
        align: "left",
        sortable: true,
        value: "transactionHash"
      },
      { text: "Id", value: "decoded.id" },
      { text: "Estado", value: "decoded.status" },
      { text: "Correo", value: "decoded.email" },
      { text: "Nombre", value: "decoded.name" },
      { text: "Apellido", value: "decoded.lastName" },
      { text: "Docs", value: "files", sortable: false },
      { text: "Docs Cert", value: "certfiles", sortable: false },
      { text: "Tareas", value: "action", sortable: false }
    ];

    this.documentHeaders = [{ text: "Archivo", value: "name" }];
    await this.fetchDocuments();
    this.loading = false;
  }

  async rejectDocuments({ id }) {
    this.loading = true;

    const estimate = await this.contracts.Documents.instance.estimate.setDocumentRejected(
      id
    );

    const gas = estimate.toNumber();
    const res = await this.contracts.Documents.instance.functions.setDocumentRejected(
      id,
      {
        gasLimit: gas,
        gasPrice: 10000000000 // 10 Gwei
      }
    );

    await res.wait(2);
    this.loading = false;
  }

  async setFileUpload({ id }) {
    try {
      if (this.uploadDocsDialog) {
        this.uploadDocsDialog = false;
        this.loading = true;
        const docFiles = JSON.stringify(this.ipfsFiles);
        await this.releaseDocuments({ id: this.currentId, docFiles });
      } else {
        this.currentId = id;
        this.uploadDocsDialog = true;
      }
    } catch (e) {
      alert("Direccion ya asignada o no gas insuficiente");
    }
  }

  async handleEncryptedSignedFileUpload(inputs: any) {
    this.loading = true;
    const files = await forkJoin(
      inputs.map(async (item: any) => {
        const path = item.file.name;
        const form = new FormData();
        form.append("file", item.file);
        form.append("pem", item.pem);
        form.append("signed", item.signed);
        const res = await fetch((Vue as any).appconfig.PDF_API_URL, {
          method: "POST",
          body: form
        });
        const hash = res.headers.get("app-ipfs-hash");
        return { hash, path };
      })
    ).toPromise();

    this.ipfsFiles = files;
    this.loading = false;
  }

  async handleEncryptedFileUpload(inputs: []) {
    this.loading = true;
    const files = await forkJoin(
      inputs.map(async (file: any) => {
        const path = file.name;
        const form = new FormData();
        form.append("file", file);
        const res = await fetch((Vue as any).appconfig.API_URL, {
          method: "POST",
          body: form
        });
        const hash = res.headers.get("app-ipfs-hash");
        return { hash, path };
      })
    ).toPromise();

    this.ipfsFiles = files;
    this.loading = false;
  }

  async releaseDocuments({ id, docFiles }) {
    this.loading = true;

    const estimate = await this.contracts.Documents.instance.estimate.addCertifiedDocuments(
      id,
      docFiles
    );

    const gas = estimate.toNumber();
    const res = await this.contracts.Documents.instance.functions.addCertifiedDocuments(
      id,
      docFiles,
      {
        gasLimit: gas,
        gasPrice: 10000000000 // 10 Gwei
      }
    );

    await res.wait(2);
    this.loading = false;

    this.fetchDocuments();
  }

  async paymentReceived({ id }) {
    this.loading = true;

    const estimate = await this.contracts.Documents.instance.estimate.setServiceFeeReceived(
      id
    );

    const gas = estimate.toNumber();
    const res = await this.contracts.Documents.instance.functions.setServiceFeeReceived(
      id,
      {
        gasLimit: gas,
        gasPrice: 10000000000 // 10 Gwei
      }
    );

    await res.wait(2);
    this.loading = false;

    this.fetchDocuments();
  }

  async certifyDocuments({ id }) {
    this.loading = true;

    const estimate = await this.contracts.Documents.instance.estimate.setDocumentCertified(
      id
    );

    const gas = estimate.toNumber();
    const res = await this.contracts.Documents.instance.functions.setDocumentCertified(
      id,
      {
        gasLimit: gas,
        gasPrice: 10000000000 // 10 Gwei
      }
    );

    await res.wait(2);
    this.loading = false;

    this.fetchDocuments();
  }

  async acceptDocuments({ id }) {
    this.loading = true;

    const estimate = await this.contracts.Documents.instance.estimate.setDocumentAccepted(
      id
    );

    const gas = estimate.toNumber();
    const res = await this.contracts.Documents.instance.functions.setDocumentAccepted(
      id,
      {
        gasLimit: gas,
        gasPrice: 10000000000 // 10 Gwei
      }
    );

    await res.wait(2);
    this.loading = false;

    this.fetchDocuments();
  }

  getStatus(value) {
    switch (value) {
      case 0:
        return "Ninguno";
      case 1:
        return "Creado";
      case 2:
        return "Aceptado";
      case 3:
        return "Certificado";
      case 4:
        return "Esperando pago de certificado";
      case 5:
        return "Pago recibido";
      case 6:
        return "Certificados liberados";
      case 7:
        return "Certificados recibidos";
      case 8:
        return "Rechazado";
      case 9:
        return "Cancelado";
      default:
        return "None";
    }
  }

  async fetchDocuments() {
    // TODO: REST API to save tx log
    const filterOptions: EventFilter<any> = {
      pageOptions: {
        limit: 100,
        offset: 0
      }
    };
    const { Documents } = this.contracts;

    const filter = await Documents.instance.filters.LogAddDocument(
      null,
      null,
      Documents.defaultAccount
    );

    filter.fromBlock = 0;
    filter.toBlock = "latest";

    const logs = await Documents.instance.provider.getLogs(filter);
    const interfaceUtils = new ethers.utils.Interface(Documents.abi);
    const parsed = logs.map(async l => {
      const { values } = interfaceUtils.parseLog(l);
      const doc = await Documents.methods.recipientDocuments(
        values.recipient,
        values.id
      );
      let files = JSON.parse(doc.fileIpfsJson);
      let certFiles = null;
      if (doc.certifiedFilesIpfsJson) {
        certFiles = JSON.parse(doc.certifiedFilesIpfsJson);
      }
      return {
        ...l,
        decoded: {
          ...doc,
          id: values.id,
          recipient: values.recipient,
          status: this.getStatus(new BigNumber(doc.status).toNumber()),
          email: ethers.utils.parseBytes32String(doc.email),
          name: ethers.utils.parseBytes32String(doc.name),
          lastName: ethers.utils.parseBytes32String(doc.lastName),
          files,
          certFiles,
          statusInt: new BigNumber(doc.status).toNumber()
        }
      };
    });
    this.items = await forkJoin(parsed).toPromise();
  }

  async handleSignedValidation(file) {
    this.loading = true;

    const url = `${(Vue as any).appconfig.PDF_API_URL}/verify/${file.ids}`;
    const form = new FormData();
    form.append("cert", this.cert);
    const res = await fetch(url, {
      method: "POST",
      body: form
    });
    this.p7mValid = res.ok;
    this.loading = false;
  }

  async handlePKCS7() {
    let cert;
    let pvk;
    this.loading = true;

    pvk = this.pvk;
    cert = this.cert;
    const files = await forkJoin(
      this.files.map(async (file: any) => {
        const { pem, signed } = PKCS7Utils.signDetachedPdf(
          await cert.arrayBuffer(),
          await pvk.arrayBuffer(),
          await file.arrayBuffer()
        );
        return {
          file,
          pem: new Blob([pem.buffer]),
          signed: new Blob([signed.buffer])
        };
      })
    ).toPromise();

    await this.handleEncryptedSignedFileUpload(files);
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
