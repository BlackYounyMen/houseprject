<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-form-item label="角色名称">
          <el-input v-model="Name" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-button type="primary" @click="GetAll()">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>

      <el-table-column prop="Name" label="姓名" width="140"> </el-table-column>

      <el-table-column prop="ClassId" label="部门" width="120">
      </el-table-column>
      <el-table-column prop="OnlineState" label="状态" width="120">
      </el-table-column>

      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button @click="Edit(scope.row)" type="text" size="small"
            >查看考勤</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!--分页开始-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="page.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.total"
    >
    </el-pagination>
    <!--分页结束-->
    <el-dialog
      title="考勤统计查看"
      :visible.sync="EditDid"
      v-if="EditDid"
      width="90%"
    >
      <span>
        <RoleEdit :id="Fid" @Success="EditDigColse"></RoleEdit>
      </span>
      <span slot="footer"> </span>
    </el-dialog>
  </div>
</template>

<script>
import RoleEdit from "@/components/AttenDance";
export default {
  components: { RoleEdit },
  data() {
    return {
      Name: "",
      page: {
        pageindex: 1,
        pagedata: 10,
        total: 0,
        totalpage: 0,
      },
      addDid: false,
      EditDid: false,
      PlanDid: false,
      tableData: [],
      Fid: 0,
      List: [],
    };
  },
  methods: {
    //#region  表格数据方法

    //数据显示
    GetAll() {
      var token = {
        params: {
          name: this.Name,
          pageindex: this.page.pageindex,
          pagesize: this.page.pagedata,
        },
      };
      this.axios
        .get("https://localhost:5001/api/Personnel/GetData", token)
        .then((res) => {
          var data = res.data;
          if (data.Code == 200) {
            this.tableData = [];
            this.tableData = data.Data;

            this.page.total = data.PageCount;
            this.page.totalpage = data.PageSize;
          }
        });
    },

    Edit(val) {
      this.Fid = val.Id;
      this.EditDid = true;
    },

    //多选
    handleSelectionChange(val) {
      this.List = val;
    },
    //分页显示数
    handleSizeChange(val) {
      this.page.pagedata = val;
      this.GetAll();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page.pageindex = val;
      this.GetAll();
    },
    //修改滑块状态值
    EditState(val) {
      this.axios
        .post(`https://localhost:5001/api/Personnel/EditState?id=${val}`)
        .then((res) => {
          var data = res.data;
          if (data == true) {
            this.$message({
              showClose: true,
              message: "更改成功",
            });
          } else {
            this.$message({
              showClose: true,
              message: "更改失败",
            });
          }
        });
    },
    //#endregion

    //#region 行内数据操作

    Plan(val) {
      this.Fid = val.Id;
      this.PlanDid = true;
    },
    //删除方法
    Delete(val) {
      const list = [];
      list.push(val.Id);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .post("https://localhost:5001/api/Personnel/Delete", list)
            .then((res) => {
              var state = res.data;
              if (state == true) {
                this.$message({
                  showClose: true,
                  message: "删除成功",
                });
                this.GetAll();
              } else {
                this.$message({
                  showClose: true,
                  message: "删除失败",
                  type: "warning",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //#region  对话框部分
    //弹框开启
    DigOpen() {
      this.addDid = true;
    },
    //弹框关闭
    DigColse() {
      this.$message.success("添加成功");
      this.addDid = false;
      this.GetAll();
    },

    //修改弹框关闭
    EditDigColse() {
      this.$message.success("修改成功");
      this.EditDid = false;
      this.GetAll();
    },
    DigPlan() {
      this.$message.success("权限分配成功");
      this.PlanDid = false;
      this.GetAll();
    },
    //#endregion
  },
  created() {
    this.GetAll();
  },
};
</script>
<style>
.el-dialog {
  display: flex;
  flex-direction: column;
  margin: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  /*height:600px;*/
  max-height: calc(100% - 200px);
  max-width: calc(100% - 30px);
}
.el-dialog .el-dialog__body {
  flex: 1;
  overflow: auto;
}
</style>