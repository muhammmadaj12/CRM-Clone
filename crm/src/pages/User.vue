<template>
  {{ console.log("cNmae",companyName) }}
  {{ console.log("cId",companyID) }}
    <div>
      <Table :headers="tableHeaders" :tableData="tableData" :fields="tableFields" :tablePropsForHeadings="tablePropsForHeadings" :isUser="isUser" :buttonBehaviour="buttonBehaviour" :companyName="companyName" :companyID="companyID" :permissionName="permissionName" :permissionID="permissionID" :addNewUser="addNewUser" :deleteUser="deleteUser" :updateUser="updateUser" :isEditUser="isEditUser" />
    </div>
  </template>
  
  <script>
  import Table from "@/common/Table.vue"; 
  import { mapGetters,mapActions } from "vuex";
  import axios from 'axios';
  
  export default {
    components: {
      Table,
    },
    data() {
      return {
        tablePropsForHeadings: 
        {    
          tableHeading: "User",        
          editTable: "Edit User",       
          createTable: "Add User",
          permissions:"Details & Permissions",  
        },
        buttonBehaviour:'modal',
        isUser:true,
        isEditUser:true
      };
    },
    methods: {
        ...mapActions(['fetchUserData','addNewUser','deleteUser','updateUser','fetchCompanies','fetchPermissions'])
    },
    computed: {
      ...mapGetters(["allHeader", "allusers","companyName","companyID","permissionName","permissionID"]),
      tableHeaders() {
        return this.allHeader;
      },
      tableData() {
        return this.allusers;
      },
      tableFields() {
        return [
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "password", label: "password" },
        ];
      },
    },
    mounted() {
        this.fetchUserData()
        this.fetchCompanies();
        this.fetchPermissions();  
    }
  };
  </script>
  <style scoped>
  #forms{
    padding: 2% 0;
  }
  </style>