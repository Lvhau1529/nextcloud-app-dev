<template>
  <div v-if="visible" class="wrapper-modal">
    <a-modal
      centered
      :maskClosable="false"
      :width="540"
      :destroy-on-close="true"
      :visible.sync="visible"
      @cancel="handleCancel"
      class="custom-modal"
    >
      <template slot="title">
        <div class="modal__header">
          <p>Chọn thư mục đích</p>
        </div>
      </template>
      <div class="modal__content">
        <div class="modal__content--header">
          <BreadcrumbField
            :breadcrumb-data="treeData"
            :selected-value="selectFolder"
            @BreadcrumbItem="handleClickBreadcrumb"
          />
          <div @click="handleChangeStyle" style="cursor: pointer">
            <a-icon
              v-if="!isListStyle"
              style="margin-bottom: 11px"
              type="appstore"
              theme="filled"
            />
            <a-icon v-else style="margin-bottom: 11px" type="unordered-list" />
          </div>
        </div>
        <template v-if="isListStyle">
          <a-row class="folders">
            <template v-if="showData && showData.length > 0">
              <template v-for="(item, index) in showData">
                <a-col
                  class="folder-item"
                  :span="6"
                  :key="index"
                  @click="customRowList(item)"
                >
                  <div class="item-icon">
                    <a-icon
                      style="font-size: 30px"
                      type="folder"
                      theme="twoTone"
                    />
                  </div>
                  <div class="item-title">{{ item.title }}</div>
                </a-col>
              </template>
            </template>
            <template v-else>
              <EmptyField />
            </template>
          </a-row>
        </template>
        <template v-else>
          <a-table
            :customRow="customRow"
            :columns="columns"
            :data-source="showData"
            :pagination="false"
            :scroll="{ y: 400 }"
          >
            <template slot="folder">
              <a-icon style="font-size: 25px" type="folder" theme="twoTone" />
            </template>
            <template slot="nameFolder" slot-scope="nameFolder">
              <p style="cursor: pointer">{{ nameFolder }}</p>
            </template>
          </a-table>
        </template>
      </div>
      <template slot="footer">
        <div class="modal__footer">
          <a-button
            type="primary"
            @click="handleCopyFile"
            :disabled="loadingMove"
            :loading="loadingCopy"
            >Sao chép</a-button
          >
          <a-button
            type="primary"
            @click="handleMoveFile"
            :disabled="loadingCopy"
            :loading="loadingMove"
            >Chuyển</a-button
          >
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import ECM from "@/services/ecm/index";
import EmptyField from "@/components/EmptyField.vue";
export default {
  name: "PopupFolder",
  components: {
    EmptyField,
  },
  props: {
    rawList: {
      type: Object,
      default: () => {},
      required: true,
    },
  },
  data() {
    return {
      visible: false,
      loadingCopy: false,
      loadingMove: false,
      isListStyle: false,
      data: [],
      showData: [],
      columns: [
        {
          title: "",
          dataIndex: "folder",
          width: "40px",
          scopedSlots: { customRender: "folder" },
        },
        {
          title: "Tên",
          dataIndex: "title",
          width: "250px",
          scopedSlots: { customRender: "nameFolder" },
          sorter: (a, b) => a.title.localeCompare(b.title),
        },
        {
          title: "Kích cỡ",
        },
        {
          title: "Thay đổi",
        },
      ],
      currenFolder: "",
      selectFolder: "/",
    };
  },
  watch: {
    currenFolder: {
      handler(val) {
        this.showData = this.getNodesByTitle(this.data, val);
      },
    },
  },
  created() {
    const listFolder = this.handleListFolder(this.rawList.result);
    this.data = [this.transformData(listFolder[0].child)];
    this.showData = this.data;
  },
  computed: {
    ...mapState({
      folderSelected: (state) => state.global.folderSelected,
      treeData: (state) => state.global.treeData,
    }),
    ...mapGetters("table", ["getSelectedRowKeys"]),
  },
  methods: {
    handleChangeStyle() {
      this.isListStyle = !this.isListStyle;
    },
    handleClickBreadcrumb(breadcrumb) {
      this.currenFolder = breadcrumb.title;
      this.selectFolder = breadcrumb.value;
    },
    transformData(data) {
      const root = { title: "/", value: "/", child: [] };
      const map = { "/": root };

      data.forEach(({ value, child }) => {
        const nodes = value.split("/");
        let parent = root;
        let path = "";
        nodes.forEach((node) => {
          if (node !== "") {
            path += node + "/";
            if (!map[path]) {
              const newFolder = {
                title: node,
                value: path,
                child: [],
              };
              map[path] = newFolder;
              parent.child.push(newFolder);
            }
            parent = map[path];
          }
        });
        parent.child = [...parent.child, ...child];
      });
      return root;
    },
    handleListFolder(listFoler) {
      let result = [];
      for (const i of listFoler) {
        if (i.path === "" && i.type === "folder") {
          result.push({
            title: "/",
            value: "/",
            child: [],
          });
        }
        if (i.path && i.type === "folder") {
          result[0].child.push({
            title: i.path,
            value: i.path,
            child: [],
          });
        }
      }
      return result;
    },
    getNodesByTitle(tree, title) {
      const result = [];

      function traverse(node) {
        if (node.title === title) {
          result.push(...(node.child || []));
        }
        if (node.child) {
          node.child.forEach((item) => traverse(item));
        }
      }

      tree.forEach((node) => traverse(node));

      return result;
    },
    customRowList(record) {
      this.currenFolder = record.title;
      this.selectFolder = record.value;
    },
    customRow(record) {
      return {
        on: {
          click: () => {
            this.currenFolder = record.title;
            this.selectFolder = record.value;
          },
        },
      };
    },
    handleCopyFile() {
      this.loadingCopy = true;
      const payload = {
        ecm_source_path: this.getSelectedRowKeys[0].invoice_file_name,
        ecm_destination_path: this.selectFolder,
      };
      ECM.CopyFile(payload)
        .then((res) => {
          if (res?.code === "0") {
            this.$message.success(res?.message || "Copy file thành công");
          } else {
            this.$message.warning(res?.message);
          }
        })
        .catch((err) => {
          this.$message.error(
            err?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau"
          );
          this.loadingCopy = false;
        });
    },
    async handleMoveFile() {
      this.loadingMove = true;
      const payload = {
        ecm_source_path: this.getSelectedRowKeys[0].invoice_file_name,
        ecm_destination_path: this.selectFolder,
      };
      await ECM.MoveFile(payload)
        .then((res) => {
          console.log(res);
          if (res?.code === "0") {
            this.$message.success(res?.message || "Di chuyển file thành công");
          } else {
            this.$message.warning(res?.message);
          }
          this.loadingMove = false;
        })
        .catch((err) => {
          this.$message.error(
            err?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau"
          );
          this.loadingMove = false;
        });
    },
    showModal() {
      this.visible = true;
    },
    handleCancel() {
      this.visible = false;
      this.$emit("Cancel");
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  &__header {
    p {
      font-size: 19px;
      margin: 0;
    }
  }

  &__content {
    font-weight: 500;

    p {
      margin: 0;
    }

    &--note {
      font-style: italic;
    }
    &--header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  &__footer {
    display: flex;
    justify-content: flex-end;

    button:last-child {
      margin-left: 10px;
    }
  }
}
.folders {
  margin-top: 15px;
  .folder-item {
    text-align: center;
    margin-bottom: 15px;
    cursor: pointer;
    &:hover {
      background-color: #e6f4ff;
    }
  }
}
.item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
::v-deep .ant-table-thead > tr > th,
::v-deep .ant-table-tbody > tr > td {
  padding: 10px;
}
</style>

<style lang="scss" scoped>
  @import '@/assets/styles/popup.scss';
</style>
