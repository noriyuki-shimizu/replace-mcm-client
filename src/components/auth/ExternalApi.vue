<template>
    <a-spin id="external_api" :spinning="spinning" size="large">
        <a-alert
            class="external-api-login-message"
            v-if="message.isShow"
            :message="message.text"
            :description="message.description"
            :type="message.type"
        />
        <a-button
            icon="google"
            class="external-api-login-button"
            id="google_login_button"
            @click="signInWithGoogle"
        >
            {{ $t('dictionary.authentication.external.with-google') }}
        </a-button>
        <a-button
            icon="twitter"
            class="external-api-login-button"
            id="twitter_login_button"
            @click="signInWithTwitter"
        >
            {{ $t('dictionary.authentication.external.with-twitter') }}
        </a-button>
        <a-button
            icon="facebook"
            class="external-api-login-button"
            id="facebook_login_button"
            @click="signInWithFacebook"
        >
            {{ $t('dictionary.authentication.external.with-facebook') }}
        </a-button>
    </a-spin>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import * as Vuex from 'vuex';
import { FirebaseExternalApiAuthError } from 'firebase';
import { AppMessage } from 'ant-design-vue/types/message';

import { isFirebaseAuthError } from '@/plugins/firebase/auth';
import {
    resetMessage,
    toErrorMessage,
    toFirebaseErrorMessage
} from '@/util/message';
import { toHome } from './externalApi';

@Component
export default class SignIn extends Vue {
    spinning = false;

    message: AppMessage = resetMessage();

    $store!: Vuex.ExStore;

    @Watch('$i18n.locale')
    onLocalChange() {
        this.message = resetMessage();
    }

    async signInWithGoogle(): Promise<void> {
        this.message = resetMessage();
        this.spinning = true;

        await this.$store
            .dispatch('user/signInWithGoogle')
            .then(() => toHome(this.$router))
            .catch(this.onError);
    }

    async signInWithTwitter(): Promise<void> {
        this.message = resetMessage();
        this.spinning = true;

        await this.$store
            .dispatch('user/signInWithTwitter')
            .then(() => toHome(this.$router))
            .catch(this.onError);
    }

    async signInWithFacebook(): Promise<void> {
        this.message = resetMessage();
        this.spinning = true;

        await this.$store
            .dispatch('user/signInWithFacebook')
            .then(() => toHome(this.$router))
            .catch(this.onError);
    }

    private onError(err: any) {
        const { $t } = this;
        this.spinning = false;
        this.message = isFirebaseAuthError(err)
            ? toFirebaseErrorMessage($t.bind(this), err)
            : toErrorMessage($t.bind(this), err);
    }
}
</script>

<style scoped>
#external_api {
    width: calc(24rem + (18vw - 17em));
    margin: auto;
}
.external-api-login-button {
    margin-top: 2%;
    margin-bottom: 2%;
    color: white;
    height: 4rem;
    width: 100%;
    font-size: calc(1.6rem + (1vw - 1em));
}
#google_login_button {
    background-color: #c6594b;
    border-color: #a94335;
}
#twitter_login_button {
    background-color: #55acee;
    border-color: #2795e9;
}
#facebook_login_button {
    background-color: #4267b2;
    border-color: #29487d;
}
.external-api-login-message {
    margin-top: 2%;
    margin-bottom: 4%;
}
</style>
