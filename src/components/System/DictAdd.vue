<template >
  <div>
    <el-form
      :model="form"
      ref="form"
      :rules="rules"
      label-width="80px"
      :inline="false"
      size="normal"
    >
      <el-form-item label="字典项" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-switch
          v-model="form.state"
          active-color="#13ce66"
          inactive-color="#ff4949"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="add('form')">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: "",
        state: true,
      },
      rules: {
        name: [{ required: true, message: "请输入字典项", trigger: "blur" }],
        state: [
          { required: true, message: "请输入字典值状态", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    add(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios
            .post("https://localhost:5001/api/Dictionaries/DIcAdd", this.form)
            .then((res) => {
              if (res.data == true) {
                this.$message({
                  showClose: true,
                  message: "添加成功",
                  type: "warning",
                });
              }
              this.$emit("Success");
            });
        } else {
          return false;
        }
      });
    },
  },
};
</script>
<style >
</style>