<template>
    <slot-dialog-table>
        <el-dialog title="图片列表" :visible.sync="showFlag" width="80%" :close-on-click-modal="false">
            <el-table :data="list" border>
                <el-table-column label="图片" width="300">
                    <template slot-scope="scope">
                        <dialogImg :img="getPath(scope.row)"></dialogImg>
                    </template>
                </el-table-column>
                <el-table-column label="链接">
                    <template slot-scope="scope">
                        <P>{{getPath(scope.row)}}</P>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200">
                    <template slot-scope="scope">
                        <el-button size="small" round type="danger" icon="el-icon-delete"
                                   @click="del(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </slot-dialog-table>
</template>

<script>

    import dialogImg from '@/components/common/dialog/img';

    export default {
        data() {
            return {
                showFlag: false,
                form: {
                    file: ''
                }
            };
        },
        methods: {
            open() {
                this.$axios({actionType: 'articleArrange/act/IMGS', body: this.form}).then(() => {
                    this.showFlag = true;
                });
            },
            setFile(file) {
                this.form.file = file;
            },
            getPath(img) {
                return `http://${window.location.host}:80/blog/img/${this.form.file.split('.')[0]}/${img}`;
            },
            del(img) {
                this.$confirm(`是否删除 ${img}`, '提示', {type: 'warning'}).then(() => {
                    this.$axios({
                        actionType: 'articleArrange/act/IMGDEL',
                        body: {img: `${this.form.file.split('.')[0]}/${img}`}
                    }).then(() => {
                        this.$message.success('删除成功');
                        this.$axios({actionType: 'articleArrange/act/IMGS', body: this.form});
                    });
                }, () => {
                    this.$message.info('删除已取消');
                });
            }
        },
        computed: {
            list() {
                return this.$store.getters['articleArrange/get/IMGS'];
            }
        },
        components: {
            dialogImg
        }
    };
</script>
