<<<<<<< HEAD
<template>
  <div>
    <a-table ref="aTable" :loading="loading" :row-key="(record) => JSON.stringify(record)" :row-selection="rowSelection"
      :columns="columns" :data-source="data" :pagination="false" :scroll="{ x: true }">
      <a-table-column title="Column Title" dataIndex="columnDataIndex" :scopedSlots="{ customRender: 'ellipsis' }"
        :ellipsis="{ tooltip: true }" />
      <template slot-scope="text, record, index" slot="stt">
        <div style="text-align: center">
          {{ (pagination.page - 1) * pagination.pageSize + index + 1 }}
        </div>
      </template>

      <template slot="ngay_lap_hoa_don" slot-scope="ngay_lap_hoa_don">
        <span>{{ ngay_lap_hoa_don | formatDate }}</span>
      </template>

      <template slot="tong_tien_khong_thue" slot-scope="tong_tien_khong_thue">
        <span>{{ tong_tien_khong_thue | formatMoney }}</span>
      </template>

      <template slot="tong_tien_thue" slot-scope="tong_tien_thue">
        <span>{{ tong_tien_thue | formatMoney }}</span>
      </template>

      <template slot="tong_gt_thanh_toan" slot-scope="tong_gt_thanh_toan">
        <span>{{ tong_gt_thanh_toan }}</span>
      </template>

      <!-- <template slot="trang_thai_ERP" slot-scope="trang_thai_ERP">
        <a-tag :color="trang_thai_ERP === 'Chưa tích hợp' ? 'pink' : 'green'">
          {{ trang_thai_ERP }}
        </a-tag>
      </template> -->

      <template slot="trang_thai_HD" slot-scope="file_id">
        <ItemInvoice
          ref="ItemInvoice"
          :fileId="file_id"
          :reload="reloadCheck"
          @checkVaildSuccess="handleCheckValidSuccess"
        />
      </template>
      <template slot="footer">
        <div>
          <a-pagination v-model="pagination.page" :page="pagination.page" :page-size.sync="pagination.pageSize"
            :default-page="1" :total="total" show-quick-jumper show-size-changer @change="handlePageSizeChange" />
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import list_process_invoice from "@/data/list_process_invoice";
import { mapState, mapActions } from "vuex";
import ECM from "@/services/ecm";
import ItemInvoice from "./ItemInvoice.vue";

