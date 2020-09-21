<template>
    <b-form @submit.prevent="submit">
        <b-alert
            v-if="successMsg"
            variant="success"
            show
        >
            {{ successMsg }}
        </b-alert>

        <b-alert
            v-if="error"
            variant="danger"
            show
        >
            {{ error }}
        </b-alert>

        <b-form-group
            :label="$t('contact.fields.name')"
            :state="isNameValid"
            :invalid-feedback="nameFeedback"
        >
            <b-form-input
                v-model="fields.name"
                :state="isNameValid"
                type="text"
                name="name"
                required
            />
        </b-form-group>

        <b-form-group
            :label="$t('contact.fields.email')"
            :state="isEmailValid"
            :invalid-feedback="emailFeedback"
        >
            <b-form-input
                v-model="fields.email"
                :state="isEmailValid"
                type="email"
                name="email"
                required
            />
        </b-form-group>

        <b-form-group
            :label="$t('contact.fields.subject')"
            :state="isSubjectValid"
            :invalid-feedback="subjectFeedback"
        >
            <b-form-input
                v-model="fields.subject"
                :state="isSubjectValid"
                type="text"
                name="subject"
                required
            />
        </b-form-group>

        <b-form-group
            :label="$t('contact.fields.message')"
            :state="isMessageValid"
            :invalid-feedback="messageFeedback"
        >
            <b-form-textarea
                v-model="fields.message"
                :state="isMessageValid"
                name="message"
                required
            />
        </b-form-group>

        <b-button
            :disabled="isSending"
            variant="primary"
            type="submit"
        >
            <spinner
                v-if="isSending"
                small
            />
            <span>{{ $t('contact.submit') }}</span>
        </b-button>
    </b-form>
</template>

<script>
import {
    BAlert,
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BFormTextarea,
} from 'bootstrap-vue'
import Spinner from '~/components/Spinner'

export default {
    components: {
        BAlert,
        BButton,
        BForm,
        BFormGroup,
        BFormInput,
        BFormTextarea,
        Spinner,
    },
    data() {
        return {
            fields: {},
            isSending: false,
            successMsg: null,
            error: null,
            privacyChecked: false,
        }
    },
    computed: {
        isEmailCompliant() {
            return typeof this.fields.email === 'string' && Boolean(this.fields.email.match(/.+@.+/))
        },
        isEmailValid() {
            if (this.fields.email === null) {
                return null
            }

            return this.isFieldValid(this.fields.email) && this.isEmailCompliant
        },
        isMessageValid() {
            if (this.fields.message === null) {
                return null
            }

            return this.isFieldValid(this.fields.message)
        },
        isNameValid() {
            if (this.fields.name === null) {
                return null
            }

            return this.isFieldValid(this.fields.name)
        },
        isSubjectValid() {
            if (this.fields.subject === null) {
                return null
            }

            return this.isFieldValid(this.fields.subject)
        },
        defaultFeedback() {
            return this.$t('contact.feedback.required')
        },
        emailFeedback() {
            if (this.isFieldValid(this.fields.email) && !this.isEmailCompliant) {
                return this.$t('contact.feedback.email')
            }

            return this.defaultFeedback
        },
        messageFeedback() {
            return this.defaultFeedback
        },
        nameFeedback() {
            return this.defaultFeedback
        },
        subjectFeedback() {
            return this.defaultFeedback
        },
    },
    created() {
        this.resetForm()
    },
    methods: {
        isFieldValid(field) {
            return Boolean(field && field.length)
        },
        resetForm() {
            this.fields = {
                name: null,
                email: null,
                subject: null,
                message: null,
            }
        },
        submit() {
            return new Promise((resolve, reject) => {
                if (!this.isSending) {
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
                                this.successMsg = this.$t('contact.feedback.success', { name: this.fields.name })
                                this.resetForm()
                                resolve(response)
                            } else {
                                this.error = this.$t('contact.feedback.error', { error: response.statusText })
                                reject(new Error(this.error))
                            }
                        })
                        .catch(error => {
                            this.error = this.$t('contact.feedback.error', { error })
                            reject(error)
                        })
                        .finally(() => {
                            this.isSending = false
                            this.$scrollTo(this.$el)
                        })
                }
            })
        },
    },
}
</script>
