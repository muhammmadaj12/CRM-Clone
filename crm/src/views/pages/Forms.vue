<template>
  <div id="forms">
    <Table
      :headers="tableHeaders"
      :tableData="tableData"
      :fields="tableFields"
      :tablePropsForHeadings="tablePropsForHeadings"
      :buttonBehaviour="buttonBehaviour"
      :dynamicRoute="dynamicRoute" 
      :deleteForm="deleteForm"
      :isForm="isForm"
      :fetchFormData="fetchFormData"
      :editFormItem="editFormItem"
      :isEditFormFunction="isEditFormFunction"
    />
  </div>
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
        tableHeading: "Forms",
        editTable: "Edit Form",
        createTable: "Create Form",
        routing: "AddForms",
      },
      buttonBehaviour: "routing",
      dynamicRoute: "/dashboard/formbuilder",
      isForm: true,
      isCompany: false,
      isContact: false,
      isEditFormFunction:true
    };
  },
  computed: {
    ...mapGetters(["formHeader", "formBody"]),
    tableHeaders() {
      return this.formHeader;
    },
    tableData() {
      return this.formBody;
    },
    tableFields() {
      return [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "url", label: "URL" },
      ];
    },
  },
  created() {
    this.fetchFormData(); // Dispatch the action when the component is created
  },
  methods: {
    ...mapActions(["fetchFormData", "deleteForm", "editForm"]),

    editFormItem(item) {
  this.$router.push({
    path: '/dashboard/editbuilder',
    query: {
      id: item.id,
      name: item.name,
      json: item.json,
    },
  });
},

  },
};
</script>

