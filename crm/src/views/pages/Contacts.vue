<template>
  <Table :headers="tableHeaders" :tableData="tableData" :fields="tableFields" :tablePropsForHeadings="tablePropsForHeadings"
  :buttonBehaviour="buttonBehaviour" :deleteContact="deleteContact" :isCompany="isCompany" :addNewContact="addNewContact" 
  :fetchContacts="fetchContacts" :updateContact="updateContact" :isContact="isContact" :dynamicRoute="dynamicRoute" 
  :isEditFormFunction="isEditFormFunction" :syncContacts="syncContacts"/>
</template>

<script>
import Table from "@/common/Table.vue"; 
import { mapGetters, mapActions } from "vuex";

export default {
  components: {
    Table,
  },
  data() {
    return {
      tablePropsForHeadings: {
        tableHeading: "Contacts",        
        editTable: "Edit Contact",       
        createTable: "Create Contact",
        syncContacts:"Sync Contacts Via Email"   
      },
      buttonBehaviour:'modal',
      dynamicRoute:'/dashbiard',
      isCompany:false,
      isContact:true,
      isEditFormFunction:false
    };
  },
  computed: {
    ...mapGetters(["allContactHeaders", "allContacts"]),
    tableHeaders() {
      return this.allContactHeaders;
    },
    tableData() {
      return this.allContacts;
    },
    tableFields() {
      return [
        { key: "number", label: "Number" },
        { key: "email", label: "Email" },
      ];
    },
  },

  methods:{
    ...mapActions(['fetchContacts', 'deleteContact', 'addNewContact', 'updateContact','syncContacts'])
  },

  mounted(){
    this.fetchContacts()
  }
};
</script>
