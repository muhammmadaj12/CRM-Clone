<template>
<div class="bg">
    <v-data-table :headers="headers" :items="tableData" :sort-by="[{ key: 'name', order: 'asc' }]" class="elevation-1">

        <!-- eslint-disable vue/valid-v-slot -->
        <template v-slot:item.permissions="{ item }">
            {{ item.permissions.join(', ') }}
        </template>
        <template v-slot:top>
            <v-toolbar flat style="padding: 5%; height: 108px;">
                <v-spacer></v-spacer>

                <!-- Conditional rendering based on buttonBehaviour -->
                <template v-if="buttonBehaviour === 'modal'">
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ props }">
                            <v-select v-if="tablePropsForHeadings.tableHeading==='Deals'" v-model="selectedStatus" :items="statusOptions" label="Select Status" @click="fetchDealsByStatus(selectedStatus)" class="narrow-select"></v-select>
                            <v-btn style="background-color: rgb(102, 161, 106);" v-bind="props" text ><i class="fa-solid fa-plus" style="color: #ffffff;"> ADD</i></v-btn>

                            <v-btn v-if="tablePropsForHeadings.syncContacts==='Sync Contacts Via Email'" style="margin-left: 2%; background-color: rgb(176, 69, 69);" @clcik="syncContacts" >
                                <i class="fa-solid fa-rotate fa-sm" style="color: #ffffff;"> Sync Contacts</i>
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <center><span class="text-h5">{{ tablePropsForHeadings.permissions }}</span></center>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <!-- form inputs -->
                                        <template v-for="field in fields" :key="field">
                                            <v-col :cols="field.cols || 12">
                                                <v-text-field v-model="editedItem[field.key]" :label="field.label"></v-text-field>
                                            </v-col>
                                        </template>

                                        <!-- company display -->
                                        <v-col cols="12" v-if="tablePropsForHeadings.tableHeading === 'User'">
                                            <v-select v-model="selectedCompany" :items="companyName" item-text="name" item-value="id" label="Select Company"></v-select>
                                        </v-col>

                                        <!-- Permission display -->
                                        <v-col cols="12" v-if="tablePropsForHeadings.tableHeading === 'User' && isEditUser">
                                            <v-select v-model="selectedPermissions" :items="permissionName" item-text="name" item-value="id" label="Select Permissions" multiple></v-select>
                                        </v-col>

                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="close">Cancel</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="save">Save</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </template>

                <!-- Use the button for routing -->
                <template v-else-if="buttonBehaviour === 'routing'">
                    <router-link :to="dynamicRoute">
                        <v-btn class="product-btn">
                            <i class="fa-solid fa-plus" style="color: #ffffff;"> ADD</i>
                        </v-btn>
                    </router-link>
                </template>

                <!-- Vuetify dialog for displaying JSON data -->
                <v-dialog v-model="urlDialog" max-width="800px">
                    <v-card>
                        <v-card-title class="text-h5">JSON Viewer</v-card-title>
                        <v-card-text>
                            <!-- Display JSON data here -->
                            <pre>{{ jsonData }}</pre>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="blue-darken-1" variant="text" @click="urlDialog = false">Close</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>

                <!-- ... Rest of your code For Delete... -->
                <v-dialog v-model="dialogDelete" max-width="500px">
                    <v-card>
                        <v-card-title class="text-h5">Are you sure you want to delete?</v-card-title>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                            <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-toolbar>

        </template>

        <!-- eslint-disable vue/valid-v-slot -->
        <template v-slot:item.actions="{ item }">
            <v-icon size="small" v-if="isEditFormFunction" class="me-2" @click="editFormItem(item)" color="blue">mdi-pencil</v-icon>
            <v-icon size="small" v-else-if="!isEditFormFunction" class="me-2" @click="editItem(item)" color="blue">mdi-pencil</v-icon>

            <v-icon size="small" @click="deleteItem(item)" color="red">mdi-delete</v-icon>
        </template>

        <template v-slot:item.url="{ item }">
            <a href="#" @click.prevent="openJsonInNewTab(item)">{{ item.url }}</a>
        </template>

        <template v-slot:no-data>
            <v-btn style="background-color: rgb(102, 161, 106);" @click="initialize">Reset</v-btn>
        </template>

    </v-data-table>
</div>
</template>

