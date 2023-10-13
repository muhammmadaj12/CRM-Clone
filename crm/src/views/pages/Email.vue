<template>
    <div id="forms">
        <v-row>
            <v-col cols="12" v-if="!isToken" class="text-center">
                <v-btn @click="login">Login Using Gmail</v-btn>
                
            </v-col>
            <v-col cols="12" v-else-if="isToken">
              <div id="compose-btns">
                <v-row> 
                    <v-col cols="6" class="text-start">
                        <v-btn @click="login">Logout from Gmail</v-btn>
                    </v-col>
                    <v-col cols="6" class="text-end">
                        <v-btn style="text-align: end;" color="primary" @click="sentEmail = true"> Sent Email </v-btn>
                    </v-col>
                </v-row>  
            </div>
                <div id="recvied-emails">
                    <div style="padding: 3%;">
            <v-dialog v-model="sentEmail" width="500">
                <v-container style="padding: 20px;">
                    <v-card>
                        <FormFields :fields="fields" :formData="formData" :errorMessages="errorMessages" />
                        <v-card-actions>
                            <v-btn color="primary" block @click="sendEmail">Send Your Email</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-dialog>
        </div>
        <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="center">
            <v-tab value="1">Receive Emails</v-tab>
            <v-tab value="2">Send Emails</v-tab>
        </v-tabs>
        <v-window v-model="tab">

            <!-- Content tab Receive -->
            <v-window-item value="1">
<!-- {{ console.log("rece",allReceivedEmails) }} -->
                    <div v-for="(email, index) in allReceivedEmails" :key="index">
                        <div class="email-item">
                            <v-icon class="mr-2">mdi-email</v-icon>
                            <v-chip>
                                <v-avatar>
                                    <v-icon small>mdi-account</v-icon>
                                </v-avatar>
                                <span>{{ email.sender }}</span>
                            </v-chip>
                            <span class="email-subject">{{ email.subject }}</span>
                            <v-icon class="ml-auto" @click="showEmailDetails(email)">mdi-eye</v-icon>
                        </div>
                </div>
            </v-window-item>
            <v-window-item value="2">
                <v-container fluid>
                    <div v-for="(email, index) in allSendEmails" :key="index">
                        <div class="email-item">
                            <v-icon class="mr-2">mdi-email</v-icon>
                            <v-chip>
                                <v-avatar>
                                    <v-icon small>mdi-account</v-icon>
                                </v-avatar>
                                <span>{{ email.sender }}</span>
                            </v-chip>
                            <span class="email-subject">{{ email.subject }}</span>
                            <v-icon class="ml-auto" @click="showEmailDetails(email)">mdi-eye</v-icon>
                        </div>
                    </div>
                </v-container>
            </v-window-item>
        </v-window>
        <!-- Email Detail Modal -->
        <v-dialog v-model="viewEmailDetails" max-width="800">
            <v-card>
                <v-card-text>
                    <div>
                        <strong>Subject:</strong> {{ selectedEmail.subject }}
                    </div>
                    <div>
                        <strong>Sender:</strong> {{ selectedEmail.sender }}
                    </div>
                    <div>
                        <strong>Receiver:</strong> {{ selectedEmail.receiver }}
                    </div>
                    <v-divider></v-divider>
                    {{ selectedEmail.body }}
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="viewEmailDetails = false">Close</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
  
