export default {
  init({point = '', successPoint = true, failPoint = true, success = null, fail = null}) {
    this.$confirm(point, '提示', {type: 'warning'}).then(() => {
      success && success();
      successPoint && this.$message.success('操作成功!');
    }, () => {
      fail && fail();
      failPoint && this.$message.info('操作已取消');
    });
  }
};