<script>
export default {
    props: {
        headers: Array,
        tableData: Array,
        fields: Array,
        tablePropsForHeadings: Object,
        addNewCompany: Function,
        fetchCompanyData: Function,
        deleteCompany: Function,
        isEditing: Boolean,
        updateCompany: Function,
        buttonBehaviour: String,
        dynamicRoute: String,
        isForm: Boolean,
        deleteForm: Function,
        fetchFormData: Function,
        editFormItem: Function,
        editFormFunction: Boolean,
        fetchContacts: Function,
        updateContact: Function,
        isCompany: Boolean,
        isContact: Boolean,
        companyName: Array,
        companyID: Array,
        permissionName: Array,
        permissionID: Array,
        isUser: Boolean,
        addNewUser: Function,
        deleteUser: Function,
        updateUser: Function,
        deleteContact: Function,
        addNewContact: Function,
        isEditFormFunction: Boolean,
        companyData: Array,
        isDeal: Boolean,
        deleteDeal: Function,
        addNewDeal: Function,
        fetchDeals: Function,
        isEditingDeal: Function,
        updateDeals: Function,
        isEditUser:Boolean,
        syncContacts:Function,
    },
    data: () => ({
        dialog: false,
        dialogDelete: false,
        editedIndex: -1,
        editedItem: {},
        defaultItem: {},
        urlDialog: false,
        // htmlContent: '',
        jsonData: null, // Add this property
        selectedCompany: null,
        selectedPermissions: null,
        selectedStatus: "all",
        statusOptions: ["all","active", "unactive", "pending"],
        localTableData: [],
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? this.tablePropsForHeadings.createTable : this.tablePropsForHeadings.editTable
        },
    },
    dialogDelete(val) {
        val || this.closeDelete();
    },
    watch: {
        selectedStatus: {
            immediate: true, // Trigger the watcher immediately when the component is created
            handler(newStatus, oldStatus) {
                if (newStatus !== oldStatus) {
                    // Fetch deals when selectedStatus changes
                    this.fetchDealsByStatus(newStatus);
                }
            },
        }
    },
    methods: {
        async fetchDealsByStatus(status) {
            try {
                // Make an API call to fetch deals based on the selected status
                await this.fetchDeals(status); // Pass the selected status to the action
                // Update the local copy of tableData with the fetched deals
                this.localTableData = this.tableData;
            } catch (error) {
                console.error("Error fetching deals:", error);
            }
        },
        selectCompany(company) {
            this.selectedCompany = company;
            this.dialog = false;
        },

        editItem(item) {
            this.editedIndex = this.tableData.indexOf(item);
            this.editedItem = {
                ...item,
            };
            this.dialog = true;
        },
        deleteItem(item) {
            this.editedIndex = this.tableData.indexOf(item);
            this.editedItem = {
                ...item
            };
            this.dialogDelete = true;
        },
        async deleteItemConfirm() {
            const itemToDeleteId = this.editedItem.id;
            if (this.isCompany) {
                await this.deleteCompany(itemToDeleteId);
            } else if (this.isForm) {
                await this.deleteForm(itemToDeleteId);
                await this.fetchFormData();
            } else if (this.isContact) {
                await this.deleteContact(itemToDeleteId);
            } else if (this.isUser) {
                await this.deleteUser(itemToDeleteId);
            } else if (this.isDeal) {
                await this.deleteDeal(itemToDeleteId)
            }
            this.editedItem = {};
            this.closeDelete();
        },
        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = {
                    ...this.defaultItem
                };
                this.editedIndex = -1;
            });
        },
        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = {
                    ...this.defaultItem
                };
                this.editedIndex = -1;
            });
        },
        async save() {

            const Assigncompany = this.selectedCompany; // Assuming this is the company ID selected in v-select
            const Assignpermission = this.selectedPermissions; // Assuming this is an array of selected permission IDs
            // Store the selected company ID and permission IDs
            this.selectedCompany = Assigncompany;
            this.selectedPermissions = Assignpermission;
            const ID = localStorage.getItem("ID");

            if (this.editedIndex > -1) {

                if (this.isCompany) {
                    await this.updateCompany({
                        id: this.editedItem.id,
                        name: this.editedItem.name,
                        industry: this.editedItem.industry,
                        city: this.editedItem.city,
                    });
                    await this.fetchCompanyData()

                } else if (this.isContact) {
                    await this.updateContact({
                        id: this.editedItem.id,
                        number: this.editedItem.number,
                        email: this.editedItem.email
                    })
                    await this.fetchContacts()
                } else if (this.isDeal) {
                    await this.updateDeals({
                        id: this.editedItem.id,
                        name: this.editedItem.name,
                        description: this.editedItem.description,
                        status: this.editedItem.status
                    })
                    await this.fetchDealsByStatus(this.selectedStatus)
                }
            } else {
                if (this.isCompany) {
                    await this.addNewCompany({
                        name: this.editedItem.name,
                        city: this.editedItem.city,
                        industry: this.editedItem.industry,
                        owner_id: this.editedItem.owner_id
                    })
                    await this.fetchCompanyData()
                } else if (this.isContact) {
                    await this.addNewContact({
                        email: this.editedItem.email,
                        number: this.editedItem.number,
                        user_id: this.editedItem.user_id
                    })
                    await this.fetchContacts()
                } else if (this.isUser) {
                    await this.addNewUser({
                        name: this.editedItem.name,
                        email: this.editedItem.email,
                        password: this.editedItem.password,
                        owner_id: ID,
                        company_name: Assigncompany, // Include company ID in the payload
                        permission: Assignpermission,
                    });

                } else if (this.isUser) {
                    await this.updateUser({
                        name: this.editedItem.name,
                        email: this.editedItem.email,
                        password: this.editedItem.password,
                        company_id: this.editItem.company_id,
                    });
                    await this.fetchUserData()

                } else if (this.isDeal) {
                    await this.addNewDeal({
                        name: this.editedItem.name,
                        description: this.editedItem.description,
                        status: this.editedItem.status
                    })
                    await this.fetchDealsByStatus(this.selectedStatus)
                }
            }

            this.close();
        },
        async openJsonInNewTab(item) {
            this.jsonData = JSON.parse(item.json);

            // Open the Vuetify dialog
            this.urlDialog = true;
        },
    },
};
</script>

<style>
.v-toolbar {
    background: none !important;
}

.v-toolbar__content,
.v-toolbar__extension {
    height: none;
}

.bg {
    background-color: rgb(225, 225, 225);
}
.narrow-select {
  height: 5% !important;
  margin-right: 20px !important;
  background-color: rgb(197, 77, 77);
  color: white;
  font-weight: 700;
  border-radius: 10px;
  padding-bottom:55px;
}
</style>
