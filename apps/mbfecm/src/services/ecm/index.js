<<<<<<< HEAD
import http from "@/api/base";

class ECM {
  ListFile(payload) {
    return http.post("folder/list", payload);
  }
  ListInvoice(payload) {
    return http.post("folder/list-processed-invoice-row", payload);
  }
  CheckValidInvoice(payload) {
    return http.post("xml/check-valid-invoice-by-id", payload);
  }
  ExportFile(payload) {
    return http.post("folder/download-invoices", payload);
  }
  UploadFile(payload) {
    return http.upload("file/upload", payload);
  }
  ErpProcess(payload) {
    return http.upload("erp/erp_process", payload);
  }
  MoveFile(payload) {
    return http.post("file/move", payload);
  }
  CopyFile(payload) {
    return http.post("file/copy", payload);
  }
  ErpSync(payload) {
    return http.post("erp/erp_syn_process", payload);
  }
}

export default new ECM();
=======
import http from "@/api/base";

class ECM {
  ListFile(payload) {
    return http.post("folder/list", payload);
  }
  ListInvoice(payload) {
    return http.post("folder/list-processed-invoice-row", payload);
  }
  AddTask(payload) {
    return http.post("createTask", payload);
  }
  CheckValidInvoice(payload) {
    return http.post("xml/check-valid-invoice-by-id", payload);
  }
  ExportFile(payload) {
    return http.post("folder/download-invoices", payload);
  }
}

export default new ECM();
>>>>>>> 471e025a94c1209bc549ab01e61452c017ba49b6
