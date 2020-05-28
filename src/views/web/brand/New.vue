<template>
    <div>
        <a-page-header title="Brand" subTitle="new item" />
        <a-divider class="c-pipe" />
        <a-alert
            class="c-alert-message"
            v-if="message.isShow"
            :message="message.text"
            :description="message.description"
            :type="message.type"
            showIcon
        />
        <brand-form v-on:on-submit="onSubmit" />
    </div>
</template>

<script lang="ts">
import { Vue, Component, Emit } from 'vue-property-decorator';
import * as Vuex from 'vuex';
import { AppMessage } from 'ant-design-vue/types/message';

import BrandForm from '@/components/brand/Form.vue';
import { FormFields } from '@/components/brand/type';
import { resetMessage } from '@/util/message';
import { handleForbiddenError } from '@/util/errorHandle';

@Component({
    components: {
        BrandForm
    }
})
export default class New extends Vue {
    message: AppMessage = resetMessage();

    $store!: Vuex.ExStore;

    onError(err: any) {
        this.message = resetMessage();
        handleForbiddenError(err, this.$store, this.$router);

        this.message = {
            isShow: true,
            text: `Error (${err.message})`,
            description: err.response
                ? err.response.data
                : `Access URL: ${err.config.url}`,
            type: 'error'
        };
    }

    async onRegister(values: FormFields) {
        await this.$store.dispatch('brand/onAddBrand', values);

        this.$success({
            title: 'Create success 👏',
            onOk: () => {
                if (this.$route.query.next === 'back') {
                    this.$router.back();
                    return;
                }
                this.$router.push({ name: 'brand' });
            }
        });
    }

    @Emit('on-submit')
    async onSubmit(values: FormFields) {
        this.$confirm({
            title: 'Are you sure you want to register?',
            content: 'The entered information is registered.',
            onOk: async () => {
                await this.onRegister(values).catch(this.onError);
            },
            onCancel() {}
        });
    }
}
</script>