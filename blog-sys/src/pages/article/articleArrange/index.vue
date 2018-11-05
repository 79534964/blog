<template>
    <slot-tab-tabs>
        <el-button size="small" type="primary" @click="add" v-if="active === 'list'">
            新增文章
        </el-button>
        <el-tabs v-model="active">
            <el-tab-pane label="文章列表" name="list">
                <list ref="listNode" @update="update"></list>
            </el-tab-pane>
            <el-tab-pane :label="label" name="update" :disabled="true">
                <update ref="updateNode" @success="success"></update>
            </el-tab-pane>
        </el-tabs>
    </slot-tab-tabs>
</template>

<script type="text/ecmascript-6">
    import list from './list';
    import update from './update';

    export default {
        name: 'productGroup',
        data() {
            return {
                active: 'list',
                label: ''
            };
        },
        methods: {
            update(file) {
                this.active = 'update';
                this.label = file;
                this.$refs.updateNode.update(file);
            },
            add() {
                this.active = 'update';
                this.label = '新增文章';
                this.$refs.updateNode.add();
            },
            success() {
                this.active = 'list';
                this.$refs.listNode.query();
            }
        },
        components: {
            list,
            update
        }
    };
</script>