export default {
  name: "TableField",
  props: {
    folderSelected: {
      type: String,
      default: "",
    },
  },
  components: {
    ItemInvoice,
  },
  data() {
    return {
      data: null,
      loading: true,
      columns: [
        {
          title: "STT",
          dataIndex: "stt",
          width: "60px",
          key: "stt",
          scopedSlots: { customRender: "stt" },
          fixed: "left",
        },
        {
          title: "Tên file hoá đơn",
          dataIndex: "invoice_file_name",
          fixed: "left",
        },
        {
          title: "Người upload",
          dataIndex: "user_upload",
        },
        {
          title: "Mẫu số hoá đơn",
          dataIndex: "mau_so_hoa_don",
        },
        { title: "Ký hiệu hoá đơn", dataIndex: "ky_hieu_hoa_don" },
        {
          title: "Số hoá đơn",
          dataIndex: "so_hoa_don",
        },
        {
          title: "Ngày lập hoá đơn",
          dataIndex: "ngay_lap_hoa_don",
          scopedSlots: { customRender: "ngay_lap_hoa_don" },
        },
        {
          title: "Tên người bán",
          dataIndex: "ten_nguoi_ban",
          width: "300px",
        },
        { title: "Mã số thuế người bán", dataIndex: "mst_nguoi_ban" },
        {
          title: "Giá trị trước thuế",
          dataIndex: "tong_tien_khong_thue",
          scopedSlots: { customRender: "tong_tien_khong_thue" },
        },
        {
          title: "Thuế suất",
          dataIndex: "tax",
        },
        {
          title: "GTGT",
          dataIndex: "tong_tien_thue",
          scopedSlots: { customRender: "tong_tien_thue" },
        },
        {
          title: "Tổng GT thanh toán",
          dataIndex: "tong_gt_thanh_toan",
          scopedSlots: { customRender: "tong_gt_thanh_toan" },
        },
        {
          title: "Trạng thái tích hợp ERP",
          dataIndex: "trang_thai_ERP",
          scopedSlots: { customRender: "trang_thai_ERP" },
        },
        {
          title: "Trạng thái kiểm tra hợp đồng",
          dataIndex: "trang_thai_HD",
          scopedSlots: { customRender: "trang_thai_HD" },
        },
      ],
      pagination: {
        page: 1, // the page page number
        pageSize: 10, // the number of items per page
        filter: "",
      },
      total: 0, // the total number of items
      listFileId: [],
      reloadCheck: false,
    };
  },
  watch: {
    folderSelected: {
      handler() {
        this.getDataTable();
      },
    },
    pagination: {
      handler() {
        this.getDataTable();
      },
      deep: true,
    },
  },
  mounted() {
    this.getDataTable();
    // this.data = data;
  },
  computed: {
    ...mapState("table", ["selectedRowKeys"]),
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys) => {
          this.setSelectedRowKeys(selectedRowKeys);
        },
      };
    },
  },
  methods: {
    ...mapActions("table", ["setSelectedRowKeys"]),
    totalPayment(totalNoTax, totalTax) {
      const cal =
        parseFloat(Math.round(totalNoTax)) + parseFloat(Math.round(totalTax));
      return cal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async getDataTable() {
      this.loading = true;
      let payload = {
        ecm_path: this.folderSelected,
        page: this.pagination.page,
        page_size: this.pagination.pageSize,
        filter: this.pagination.filter,
      };
      this.data = list_process_invoice.details;
      // add col tong_gt_thanh_toan
      this.data.map((item) => {
        item.tong_gt_thanh_toan = this.totalPayment(
          item.tong_tien_khong_thue,
          item.tong_tien_thue
        );
        // item.trang_thai_ERP = "Chưa tích hợp";
        item.trang_thai_HD = item.file_id;
      });
      this.total = list_process_invoice?.num_total_files;
      this.loading = false;
      await ECM.ListInvoice(payload)
        .then((res) => {
          this.data = res?.details;
          // add col tong_gt_thanh_toan
          this.data.map((item) => {
            item.tong_gt_thanh_toan = this.totalPayment(
              item.tong_tien_khong_thue,
              item.tong_tien_thue
            );
            // item.trang_thai_ERP = "Chưa tích hợp";
            item.trang_thai_HD = item.file_id;
          });
          this.total = res?.num_total_files;
          this.loading = false;
        })
        .catch((err) => {
          this.$message.error(
            err?.data.message || "Có lỗi xảy ra, vui lòng thử lại sau"
          );
        });
    },
    handleCheckValidSuccess() {
      this.setSelectedRowKeys([]);
      this.$emit("checkVaildSuccess");
    },
    handleCheckValidInvoice() {
      this.reloadCheck = !this.reloadCheck;
    },
    handlePageSizeChange(page, pageSize) {
      this.pagination.pageSize = pageSize;
    },
  },
};
</script>

<style lang="scss" scoped>
.ant-table th {
  white-space: nowrap;
}
</style>
=======
<template>
  <div>
    <a-table
      ref="aTable"
      :loading="loading"
      :row-key="(record) => record.file_id"
      :row-selection="rowSelection"
      :columns="columns"
      :data-source="data"
      :pagination="false"
    >
      <a-table-column
        title="Column Title"
        dataIndex="columnDataIndex"
        :scopedSlots="{ customRender: 'ellipsis' }"
        :ellipsis="{ tooltip: true }"
      />
      <template slot-scope="text, record, index" slot="stt">
        <div style="text-align: center">
          {{ (pagination.page - 1) * pagination.pageSize + index + 1 }}
        </div>
      </template>

      <template slot="ngay_lap_hoa_don" slot-scope="ngay_lap_hoa_don">
        <span>{{ ngay_lap_hoa_don | formatDate }}</span>
      </template>

      <template slot="tong_tien_khong_thue" slot-scope="tong_tien_khong_thue">
        <span>{{ tong_tien_khong_thue | formatMoney }}</span>
      </template>

      <template slot="tong_tien_thue" slot-scope="tong_tien_thue">
        <span>{{ tong_tien_thue | formatMoney }}</span>
      </template>

      <template slot="tong_gt_thanh_toan" slot-scope="tong_gt_thanh_toan">
        <span>{{ tong_gt_thanh_toan }}</span>
      </template>

      <!-- <template slot="trang_thai_ERP" slot-scope="trang_thai_ERP">
        <a-tag :color="trang_thai_ERP === 'Chưa tích hợp' ? 'pink' : 'green'">
          {{ trang_thai_ERP }}
        </a-tag>
      </template> -->

      <template slot="trang_thai_HD" slot-scope="file_id">
        <ItemInvoice
          ref="ItemInvoice"
          :fileId="file_id"
          :selectedRowKeys="selectedRowKeys"
          :reload="reloadCheck"
          @checkVaildSuccess="handleCheckValidSuccess"
        />
      </template>
      <template slot="footer">
        <div>
          <a-pagination
            v-model="pagination.page"
            :page="pagination.page"
            :page-size.sync="pagination.pageSize"
            :default-page="1"
            :total="total"
            show-quick-jumper
            show-size-changer
            @change="handlePageSizeChange"
          />
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
// import data from "@/data/mock_data.json";
import { mapState, mapActions } from "vuex";
import ECM from "@/services/ecm";
import ItemInvoice from "./ItemInvoice.vue";

