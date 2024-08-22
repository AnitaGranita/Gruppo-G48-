<template>
    <div class="wrapper">
        <v-sheet class=" pa-12 mx-auto elevation-2" rounded width="400">
            <v-form ref="form">
                <img src="/logoVuoto.png" alt="Vocable Logo" />
                <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Vocable</span>

                <v-text-field v-model="name" :rules="nameRules" label="Username" required
                    variant="underlined"></v-text-field>

                <v-text-field class="required" type="email" :rules="emailRules" v-model="email"
                    label="Email" variant="underlined"></v-text-field>

                <v-text-field class="required" type="password" :rules="passwordRules" :counter="15" v-model="password"
                    label="Password" variant="underlined"></v-text-field>

                <v-text-field class="required" type="password" :rules="passwordRules" :counter="15" v-model="password"
                    label="Ripeti Password" variant="underlined"></v-text-field>


                <div class="d-flex flex-column">
                    <v-btn class="mt-4" color="blue" size="large" variant="elevated"  block @click="validate">
                        Valida
                    </v-btn>

                    <v-btn class="mt-4 text-white" color="blue-500"  variant="elevated" block @click="reset">
                        Clear Form
                    </v-btn>

                </div>
            </v-form>
        </v-sheet>
    </div>
</template>

<script>
export default {
    data: () => ({
        name: '',
        nameRules: [
            v => !!v || 'Username necessario!',
        ],
        passwordRules: [
            v => !!v || 'Obbligatorio',
            v => v && v.length >= 6 || 'Password troppo corta, almeno 6 caratteri',
            v => (v && v.length <= 15) || 'La password deve essere al massimo 15 caratteri!',
        ],
        emailRules: [
            v => !!v || 'Obbligatorio',
            v => v && /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'Email non valida'
        ],
    }),

    methods: {
        async validate() {
            const { valid } = await this.$refs.form.validate()

            if (valid) alert('Form is valid')
        },
        reset() {
            this.$refs.form.reset()
        },
    },
}
</script>

<style scoped>
.wrapper {
    display: block;
    align-items: center;
    margin: auto;
    width: 50%;
    padding: 15px;
    text-align: center;
    padding-top: 5%;
}

img {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 15%;
    height: auto;
}
</style>