<script>
import FormFields from '@/components/commons/FormFields.vue';
import Table from '@/common/Table.vue'
import { mapGetters, mapActions, mapMutations} from 'vuex';
import { ref } from 'vue';
import { googleSdkLoaded } from 'vue3-google-login';
import axios from 'axios';
import { Api_Base_URL } from '@/constants/BaseURL.js';
// const accessToken = ref(null);
import {accessToken} from '@/store/email/email.module.js';
const loginToken = localStorage.getItem('token');
export default {
    name: 'Email',
    components: {
        FormFields,
        Table,
    },
    data: () => ({
        tab: null,
        sentEmail: false,
        selectedEmail: null,
        isToken: false,
        viewEmailDetails: false,
        sentEmails: [], 
        emailDialog: false,
        selectedEmail: null,
        viewEmailDetails: false,
        emailFields: [ 
            {
                key: "from",
                label: "From",
                type: "email",
                rules: {
                    required: true,
                    email: true
                }
            },
            {
                key: "to",
                label: "To",
                type: "email",
                rules: {
                    required: true,
                    email: true
                }
            },
            {
                key: "subject",
                label: "Subject",
                type: "text",
                rules: {
                    required: true,
                    email: false
                }
            },
            {
                key: "message",
                label: "Message",
                type: "textarea",
                rules: {
                    required: true,
                    email: false
                }
            },
        ],
        fields: [
            {
                key: "from",
                label: "From",
                type: "email",
                rules: {
                    required: true,
                    email: true
                }
            },
            {
                key: "to",
                label: "To",
                type: "email",
                rules: {
                    required: true,
                    email: true
                }
            },
            {
                key: "subject",
                label: "Subject",
                type: "text",
                rules: {
                    required: true,
                    email: false
                }
            },
            {
                key: "message",
                label: "Message",
                type: "textarea",
                rules: {
                    required: true,
                    email: false
                }
            },
        ],
        formData: {
            from: '', 
            to: '',
            subject: '',
            body: '',
        },

    // viewEmailDetails: false,
        message: '',

    }),
    computed: {
     ...mapGetters(['allReceivedEmails', 'allSendEmails','isToken']),

        sentEmails() {
            return this.$store.getters['sendemails/getSentEmails'];
        },
        isUserLoggedIn() {
    return this.isAuthenticated;
  },
    },
        methods: {
        ...mapActions(['fetchEmails', 'viewSentEmails', ]),
        ...mapMutations(['setIsToken']), // Import the mutation to set isToken from your Vuex module
        showEmailDetails(email) {
            this.selectedEmail = email;

            this.viewEmailDetails = true;

        },

        async login() {
            if (!isUserLoggedIn() && !this.accessToken) {
                googleSdkLoaded((google) => {
                    google.accounts.oauth2.initCodeClient({
                        client_id: '647318104905-1seibsq3nk58501f551f1erb1k3pkk0m.apps.googleusercontent.com', // Replace with your actual Google OAuth client ID
                        scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/contacts.readonly https://www.googleapis.com/auth/gmail.send',
                        callback: async (response) => {
                            console.log('Handle the response', response);

                            if (response.error) {
                                console.error('Google OAuth error:', response.error);
                                return;
                            }

                            try {
                                console.log('asdasd');
                                const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', null, {
                                    params: {
                                        code: response.code,
                                        client_id: '647318104905-1seibsq3nk58501f551f1erb1k3pkk0m.apps.googleusercontent.com',
                                        client_secret: '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',
                                        redirect_uri: 'http://localhost:3000',
                                        grant_type: 'authorization_code',
                                    },
                                });

                                console.log({ tokenResponse });
                                localStorage.setItem("AccessToken", tokenResponse.data.access_token)                                

                                const apiResponse = await axios.post(`${Api_Base_URL}get-token`, {token: tokenResponse.data}, {
                                    headers: {
                                        Authorization: `Bearer ${loginToken}`
                                    }
                                }); 

                                console.log("Responce Dataaa", apiResponse.data);

                                if(apiResponse.data == "token saved"){
                                    this.isToken = true;
                                    await this.fetchEmails();
                                    await this.viewSentEmails();
                                }


                                // accessToken = tokenResponse.data.access_token;

                            } catch (error) {
                                console.error('Error fetching emails:', error);
                            }
                        },
                    }).requestCode();
                });
            } 
        },
        isUserLoggedIn() {
            return false;
        },
        async fetchAllEmails() {
  try {
    if (!this.accessToken) {
      console.error('Access token is missing. Please log in with Google.');
      return;
    }

    console.log("Access Token from Vuex:", this.accessToken);
    const response = await axios.get(`${Api_Base_URL}emails/inbox`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
      },
    });

    return response.data;
  } catch (e) {
    throw new Error(e);
  }
},
        selectEmail(email) {
            this.$store.dispatch('sendemails/selectEmail', email);
            this.emailDialog = true;
        },
        closeEmailDialog() {
            this.$store.dispatch('sendemails/selectEmail', null);
            this.emailDialog = false;
        },
        sendEmail() {
            const payload = {
                subject: this.formData.subject,
                from: this.formData.from,
                to: this.formData.to,
                message: this.formData.message,
            };
            // console.log("1adskjn1",accessToken);
            // console.log("2jahsddb2",loginToken);
            axios
                .post(`${Api_Base_URL}send`, payload,{
                    headers: {
                        Authorization: `Bearer ${loginToken}`
                    }
                }) 
                .then((response) => {
                    // Handle the response from the API
                    if (response.data.msg === 'Successfully') {
                        // Email sent successfully, you can add further handling here
                        alert('Email sent successfully!');
                        this.formData.subject = '';
                        this.formData.from = '';
                        this.formData.to = '';
                        this.formData.message = ''; // Use 'message' instead of 'body'
                        this.sentEmail = false; // Close the dialog
                    } else {
                        // Handle any errors from the API
                        alert('Failed to send email.');
                    }
                })
                .catch((error) => {
                    console.error('An error occurred while sending the email:', error);
                });
        },
    }
};

const isUserLoggedIn = () => {

    return false;
};
</script>
  
  
<style scoped>
#forms {
    padding: 6% 0;
}

.email-item {
    display: flex;
    align-items: center;
    padding: 8px;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    margin-top: 50px;
}

.email-subject {
    flex: 1;
    margin-left: 8px;
}

.email-item:hover {
    background-color: #f3f3f3;
}

.v-card {
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    padding: 16px;
}

.v-divider {
    margin: 16px 0;
}

.v-card-text {
    font-size: 15px;
    line-height: 1.6;
}

.v-btn {
    margin-top: 16px;
}
</style>
  