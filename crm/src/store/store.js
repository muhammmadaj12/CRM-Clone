import { createStore } from "vuex";
import contacts from '@/store/contacts/contacts.module.js';
import User from '@/store/User/User.module.js';
import companies from '@/store/companies/companies.module.js';
import deals from '@/store/deals/deals.module.js';
import blog from '@/store/blog/blog.module.js';
import sendemails from '@/store/sendemails/sendemails.module.js';
import forms from "@/store/Forms/forms.module.js";
import email from "@/store/email/email.module.js";
import permissions from "@/store/permissions/permissions.module";
import auth from "./auth/auth.module";


// const BASE_URL = "http://10.0.10.41:3500";
import products from "./products/products.module";

export default createStore({
  modules: {
    contacts,
    User,
    companies,
    deals,
    blog,
    forms,
    email,
    sendemails, // Register the sendemails module
    products,
    permissions,
    auth
  },
});
