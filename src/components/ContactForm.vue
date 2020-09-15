<template>
    <form @submit.prevent="submit">
        <!-- TODO: Show errors + success -->

        <input
            v-model="fields.name"
            type="text"
            name="name"
            required
        >

        <input
            v-model="fields.email"
            type="email"
            name="email"
            required
        >

        <input
            v-model="fields.subject"
            type="text"
            name="subject"
            required
        >

        <textarea
            v-model="fields.message"
            name="message"
            required
        />

        <!-- TODO: i18n -->
        <button type="submit">
            Submit
        </button>
    </form>
</template>

<script>
export default {
    data() {
        return {
            fields: {},
            isSending: false,
            successMsg: null,
            error: null,
            privacyChecked: false,
        }
    },
    created() {
        this.resetForm()
    },
    methods: {
        resetForm() {
            this.fields = {
                name: '',
                email: '',
                subject: '',
                message: '',
            }
        },
        submit() {
            return new Promise((resolve, reject) => {
                this.isSending = true

                this.successMsg = null
                this.error = null

                // TODO: Add docs for netlify local environment + deployment
                // TODO: Configure local env with Mailtrap
                // TODO: Add a unit test
                fetch('/.netlify/functions/sendMail', {
                    method: 'POST',
                    body: JSON.stringify(this.fields),
                })
                    .then(response => {
                        if (response.status === 200) {
                            // TODO: i18n
                            this.successMsg = 'Merci pour votre demande de contact ' + this.fields.name + ' ! À très bientôt !'
                            this.resetForm()
                            resolve(response)
                        } else {
                            // TODO: i18n
                            this.error = 'Une erreur est survenue lors de l’envoi de l’e-mail : ' + response.statusText
                            reject(new Error(this.error))
                        }
                    })
                    .catch(err => {
                        // TODO: i18n
                        this.error = 'Une erreur est survenue lors de l’envoi de l’e-mail : ' + err
                        reject(err)
                    })
                    .finally(() => {
                        this.isSending = false
                        // TODO: Install vue-scrollto + check if it works with renderless components
                        this.$scrollTo(this.$el)
                    })
            })
        },
    },
}
</script>
