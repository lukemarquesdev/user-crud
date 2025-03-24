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
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Users List</v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <v-btn icon color="primary" @click="openEditDialog(item)">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn icon color="red" @click="openDeleteDialog(item)">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
            </template>
        </v-data-table>

        <!-- Add/Edit Dialog -->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{ dialogMode === 'add' ? 'Add User' : 'Edit User' }}</span>
                </v-card-title>
                <v-card-text>
                    <v-form ref="form">
                        <v-text-field v-model="editedUser.name" label="Name" required></v-text-field>
                        <v-text-field v-model="editedUser.email" label="Email" required></v-text-field>
                    </v-form>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
                    <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
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
                    <v-btn color="blue darken-1" text @click="saveUser">Confimar</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            users: [
                { id: 1, name: "John Doe", email: "john@example.com" },
                { id: 2, name: "Jane Smith", email: "jane@example.com" },
            ],
            headers: [
                { text: "Name", value: "name" },
                { text: "Email", value: "email" },
                { text: "Actions", value: "actions", sortable: false },
            ],
            dialog: false,
            dialogDelete: false,
            dialogMode: "add",
            editedUser: { id: null, name: "", email: "" },
        };
    },
    methods: {
        openAddDialog() {
            this.dialogMode = "add";
            this.editedUser = { id: null, name: "", email: "" };
            this.dialog = true;
        },
        openEditDialog(user) {
            this.dialogMode = "edit";
            this.editedUser = { ...user };
            this.dialog = true;
        },
        openDeleteDialog(user) {
            this.dialogMode = "delete";
            this.dialogDelete = true;
        },
        closeDialog() {
            this.dialog = false;
            this.dialogDelete = false;
        },
        saveUser() {
            if (this.dialogMode === "add") {
                const newUser = { ...this.editedUser, id: Date.now() };
                this.users.push(newUser);
            } else if (this.dialogMode === "edit") {
                const index = this.users.findIndex((u) => u.id === this.editedUser.id);
                if (index !== -1) {
                    this.users.splice(index, 1, this.editedUser);
                }
            }
            this.closeDialog();
        },
        deleteUser(id) {
            this.users = this.users.filter((user) => user.id !== id);
        },
    },
};
</script>

<style scoped>
</style>