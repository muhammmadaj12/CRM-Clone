<template>
  <div id="forms">
    <v-container>
      <v-row>
        <v-col class="text-end" cols="12">
          <v-dialog width="500" v-model="addProductDialog">
            <template v-slot:activator="{ props }" >
              <v-btn class="product-btn" v-bind="props" text @click="openAddProductDialog"><i class="fa-solid fa-plus" style="color: #ffffff;"> ADD</i></v-btn>
            </template>
            
            <template v-slot:default>
              <v-card title="Add Product">
                <v-card-text>
                  <FormFields :formData="formData" :fields="fields" />
                  <Button @click="addProduct" style="width: 100%;" :title="buttonTitle" />
                </v-card-text>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
        <v-col cols="12">
          <!-- List of Company Products -->
          <v-row>
            <v-col v-for="product in companyProducts" :key="product.id" cols="4">
              <v-card max-width="100%" style="padding: 2% 2%; background-color: #f6f6f6; border: 1px solid rgb(185 185 185) ">
                <i class="fa-regular fa-pen-to-square fa-lg" @click="openUpdateProductDialog(product)" style="color: #005eff; padding: 2%; float:right;"></i>
                <i class="fa-solid fa-trash-can fa-lg" @click="openDeleteProductDialog(product)" style="color: #ff0000; padding: 2%; float:right;"></i>
                <v-img :src="product.imgURL" height="200px" contain></v-img>
                <v-card-title class="py-1">{{ product.title }}</v-card-title>
                <v-card-subtitle>{{ product.description }}</v-card-subtitle>
                <div id="product-chip">
                  <v-card-subtitle color="primary" class="py-2">Company: {{ product.company_name }}</v-card-subtitle><br>
                  <v-chip color="primary" class="py-2">Price: {{ product.price }} $</v-chip><br>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <!-- Update Product Dialog -->
    <v-dialog width="500" v-model="updateProductDialog">
      <template v-slot:default>
        <v-card title="Update Product">
          <v-card-text>
            <FormFields :formData="updateProductData" :fields="fields" />
            <v-btn @click="updateProductAction" style="width: 100%;" color="purple">Update Product</v-btn>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>

    <!-- Delete Product Dialog -->
    <v-dialog width="500" v-model="deleteProductDialog">
      <template v-slot:default>
        <v-card title="Delete Product">
          <v-card-text>
            <p>Are you sure you want to delete this product?</p>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="deleteProduct" color="red">Delete</v-btn>
            <v-btn @click="closeDeleteProductDialog" color="grey darken-1">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import Button from "@/components/commons/Button.vue";
import FormFields from "@/components/commons/FormFields.vue";
import axios from "axios";
import { Api_Base_URL } from "@/constants/BaseURL.js";
import { mapGetters, mapActions } from "vuex";
const token = localStorage.getItem("token");

export default {
  data() {
    return {
      addProductDialog: false,
      buttonTitle: "Add Products",
      title: "",
      description: "",
      imageURL: "",
      price: "",
      formData: {},
      fields: [
        { key: "title", label: "Title", type: "text" },
        { key: "description", label: "Description", type: "text" },
        { key: "imgURL", label: "Image Url", type: "text" },
        { key: "price", label: "Price", type: "text" },
      ],
      companyProducts: [],
      updateProductDialog: false,
      deleteProductDialog: false,
      updateProductData: {},
      selectedProductId: null,
    };
  },
  components: {
    FormFields,
    Button,
  },
  computed: {
    ...mapGetters(["allProducts"]),
  },
  created() {
    this.fetchProducts();
    this.token = localStorage.getItem("token");
  },
  methods: {
    ...mapActions(["fetchProducts", "deleteProductById", "updateProduct"]),
    openUpdateProductDialog(product) {
      this.selectedProductId = product.id;
      this.updateProductData = {
        title: product.title,
        description: product.description,
        imgURL: product.imgURL,
        price: product.price.toString(),
      };
      this.updateProductDialog = true;
    },
    async updateProductAction() {
      try {
        const updatedProductData = {
          title: this.updateProductData.title,
          description: this.updateProductData.description,
          imgURL: this.updateProductData.imgURL,
          price: parseFloat(this.updateProductData.price),
        };
        const updatedProduct = await this.updateProduct({
          productId: this.selectedProductId,
          updatedProductData: updatedProductData,
        });
        if (updatedProduct) {
          this.updateProductDialog = false;
          this.fetchCompanyProducts();
          alert("Product updated successfully");
        }
      } catch (error) {
        console.error(error);
      }
    },
    closeUpdateProductDialog() {
      this.updateProductDialog = false;
    },
    openDeleteProductDialog(product) {
      this.selectedProductId = product.id;
      this.deleteProductDialog = true;
    },
    closeDeleteProductDialog() {
      this.deleteProductDialog = false;
    },
    openAddProductDialog() {
      this.addProductDialog = true;
    },
    closeAddProductDialog() {
      this.addProductDialog = false;
    },
    addProduct() {
      const price = parseFloat(this.formData.price);
      if (isNaN(price)) {
        console.error("Invalid price format. Please enter a valid number.");
        return;
      }
      this.formData.price = price;
      axios
        .post(`${Api_Base_URL}users/product`, this.formData, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.fetchCompanyProducts();
          alert("Product is added Successfully");
          this.closeAddProductDialog();
        })
        .catch((error) => {
          console.error(error);
        });
        this.formData = {
    title: "",
    description: "",
    imgURL: "",
    price: ""
  };
    },
    fetchCompanyProducts() {
      axios
        .get(`${Api_Base_URL}users/product`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.companyProducts = response.data.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    async deleteProduct() {
      try {
        const response = await this.deleteProductById(this.selectedProductId);
        if (response && response.status === 200) {
          this.fetchCompanyProducts();
          this.deleteProductDialog = false;
          alert("Product deleted successfully");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  mounted() {
    this.fetchCompanyProducts();
  },
};
</script>

<style scoped>
#forms {
  padding: 6% 0;
}
div#product-chip {
  padding: 2% 0;
}
.v-img__img--contain {
    margin-top: 6%;
}
.v-card--variant-elevated {
    box-shadow: none;
}
</style>

