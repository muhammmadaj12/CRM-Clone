<template>
  
    <!-- Place your Table component here -->
    <Table :headers="tableHeaders" :tableData="tableData" :fields="tableFields" :tablePropsForHeadings="tablePropsForHeadings" 
      :deleteDeal="deleteDeal" :isDeal="isDeal" :buttonBehaviour="buttonBehaviour" :addNewDeal="addNewDeal" :fetchDeals="fetchDeals" :isEditingDeal="isEditingDeal"
      :updateDeals="updateDeals" />
</template>


  
  
<script>
import Table from "@/common/Table.vue";
import {
    mapActions,
    mapGetters
} from "vuex";

export default {
    components: {
        Table,
    },
    data() {
        return {
            tablePropsForHeadings: {
                tableHeading: "Deals",
                editTable: "Edit Deals",
                createTable: "Create Deals",
            },
            buttonBehaviour: 'modal',
            isDeal: true,
            isEditingDeal: false,

        };

    },
    computed: {
        ...mapGetters(["allDealsHeaders", "allDeals"]),
        
        tableHeaders() {
            return this.allDealsHeaders;
        },
        tableData() {
            return this.allDeals;
        },
        tableFields() {
            return [{
                    key: "name",
                    label: "Name"
                },
                {
                    key: "status",
                    label: "Status"
                },
                {
                    key: "description",
                    label: "Description"
                },
            ];
        },
    },
    methods: {
        ...mapActions(['fetchDeals', 'deleteDeal', 'addNewDeal', 'updateDeals']),
        // selectedStatus() {
        //     return this.$store.state.selectedStatus; // Retrieve selectedStatus from the Vuex store
        // },
    },
    // watch: {
    //     selectedStatus(newValue) {
    //         // Whenever selectedStatus changes, fetch deals with the new status
    //         this.fetchDeals(newValue);
    //     }
    // },
    // mounted() {
    //     this.fetchDeals('active')
    // }
};
</script>
