<template>
    <v-container>
        <v-row md="12" justify="space-between" align="center mt-12">
            <h1>Lista de usuários</h1>
            <v-btn color="primary" @click="openAddDialog">Adicionar</v-btn>
        </v-row>

        <v-data-table
            md="12"
            :headers="headers"
            :items="users"
            item-value="id"
            class="elevation-1 mt-12"
            :loading="loading"
        >
            <template v-slot:item.actions="{ item }">
                <v-btn icon color="primary" @click="openEditDialog(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="openDeleteDialog(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
            <template v-slot:no-data>
                Nenhum dado disponível
            </template>
            <template v-slot:footer.page-text="{ pageStart, pageStop, itemsLength }">
                Mostrando {{ pageStart }} a {{ pageStop }} de {{ itemsLength }} itens
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
                        <v-text-field 
                            v-model="regUser.cpf" 
                            label="CPF" 
                            required 
                            maxlength="14"
                            @input="formatValueCPF()"
                        ></v-text-field>
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
                    <v-btn color="red" text @click="closeDialog">
                        Cancelar
                        <v-icon icon="mdi-cancel" end></v-icon>
                    </v-btn>
                    <v-btn color="primary" text @click="registerUser">
                        Salvar
                        <v-icon icon="mdi-content-save" end></v-icon>
                    </v-btn>
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
                        <v-text-field 
                            v-model="editedUser.cpf" 
                            label="CPF" 
                            required 
                            maxlength="14"
                            @input="formatValueCPF"
                        ></v-text-field>
                        <v-text-field v-model="editedUser.email" label="E-mail" required></v-text-field>
                        <v-text-field 
                            v-model="editedUser.password" 
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
                    <v-btn color="red" text @click="closeDialog">
                        Cancelar
                        <v-icon icon="mdi-cancel" end></v-icon>
                    </v-btn>
                    <v-btn color="primary" text @click="editUser">
                        Salvar 
                        <v-icon
                            icon="mdi-checkbox-marked-circle"
                            end
                        ></v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">Excluir usuário</span>
                </v-card-title>
                <v-card-text>Tem certeza que deseja excluir o usuário?</v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" text @click="closeDialog">
                        Cancelar
                        <v-icon icon="mdi-cancel" end></v-icon>
                    </v-btn>
                    <v-btn color="primary" text @click="deleteUser">
                        Confimar
                        <v-icon
                            icon="mdi-checkbox-marked-circle"
                            end
                        ></v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-snackbar
            v-model="snackbar"
            color="success"
        >
            {{ text }}
            <template v-slot:actions>
                <v-btn
                    color="white"
                    variant="text"
                    @click="snackbar = false"
                >
                Fechar
                </v-btn>
            </template>
        </v-snackbar>

    </v-container>
</template>

<script>
import UserService from '@/services/UserService';
import { removeFormatCPF, formatCPF } from '@/utils/cpf';

export default {
    data() {
        return {
            headers: [
                { text: "Name", value: "name" },
                { text: "CPF", value: "cpf" },
                { text: "Email", value: "email" },
                { text: "Actions", value: "actions", sortable: false },
            ],
            dialogEdit: false,
            dialogAdd: false,
            dialogDelete: false,
            dialogMode: "add",
            regUser: { name: "", cpf: "", email: "", password: "" },
            editedUser: { name: "", cpf: "", email: "", password: "" },
            users: [],
            id: 0,
            showPassword: true,
            loading: true,
            snackbar: false,
            text: '',
        };
    },
    methods: {
        async getAllUsers() {
            await UserService.getAllUsers()
                .then((response) => {
                    this.users = response.data.map(user => ({
                        ...user,
                        cpf: formatCPF(user.cpf)
                    }));
                    this.loading = false
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        async registerUser() {
            this.regUser.cpf = removeFormatCPF(this.regUser.cpf)
            
            await UserService.registerUser(this.regUser)
                .then((response) => {
                    this.showSnackbar('Usuário cadastrado com sucesso!')
                    this.loading = true;
                    this.getAllUsers();
                    this.closeDialog();
                })
                .catch((error) => {
                    console.error(error);
                });
        },

        async editUser() {
            this.editedUser.cpf = removeFormatCPF(this.editedUser.cpf)

            await UserService.editUser(this.id, this.editedUser)
                .then((response) => {
                    this.showSnackbar('Usuário editado com sucesso!')
                    this.loading = true;
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
                    this.showSnackbar('Usuário excluido com sucesso!')
                    this.loading = true;
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
            this.editedUser = { name: user.name, cpf: formatCPF(user.cpf), email: user.email, password: '' };
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
            this.showPassword = true;
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        formatValueCPF() {
            if (this.openAddDialog) this.regUser.cpf = formatCPF(this.regUser.cpf)
            if (this.openEditDialog) this.editedUser.cpf = formatCPF(this.editedUser.cpf)
        },
        showSnackbar(text) {
            this.text = text;
            this.snackbar = true
            setInterval(() => {
                this.snackbar = false
            }, 20000)
        }
    },
    mounted() {
        this.getAllUsers();
    },
};
</script>

<style scoped>
</style>

