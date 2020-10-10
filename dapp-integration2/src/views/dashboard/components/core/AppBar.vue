<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="transparent"
    flat
    height="75"
    v-if="!offchain"
  >
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <div v-if="connected">
      <h4>{{ `${this.name} ${this.lastname} (${this.address})` }}</h4>
    </div>

    <div class="mx-3" />
    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <v-list :tile="false" nav><app-bar-item></app-bar-item> </v-list>
    </v-menu>

    <v-btn
      v-if="connected"
      class="ml-2"
      min-width="0"
      text
      @click="setProfile()"
    >
      <vth-blockie :string="address" round />
    </v-btn>

    <v-dialog v-model="profileDialog" max-width="690">
      <v-card>
        <v-card-title class="headline">Perfil</v-card-title>

        <v-card-text>
          <v-text-field
            disabled
            v-model="address"
            label="Direccion"
          ></v-text-field>
          <v-text-field v-model="name" label="Nombre"></v-text-field>
          <v-text-field v-model="lastname" label="Apellido"></v-text-field>
          <v-text-field v-model="email" label="Correo"></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="setProfile()">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script>
import { SolidoSingleton } from "./SolidoSingleton";

// Components
import { VHover, VListItem } from "vuetify/lib";
import Vue from "vue";

// Utilities
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs
                  }
                },
                this.$slots.default
              );
            }
          }
        });
      }
    }
  },

  props: {
    value: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    offchain: false,
    connected: false,
    lastname: "",
    name: "",
    email: "",
    address: "",
    contracts: null,
    solidoProps: null,
    profileDialog: false
  }),

  mounted: async function() {
    const props = await SolidoSingleton.getProps();

    if (props.offchain) return;
    let self = this;

    const user = (await props.storage.getUserModel()) || {};
    self.email = user.email || "";
    self.lastname = user.lastname || "";
    self.name = user.name || "";
    self.address = user.address || "";
    self.connected = true || "";
  },
  computed: {
    ...mapState(["drawer"])
  },
  methods: {
    ...mapMutations({
      setDrawer: "SET_DRAWER"
    }),
    async setProfile() {
      const props = await SolidoSingleton.getProps();

      const contracts = props.ethereum.contracts;
      this.solidoProps = props;
      let profile;

      try {
        if (this.profileDialog) {
          this.loading = true;
          const { address, email, name, lastname } = this;
          if (name.length > 0) {
            await props.storage.setUserModel({
              address,
              email,
              name,
              lastname
            });
          }
          this.profileDialog = false;
        } else {
          const {
            address,
            email,
            name,
            lastname
          } = await props.storage.getUserModel();
          this.nombre = name;
          this.apellido = lastname;
          this.email = email;

          this.address = contracts.Documents.defaultAccount;
          this.profileDialog = true;
        }
      } catch (e) {
        // alert(e.toString());
      }
    }
  }
};
</script>