export default {
  name: "TableField",
  props: {
    folderSelected: {
      type: String,
      default: "",
    },
  },
  components: {
    ItemInvoice,
  },
  data() {
    return {
      data: null,
      loading: true,
      columns: [
        {
          title: "STT",
          dataIndex: "stt",
          width: "60px",
          key: "stt",
          scopedSlots: { customRender: "stt" },
        },
        {
          title: "Tên file hoá đơn",
          dataIndex: "invoice_file_name",
        },
        {
          title: "Người upload",
          dataIndex: "user_upload",
        },
        {
          title: "Mẫu số hoá đơn",
          dataIndex: "mau_so_hoa_don",
        },
        { title: "Ký hiệu hoá đơn", dataIndex: "ky_hieu_hoa_don" },
        {
          title: "Số hoá đơn",
          dataIndex: "so_hoa_don",
        },
        {
          title: "Ngày lập hoá đơn",
          dataIndex: "ngay_lap_hoa_don",
          scopedSlots: { customRender: "ngay_lap_hoa_don" },
        },
        {
          title: "Tên người bán",
          dataIndex: "ten_nguoi_ban",
        },
        { title: "Mã số thuế người bán", dataIndex: "mst_nguoi_ban" },
        {
          title: "Giá trị trước thuế",
          dataIndex: "tong_tien_khong_thue",
          scopedSlots: { customRender: "tong_tien_khong_thue" },
        },
        {
          title: "Thuế suất",
          dataIndex: "tax",
        },
        {
          title: "GTGT",
          dataIndex: "tong_tien_thue",
          scopedSlots: { customRender: "tong_tien_thue" },
        },
        {
          title: "Tổng GT thanh toán",
          dataIndex: "tong_gt_thanh_toan",
          scopedSlots: { customRender: "tong_gt_thanh_toan" },
        },
        {
          title: "Trạng thái tích hợp ERP",
          dataIndex: "trang_thai_ERP",
          scopedSlots: { customRender: "trang_thai_ERP" },
        },
        {
          title: "Trạng thái kiểm tra hợp đồng",
          dataIndex: "trang_thai_HD",
          scopedSlots: { customRender: "trang_thai_HD" },
        },
      ],
      pagination: {
        page: 1, // the page page number
        pageSize: 10, // the number of items per page
        filter: "",
      },
      total: 0, // the total number of items
      listFileId: [],
      reloadCheck: false,
    };
  },
  watch: {
    folderSelected: {
      handler() {
        this.getDataTable();
      },
    },
    pagination: {
      handler() {
        this.getDataTable();
      },
      deep: true,
    },
  },
  mounted() {
    this.getDataTable();
    // this.data = data;
  },
  computed: {
    ...mapState("table", ["selectedRowKeys"]),
    rowSelection() {
      return {
        selectedRowKeys: this.selectedRowKeys,
        onChange: (selectedRowKeys) => {
          this.setSelectedRowKeys(selectedRowKeys);
        },
      };
    },
  },
  methods: {
    ...mapActions("table", ["setSelectedRowKeys"]),
    totalPayment(totalNoTax, totalTax) {
      const cal =
        parseFloat(Math.round(totalNoTax)) + parseFloat(Math.round(totalTax));
      return cal.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async getDataTable() {
      this.loading = true;
      let payload = {
        ecm_path: this.folderSelected,
        page: this.pagination.page,
        page_size: this.pagination.pageSize,
        filter: this.pagination.filter,
      };
      await ECM.ListInvoice(payload)
        .then((res) => {
          this.data = res?.data.details;
          // add col tong_gt_thanh_toan
          this.data.map((item) => {
            item.tong_gt_thanh_toan = this.totalPayment(
              item.tong_tien_khong_thue,
              item.tong_tien_thue
            );
            // item.trang_thai_ERP = "Chưa tích hợp";
            item.trang_thai_HD = item.file_id;
          });
          this.total = res?.data?.num_total_files;
          this.loading = false;
          // this.data = res.data;
        })
        .catch((err) => {
          this.$message.error(err.response.data.message);
        });
    },
    handleCheckValidSuccess() {
      this.setSelectedRowKeys([]);
      this.$emit("checkVaildSuccess");
    },
    handleCheckValidInvoice() {
      this.reloadCheck = !this.reloadCheck;
    },
    handlePageSizeChange(page, pageSize) {
      this.pagination.pageSize = pageSize;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .ant-checkbox-input {
  cursor: pointer !important;
}
</style>
>>>>>>> 471e025a94c1209bc549ab01e61452c017ba49b6
