<template>
    <v-app style="background-color: rgb(225, 225, 225);"  id="header-bg">
      <v-app-bar app>
        <img src="../assets/logo.png" alt="Logo" style="width: 10%; width: 10%; margin-left: 3%;"/>
        <v-toolbar-title></v-toolbar-title>
  
        <!-- Activator Slot for CONTACTS -->
        <v-menu activator="#contacts-activator">
          <template v-slot:activator="{ on }">
            <v-btn v-if="hasContactsPermission" color="white" v-on="{on}" id="contacts-activator">

              {{ contactsPermission.contacts }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in contactItems "
              :key="index"
              :value="index"
            >
            <router-link :to="item.attrs.to">
               <v-list-item-title>{{ item.title }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
        
        <!-- Activator Slot for MARKETING -->
        <v-menu activator="#marketing-activator">
          <template v-slot:activator="{ on }">
            <v-btn v-if="hasMarketingPermission" color="white" v-on="on" id="marketing-activator">

              {{ marketingPermission.marketing }}
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in filteredMarketingItems "
              :key="index"
              :value="index"
            >
            <router-link :to="item.attrs.to">
               <v-list-item-title>{{ item.title }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
  
        <!-- Sibling Activator -->
        <v-btn v-if="hasSalesPermission" id="menu-activator" color="white">
          {{ salesPermission.sales }}
        </v-btn>
  
        <v-menu activator="#menu-activator">
          <v-list>
            <v-list-item v-for="(item, index) in filteredSalesItems" :key="index" :value="index">
              <router-link :to="item.attrs.to">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </router-link>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-btn @click="logout" color="white" style=" background-color:rgb(76, 76, 76);">
          Logout
        </v-btn>
      </v-app-bar>
    </v-app>
  </template>
  
  <script>
  import {contactItems ,marketingItems, salesItems} from '@/constants/Permissions&routes'
  import { mapGetters} from "vuex";
  export default{
    computed: {
        ...mapGetters(["permissionItems"]),
        marketingPermission() {
          return this.permissionItems.find((permission) => permission.hasOwnProperty("marketing"));
        },
        salesPermission() {
          return this.permissionItems.find((permission) => permission.hasOwnProperty("sales"));
        },
        contactsPermission() {
          return this.permissionItems.find((permission) => permission.hasOwnProperty("contacts"));
        },
        userPermissions() {
          const storedPermissions = JSON.parse(localStorage.getItem("permissions"));
          return storedPermissions || [];
        },
        hasSalesPermission() {
          return this.userPermissions.includes("can-do-products-operations") || this.userPermissions.includes("can-do-deals-operations") || this.userPermissions.includes("can-do-all-operations");
        },
        hasMarketingPermission() {
          return this.userPermissions.includes("can-do-email-operations") || this.userPermissions.includes("can-do-form-operations") || this.userPermissions.includes("can-do-blogs-operations") || this.userPermissions.includes("can-do-all-operations");
        },
        hasContactsPermission() {
          return this.userPermissions.includes("can-do-all-operations");
        },
        filteredSalesItems() {
          const hasProductsPermission = this.userPermissions.includes("can-do-products-operations") || this.userPermissions.includes("can-do-all-operations");
          const hasDealsPermission = this.userPermissions.includes("can-do-deals-operations") || this.userPermissions.includes("can-do-all-operations");
          // Filter sales items based on user's permissions
          return salesItems.filter(item => {
            // If both products and deals permissions exist, include both in the filtered list
            if (hasProductsPermission && hasDealsPermission) {
              return item.title === "Products" || item.title === "Deals";
            }
            // If only products permission exists, include products in the filtered list
            if (hasProductsPermission) {
              return item.title === "Products";
            }
            // If only deals permission exists, include deals in the filtered list
            if (hasDealsPermission) {
              return item.title === "Deals";
            }
            // If no specific permissions, don't include any items
            return false;
          });
        },
        filteredMarketingItems() {
          const hasEmailPermission = this.userPermissions.includes("can-do-email-operations") || this.userPermissions.includes("can-do-all-operations");
          const hasBlogPermission = this.userPermissions.includes("can-do-blogs-operations") || this.userPermissions.includes("can-do-all-operations");
          const hasFormPermission = this.userPermissions.includes("can-do-form-operations") || this.userPermissions.includes("can-do-all-operations");
          // Filter sales items based on user's permissions
          return marketingItems.filter(item => {
            // If both products and deals permissions exist, include both in the filtered list
            if (hasEmailPermission && hasBlogPermission && hasFormPermission) {
              return item.title === "Email" || item.title === "Forms" || item.title === "Blogs" ;
            }
            // If only products permission exists, include products in the filtered list
            if (hasEmailPermission) {
              return item.title === "Email";
            }
            // If only deals permission exists, include deals in the filtered list
            if (hasBlogPermission) {
              return item.title === "Blogs";
            }
            if (hasFormPermission) {
              return item.title === "Forms";
            }
            // If no specific permissions, don't include any items
            return false;
          });
        },
    },
    data() {
    return {
      contactItems: contactItems,
      marketingItems: marketingItems,
      salesItems: salesItems,
    };
  },
  methods:{
    logout() {

    localStorage.removeItem("token");
   localStorage.removeItem("ID");
  localStorage.removeItem("AccessToken");
    alert("Logout successful");
  this.$router.push("/");
}
  },
  };
</script>
<style >
    .v-toolbar-title__placeholder
    {
        font-size: 40px;
        font-weight: 700;
        height: 50px;
        align-items: center;
        display: flex;
        font-family: sans-serif;
    }
    .v-application__wrap
    {
      min-height: 0vh !important;
      min-height: 0dvh !important;
    }
    #header-bg .v-toolbar__content
    {
        background-color: rgb(101, 101, 101);
    }
    .v-application__wrap{
      min-height: 0 !important;
    }
    .v-menu > .v-overlay__content > .v-card, .v-menu > .v-overlay__content > .v-sheet, .v-menu > .v-overlay__content > .v-list
    {
      background: rgb(203, 203, 203);
    }
    a {
    color: #818963;
    text-decoration: none;
}

a:-webkit-any-link {
    color: #818963;
}
</style>