<template>
    <Table :headers="tableHeaders" :tableData="tableData" :fields="tableFields" :tablePropsForHeadings="tablePropsForHeadings"  
    :addNewCompany="addNewCompany" :fetchCompanyData="fetchCompanyData" :deleteCompany="deleteCompany" 
    :updateCompany="updateCompany"  :buttonBehaviour="buttonBehaviour"  :dynamicRoute="dynamicRoute"  :isCompany="isCompany"
    :isForm="isForm" :isEditFormFunction="isEditFormFunction" />
</template>

                
            
<script>
import Table from '@/common/Table.vue'
import {
    mapGetters,
    mapActions
} from "vuex";
export default {
    components: {
        Table,
    },
    data() {
        return {
            tablePropsForHeadings: {
                tableHeading: "Companies",
                editTable: "Edit Company",
                createTable: "Create Company",
                routing: 'Route'
            },
            buttonBehaviour:'modal',
            // dynamicRoute:'contacts',
            isCompany:true,
            isForm:false,
            isEditFormFunction:false
        };
    },
    methods: {
        ...mapActions(['fetchCompanyData','addNewCompany','deleteCompany','updateCompany'])
    },
    computed: {
        ...mapGetters(["allCompaniesHeaders", "allCompanies"]),
        tableHeaders() {
            return this.allCompaniesHeaders;
        },
        tableData() {
            return this.allCompanies;
        },
        tableFields() {
            return [{
                    key: "name",
                    label: "Name"
                },
                {
                    key: "industry",
                    label: "Industry"
                },
                {
                    key: "city",
                    label: "City"
                },
                
            ];
        },
    },

    mounted() {
        this.fetchCompanyData()
    }
};
</script>