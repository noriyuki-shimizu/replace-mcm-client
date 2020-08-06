import Vue from 'vue';
import * as Vuex from 'vuex';
import VueRouter, { RawLocation } from 'vue-router';
import { Modal } from 'ant-design-vue';
import getI18nInstance from '@/plugins/i18n';

type VueRouterNext = (
    to?: RawLocation | false | ((vm: Vue) => any) | void
) => void;

export const handleForbiddenError = (
    err: any,
    store: Vuex.ExStore,
    router: VueRouter | VueRouterNext
) => {
    const i18n = getI18nInstance();
    if (err.response && err.response.status === 403) {
        Modal.warning({
            title: i18n.t('message.info.session-timeout'),
            content: i18n.t('message.info.signin-again'),
            onOk: () => {
                store.commit('brand/allStateReset');
                store.commit('clothes/allStateReset');
                store.commit('coordinate/allStateReset');
                store.commit('genre/allStateReset');
                store.commit('shop/allStateReset');

                store.dispatch('user/signOut');

                if (router instanceof VueRouter) {
                    router.push({ path: '/sign-in', query: { next: 'back' } });
                    return;
                }
                router({ path: '/sign-in', query: { next: 'back' } });
            }
        });
    }
};

export default {};
