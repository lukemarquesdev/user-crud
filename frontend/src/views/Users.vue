<template>
    <v-container>
        <v-row justify="space-between" align="center">
            <h1>Lista de usuários</h1>
            <v-btn color="primary" @click="openAddDialog">Adionar</v-btn>
        </v-row>

        

        <v-data-table
            :headers="headers"
            :items="users"
            item-value="id"
            class="elevation-1"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn icon color="primary" @click="openEditDialog(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="openDeleteDialog(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <v-dialog v-model="dialogAdd" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Adicionar usuário</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field v-model="regUser.name" label="Nome completo" required></v-text-field>
                        <!-- <v-text-field v-model="editedUser.name" label="CPF" required></v-text-field> -->
                        <v-text-field v-model="regUser.email" label="E-mail" required></v-text-field>
                        <v-text-field 
                            v-model="regUser.password" 
                            :type="!showPassword ? 'text' : 'password'" 
                            label="Senha" 
                            required
                        >
                            <template v-slot:append>
                                <v-icon @click="togglePasswordVisibility">
                                    {{ !showPassword ? 'mdi-eye-off' : 'mdi-eye' }}
                                </v-icon>
                            </template>
                        </v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="registerUser">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogEdit" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Editar usuário</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field v-model="editedUser.name" label="Nome completo" required></v-text-field>
                        <!-- <v-text-field v-model="editedUser.name" label="CPF" required></v-text-field> -->
                        <v-text-field v-model="editedUser.email" label="E-mail" required></v-text-field>
                        <v-text-field v-model="editedUser.password" label="Senha" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="editUser">Salvar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Excluir usuário</span>
                </v-card-title>
                <v-card-text></v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Cancelar</v-btn>
                    <v-btn color="blue darken-1" text @click="deleteUser">Confimar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import UserService from '@/services/UserService';

export default {
    data() {
        return {
            headers: [
                { text: "Name", value: "name" },
                { text: "Email", value: "email" },
                { text: "Actions", value: "actions", sortable: false },
            ],
            dialogEdit: false,
            dialogAdd: false,
            dialogDelete: false,
            dialogMode: "add",
            regUser: { name: "", email: "", password: "" },
            editedUser: { name: "", email: "", password: "" },
            users: [],
            id: 0,
            showPassword: true
        };
    },
    methods: {
        async getAllUsers() {
            await UserService.getAllUsers()
                .then((response) => {
                    this.users = response.data;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async registerUser() {
            await UserService.registerUser(this.regUser)
                .then((response) => {
                    this.getAllUsers();
                    this.closeDialog();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async editUser() {
            this.editedUser.name = this.editedUser.name;
            this.editedUser.email = this.editedUser.email;
            this.editedUser.password = this.editedUser.password;

            await UserService.editUser(this.id, this.editedUser)
                .then((response) => {
                    this.getAllUsers();
                    this.closeDialog();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async deleteUser() {
            await UserService.deleteUser(this.id)
                .then((response) => {
                    this.getAllUsers();
                    this.closeDialog();
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        openAddDialog() {
            this.dialogMode = "add";
            this.regUser = { name: "", email: "", password: "" };
            this.dialogAdd = true;
        },
        openEditDialog(user) {
            this.dialogMode = "edit";
            this.editedUser = { name: user.name, email: user.email, password: '' };
            this.dialogEdit = true;
            this.id = user.id; 
        },
        openDeleteDialog(user) {
            this.dialogMode = "delete";
            this.dialogDelete = true;
            this.id = user.id;   
        },
        closeDialog() {
            this.dialogAdd = false;
            this.dialogEdit = false;
            this.dialogDelete = false;
            this.showPassword = false;
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        }
    },
    mounted() {
        this.getAllUsers();
    },
};
</script>

<style scoped>
</style>