<?php
namespace OCA\MbfInvoiceParser\Service;

use OC\Files\Filesystem;

class MbfInvoiceParserService {

    protected $language;

    public function __construct() {
//        $this->language = \OC::$server->getL10N(Application::APP_NAME);
    }

    /**
     * @NoAdminRequired
     * @throws \Exception
     */
    public function getXmlData($source) {
        \OC_Util::setupFS();
        $file = Filesystem::getLocalFile($source);
        if (!$file) {
            throw new \Exception($this->t('File not found.'));
        }


        $xmldata = null;

        $mimetype = Filesystem::getMimeType($source);
        switch ($mimetype) {
            case 'application/xml':
                $xml = simplexml_load_file($file) or die("Failed to load");
//                $xmldata = array(
//                    "mausohoadon" => $this->getMauSoHoaDon($xml),
//                    "kyhieuhoadon" => $this->getKyHieuHoaDon($xml),
//                    "sohoandon" => $this->getSoHoaDon($xml),
//                    "ngaylaphoadon" => $this->getNgayLapHoaDon($xml),
//                    "tendoitac" => $this->getTenDoiTac($xml),
//                    "masothue" => $this->getMaSoThue($xml),
//                    "tongtienkhongthue" => $this->getTongTienKhongThue($xml),
//                    "tongtienthue" => $this->getTongTienThue($xml),
//                    "tonggiatrihoadon" => $this->getTongGiaTriHoaDon($xml),
//                    "tennguoimua" => $this->getTenNguoiMua($xml),
//                    "mstnguoimua" => $this->getMSTNguoiMua($xml),
//                    "diachinguoimua" => $this->getDiaChiNguoiMua($xml)
//                );
                $xmldata = array(
                    "Mẫu số hóa đơn" => $this->getMauSoHoaDon($xml),
                    "Ký hiệu hóa đơn" => $this->getKyHieuHoaDon($xml),
                    "Số hóa đơn" => $this->getSoHoaDon($xml),
                    "Ngày lập hóa đơn" => $this->getNgayLapHoaDon($xml),
                    "Tên đối tác" => $this->getTenDoiTac($xml),
                    "Mã số thuế" => $this->getMaSoThue($xml),
                    "Tổng tiền (không thuế)" => $this->getTongTienKhongThue($xml),
                    "Tổng tiền thuế" => $this->getTongTienThue($xml),
                    "Tổng giá trị hóa đơn" => $this->getTongGiaTriHoaDon($xml),
                    "Tên người mua" => $this->getTenNguoiMua($xml),
                    "Mã số thuê người mua" => $this->getMSTNguoiMua($xml),
                    "Địa chỉ người mua" => $this->getDiaChiNguoiMua($xml)
                );
                break;

            default:
                throw new \Exception($this->t('Unsupported MIME type "%s".', array($mimetype)));
        }
        return $xmldata;
    }
    protected function getTenNguoiMua($xml) {
        // Ten nguoi mua
        $arrBuyer = [
            "HDon/DLHDon/NDHDon/NMua/Ten"
        ];

        return $this->getByPath($arrBuyer, $xml);
    }
    protected function getMSTNguoiMua($xml) {
        // Ten nguoi mua
        $arrMSTBuyer = [
            "HDon/DLHDon/NDHDon/NMua/MST"
        ];

        return $this->getByPath($arrMSTBuyer, $xml);
    }
    protected function getDiaChiNguoiMua($xml) {
        // Ten nguoi mua
        $arrAddressBuyer = [
            "HDon/DLHDon/NDHDon/NMua/DChi"
        ];

        return $this->getByPath($arrAddressBuyer, $xml);
    }
    protected function getTongGiaTriHoaDon($xml) {
        // Tong Gia Tri Hoa Don
        $arrTotalAmountWithVat = [
            "invoice/invoiceData/totalAmountWithVAT",
            "invoice/invoiceData/totalAmountWithVat",
            "transaction/invoices/invoice/invoiceData/totalAmountWithVAT",
            "Invoice/Content/Amount", //case mst bang tong so tien
            "HDon/DLHDon/NDHDon/TToan/TgTTTBSo",
            "invoice/thong_tin_hd/tong_tien",
            "INVOICE/EQUIVALENT_AMOUNT_PAID/TOTAL_AMOUNT",
            "INVOICE/FARE_SUMUP/TOTAL_AMOUNT",
            "InvoiceDataXMLSign/InvoiceDataXML/invoiceData/SumPaymentAmount",
            "InvoiceDataXMLSign/InvoiceDataXML/InvoiceData/SumPaymentAmount",
            "HDDT/HOADON/@TONGTIEN",
            "Invoice/Content/TotalAmount", //17/06/2021
            "Invoice/TvanData/Content/Amount", //
            "minvoice/invoice/invoiceinformation/total_amount", //25/06/2021
            "eInvoice/Inv/footer/paymentTotal", //16/08/2021
            "HoaDonDienTu/HoaDon/ThongTinHoaDon/TongTien", //16/08/2021
            "HDDT/HOADON/@TONG_TIEN", //30/08/2021
            "HDonGTKT/NDungHDon/DSachHHoaDVu/TToan/tongTienCoThue", //15/09/2021
            "HDonGTKT/NDungHDon/DSachHHoaDVu/TToan/tongTienCoThue10", //15/09/2021
            "invoice/invoiceData/totalPaymentAmount", //15/09/2021
            "HDDT/HOADON/@TONGTIEN", //15/09/2021
            "CyberInvoiceData/PhInvoices/PhInvoice/T_TT_NT", //21/09/2021
            "Invoice1/Ivoice/TotalMoney", //07/10/2021
            "Invoice/Contalent/Amount",
            "HDon/DLHDon/NDHDon/TToan/TgTTTBSo",
            "HoaDon/GiaTien/TongTien",
            "HDonDTu/HDonCQT/HDon/totalAmount",
            "TDiep/DLieu/HDon/DLHDon/NDHDon/TToan/TgTTTBSo",
            "HDon/DLHDon/NDHDon/TToan/TgTTTBSo",
        ];

        return $this->getByPath($arrTotalAmountWithVat, $xml);
    }
    protected function getTongTienThue($xml) {
        // Tong Tien Thue
        $arrTotalVatAmount = [
            "transaction/invoices/invoice/invoiceData/totalVATAmount",
            "Invoice/Content/VATAmount",
            "Invoice/Content/VAT_Amount",
            "HDon/DLHDon/NDHDon/TToan/TgTThue",
            "invoice/thong_tin_hd/tien_thue",
            "INVOICE/FARE_SUMUP/VAT_AMOUNT",
            "InvoiceDataXMLSign/InvoiceDataXML/invoiceData/SumTaxAmount",
            "InvoiceDataXMLSign/InvoiceDataXML/InvoiceData/SumTaxAmount",
            // "invoice/invoiceData/items/item/vatAmount",
            "HDDT/HOADON/@TIENTHUE",
            "Invoice/Content/TaxAmount", //17/06/2021
            "Invoice/TvanData/Content/VAT_Amount", //
            "minvoice/invoice/invoiceinformation/vat_amount", //25/06/2021
            "eInvoice/Inv/footer/summary/taxTotal", //16/08/2021
            "HoaDonDienTu/HoaDon/ThongTinHoaDon/TongTienThue", //16/08/2021
            "HDDT/HOADON/@TIEN_GTGT", //30/08/2021
            "HDonGTKT/NDungHDon/DSachHHoaDVu/TToan/tongTienThue", //15/09/2021
            "HDonGTKT/NDungHDon/DSachHHoaDVu/TToan/tongTienThue10", //15/09/2021
            "invoice/invoiceData/totalVATAmount",
            "invoice/invoiceData/invoiceTaxBreakdowns/invoiceTaxBreakdown/vatTaxableAmount", //22/09/2021
            "invoice/invoiceData/totalVatAmount", //15/09/2021
            "HDDT/HOADON/@TIENTHUE", //15/09/2021
            "CyberInvoiceData/PhInvoices/PhInvoice/T_THUE_NT", //21/09/2021
            "Invoice1/Ivoice/MoneyTax", //07/10/2021
            "Invoice/Contalent/VAT_Amount",
            "HDon/DLHDon/NDHDon/TToan/TgTThue",
            "HoaDon/GiaTien/TienThue",
            "HDonDTu/HDonCQT/HDon/taxAmount",
            "TDiep/DLieu/HDon/DLHDon/NDHDon/TToan/TgTThue",
            "HDon/DLHDon/NDHDon/TToan/TTCKTMai",
            "HDon/DLHDon/TTChung/HDDCKPTQuan",
        ];

        return $this->getByPath($arrTotalVatAmount, $xml);
    }
    protected function getTongTienKhongThue($xml) {
        // Tong Tien Khong Thue
        $arrTotalAmountWithoutVat = [
            "invoice/invoiceData/totalAmountWithoutVat",
            "invoice/invoiceData/totalAmountWithoutVAT",
//            "invoice/invoiceData/items/item/itemTotalAmountWithoutVat",
            "transaction/invoices/invoice/invoiceData/totalAmountWithoutVAT",
            "InvoiceDataXMLSign/InvoiceDataXML/invoiceData/SumItemAmount",
            "InvoiceDataXMLSign/InvoiceDataXML/InvoiceData/SumItemAmount",
            "Invoice/Content/Total",
            "HDon/DLHDon/NDHDon/TToan/TgTCThue",
            "invoice/thong_tin_hd/tien_truoc_thue",
            "INVOICE/FARE_SUMUP/AMOUNT",
            "HDDT/HOADON/@TIENNUOC",
            "Invoice/Content/Amount", //17/06/2021
            "Invoice/TvanData/Content/Amount", //
            "minvoice/invoice/invoiceinformation/total_amount_without_vat", //25/06/2021
            "eInvoice/Inv/footer/summary/subTotal", //16/08/2021
            "HoaDonDienTu/HoaDon/ThongTinHoaDon/TongTienTruocThue", //16/08/2021
            "HDDT/HOADON/@SO_TIEN", //30/08/2021
            "HDonGTKT/NDungHDon/DSachHHoaDVu/TToan/tongTienChuaThue", //15/09/2021
            "HDonGTKT/NDungHDon/DSachHHoaDVu/TToan/tongTienChuaThue10", //15/09/2021
            "invoice/invoiceData/totalAmount", //15/09/2021
            "HDDT/HOADON/@TIENNUOC", //15/09/2021
            "CyberInvoiceData/PhInvoices/PhInvoice/T_TIEN_NT2", //21/09/2021
            "Invoice1/Ivoice/TotalMoneyNoTax", //07/10/2021
            "Invoice/Contalent/Total",
            "HDon/DLHDon/NDHDon/TToan/TgTCThue",
            "HoaDon/GiaTien/TienHang",
            "HDonDTu/HDonCQT/HDon/subTotal",
            "TDiep/DLieu/HDon/DLHDon/NDHDon/TToan/TgTCThue",
            "HDon/DLHDon/NDHDon/TToan/TgTTTBSo",
        ];

        return $this->getByPath($arrTotalAmountWithoutVat, $xml);
    }
    protected function getMaSoThue($xml) {
        // Ma So Thue
        $arrSellerTaxCode = [
            "invoice/invoiceData/sellerTaxCode",
            "invoice/certifiedData/sellerTaxCode",
            "transaction/invoices/invoice/invoiceData/sellerTaxCode",
            "InvoiceDataXMLSign/InvoiceDataXML/invoiceData/SellerTaxCode",
            "InvoiceDataXMLSign/InvoiceDataXML/InvoiceData/SellerTaxCode",
            "invoice/invoiceData/seller/sellerTaxCode",
            "Invoice/Content/ComTaxCode",
            "Invoice/TvanData/Content/ComTaxCode",//
            "HDon/DLHDon/NDHDon/NBan/MST",
            "invoice/thong_tin_hd/maso_vatkh",
            "INVOICE/SELLER/TAX_CODE",
            "HDDT/HOADON/@CTYMST",
            "Invoice/Content/CompanyTaxCode", //17/06/2021
            "minvoice/invoice/invoiceinformation/seller_taxcode", //25/06/2021
            "eInvoice/Inv/seller/buTaxcode", //16/08/2021
            "HoaDonDienTu/HoaDon/ThongTinHoaDon/MaSoThueNguoiBan", //16/08/2021
            "HDDT/HOADON/@MASO_THUEDL_CT", //30/08/2021
            "HDonGTKT/NDungHDon/NBan/MST", //15/09/2021
            "HDDT/HOADON/@MST", //15/09/2021
            "HDon/DLHDon/NDHDon/Nban/NBMST", //21/09/2021
            "CyberInvoiceData/PhInvoices/PhInvoice/M_MA_SO_THUE", //21/09/2021
            "Invoice1/CusivoiceTempt/Taxcode", //07/10/2021
            "Invoice/Contalent/ComTaxCode",
            "HDon/DLHDon/NDHDon/NBan/MST",
            "HoaDon/DonViBanHang/MaSoThue",
            "HDonDTu/HDonCQT/HDon/company/taxCode",
            "TDiep/DLieu/HDon/DLHDon/NDHDon/NBan/MST"
        ];

        return $this->getByPath($arrSellerTaxCode, $xml);
    }
    protected function getTenDoiTac($xml) {
        // Ten Doi Tac
        $arrSellerLegalName = [
            "invoice/invoiceData/sellerFullName",
            "invoice/invoiceData/sellerLegalName",
            "transaction/invoices/invoice/invoiceData/sellerLegalName",
            "InvoiceDataXMLSign/InvoiceDataXML/invoiceData/InvoiceTypeName",
            "InvoiceDataXMLSign/InvoiceDataXML/invoiceData/SellerName",
            "InvoiceDataXMLSign/InvoiceDataXML/InvoiceData/SellerName",
            "invoice/invoiceData/seller/sellerLegalName",
            "Invoice/Content/ComName",
            "Invoice/TvanData/Content/ComBankName",//
            "HDon/DLHDon/NDHDon/NBan/Ten",
            "invoice/congty_xuat_hd/don_vi",
            "INVOICE/SELLER/NAME",
            "HDDT/HOADON/@CTYTEN",
            "Invoice/Content/CompanyName", //17/06/2021
            "minvoice/invoice/invoiceinformation/seller_name", //25/06/2021
            "eInvoice/Inv/seller/buName", //16/08/2021
            "HoaDonDienTu/HoaDon/ThongTinHoaDon/TenNguoiBan", //16/08/2021
            "HDDT/HOADON/@TEN_NGUOI_KY", //30/08/2021
            "HDonGTKT/NDungHDon/NBan/tenDVi", //15/09/2021
            "HDDT/HOADON/@CTYTEN", //15/09/2021
            "HDon/DLHDon/NDHDon/Nban/NBTen", // 21/09/2021
            "CyberInvoiceData/PhInvoices/PhInvoice/M_TEN_CTY", //21/09/2021
            "Invoice1/CusivoiceTempt/CompanyName", //07/10/2021
            "Invoice/Contalent/ComName",
            "HDon/DLHDon/NDHDon/NBan/Ten",
            "HoaDon/@KyBoi",
            "HDDT/HOADON/@TENCTY",
            "HDonDTu/HDonCQT/HDon/company/name",
            "TDiep/DLieu/HDon/DLHDon/NDHDon/NBan/Ten"
        ];

        return $this->getByPath($arrSellerLegalName, $xml);
    }
    protected function getNgayLapHoaDon($xml) {
        // Ngay Lap Hoa Don
        $arrInvoiceIssuedDate = [
            "invoice/invoiceData/invoiceIssuedDate",
            "invoice/invoiceData/issuedDate",
            "InvoiceDataXMLSign/InvoiceDataXML/invoiceData/InvoiceDate",
            "InvoiceDataXMLSign/InvoiceDataXML/InvoiceData/InvoiceDate",
            "transaction/invoices/invoice/invoiceData/invoiceIssuedDate",
            "Invoice/Content/Products/Product/CreateDate",
            "Invoice/Content/ArisingDate",
            "HDon/DLHDon/TTChung/TDLap",
            "HDon/DLHDon/TTChung/NLap",
            "invoice/thong_tin_hd/ngay_hdon",
            "INVOICE/INVOICE_HEADER/DATE",
            "HDDT/HOADON/@NGAYNHAP_TT",
            "Invoice/Content/InvoiceDate", //17/06/2021
            "Invoice/TvanData/Content/ArisingDate", //
            "Invoice/ArisingDate/Content/InvoiceDate", //
            "minvoice/invoice/invoiceinformation/invoice_issued_date", //25/06/2021
            "eInvoice/Inv/header/invoiceDate", //16/08/2021
            "HoaDonDienTu/HoaDon/ThongTinHoaDon/NgayHoaDon", //16/08/2021
            "HDDT/HOADON/@NGAY_KY", //30/08/2021
            "HDonGTKT/NDungHDon/TTinHDon/ngayHDon", //15/09/2021
            "invoice/invoiceData/invoiceDate", //15/09/2021
            "HDDT/HOADON/@NGAYKY", //15/09/2021
            "CyberInvoiceData/PhInvoices/PhInvoice/NGAY_KY", //21/09/2021
            "Invoice1/Ivoice/InvoiceNumber", //07/10/2021
            "Invoice/Contalent/ArisingDate",
            "HDon/DLHDon/TTChung/TDLap",
            "HoaDon/@NgayKy",
            "HDonDTu/HDonCQT/HDon/createdDate",
            "TDiep/DLieu/HDon/DLHDon/TTChung/NLap"
        ];

        return $this->getByPath($arrInvoiceIssuedDate, $xml);
    }
    protected function getSoHoaDon($xml) {
        // So Hoa Don
        $arrInvoiceNumber = [
            "invoice/invoiceData/invoiceNumber",
            "invoice/invoiceData/invoiceNo",
            "InvoiceDataXMLSign/InvoiceDataXML/invoiceData/invoiceNo",
            "InvoiceDataXMLSign/InvoiceDataXML/InvoiceData/InvoiceNo",
            "transaction/invoices/invoice/invoiceData/invoiceNumber",
            "HDon/DLHDon/TTChung/SHDon",
            "invoice/thong_tin_hd/so_hoadon",
            "INVOICE/INVOICE_HEADER/NUMBER",
//			"invoice/invoiceData/invoiceSeries", //15/06/2021
            "Invoice/Content/InvoiceNumber", //17/06/2021
            "Invoice/Content/InvoiceNo", //17/06/2021
            "Invoice/TvanData/Content/InvoiceNo", //
            "minvoice/invoice/invoiceinformation/invoice_number", //25/06/2021
            "eInvoice/Inv/header/invoiceNo", //16/08/2021
            "HoaDonDienTu/HoaDon/ThongTinHoaDon/SoHoaDon", //16/08/2021
            "HDDT/HOADON/@SO_SERY", //30/08/2021
            "HDonGTKT/NDungHDon/TTinHDon/soHDon", //15/09/2021
            "HDDT/HOADON/@SOHOADON", //15/09/2021
            "HDDT/HOADON/@MAHOADON",
            "CyberInvoiceData/PhInvoices/PhInvoice/SO_CT", //21/09/2021
            "Invoice1/Ivoice/InvoiceNumber", //07/10/2021
            "Invoice/Contalent/InvoiceNo", //17/06/2021
            "HDon/DLHDon/TTChung/So",
            "HoaDon/@So",
            "HDonDTu/HDonCQT/HDon/billNumber",
            "TDiep/DLieu/HDon/DLHDon/TTChung/SHDon"
        ];

        return $this->getByPath($arrInvoiceNumber, $xml);
    }
    protected function getKyHieuHoaDon($xml) {
        // Mau So Hoa Don
        $arrInvoiceSeries = [
            "invoice/invoiceData/invoiceSeries",
            "Invoice/Content/InvoiceSerial",
            "invoice/invoiceData/series",
            "invoice/thong_tin_hd/seri_vat",
            "InvoiceDataXMLSign/InvoiceDataXML/InvoiceData/InvoiceSerial",
            "HDDT/HOADON/@KIHIEUHOADON",
            "HDon/DLHDon/TTChung/TTKhac/serial",
            "HDon/DLHDon/TTChung/KHHDon",
            "Invoice/Content/SerialNo",
            "Invoice/TvanData/Content/SerialNo",//
            "INVOICE/INVOICE_HEADER/SERIAL_NBR",
            "minvoice/invoice/invoiceinformation/invoice_series", //25/06/2021
            "transaction/invoices/invoice/invoiceData/invoiceSeries",
            "eInvoice/Inv/header/serial", //16/08/2021
            "HoaDonDienTu/HoaDon/ThongTinHoaDon/Kyhieu", //16/08/2021
            "HDDT/HOADON/@KIHIEU_SERY", //30/08/2021
            "HDonGTKT/NDungHDon/TTinHDon/kyHieuHDon", //15/09/2021
            "CyberInvoiceData/PhInvoices/PhInvoice/TEN_SERI", //21/09/2021
            "Invoice1/CusivoiceTempt/Symbol", //07/10/2021
            "Invoice/Contalent/SerialNo", //13/10/2021
            "HoaDon/@KyHieu",
            "HDonDTu/HDonCQT/HDon/billTemplate/code",
            "TDiep/DLieu/HDon/DLHDon/TTChung/KHHDon"
        ];

        return $this->getByPath($arrInvoiceSeries, $xml);
    }

    protected function getMauSoHoaDon($xml) {
        // Mau So Hoa Don
        $arrTemplateCode = [
            "Invoice/Content/InvoicePattern",
            "Invoice/TvanData/Content/InvoicePattern",//
            "invoice/invoiceData/templateCode",
            "Invoice1/CusivoiceTempt/TemptCode",
            "HDDT/HOADON/@MAU_SO",
            "HDDT/HOADON/@MAUHOADON",
            "HDon/DLHDon/TTChung/KHMSHDon",
            "HDon/DLHDon/TTChung/MSHDon",
            "HDonGTKT/NDungHDon/TTinHDon/mauHDon",
            "Invoice/Contalent/InvoicePattern",
            "HoaDonDienTu/HoaDon/ThongTinHoaDon/MauSo",
            "CyberInvoiceData/PhInvoices/PhInvoice/TEN_VAT",
            "eInvoice/Inv/header/pattern",
            "transaction/invoices/invoice/invoiceData/templateCode",
            "invoice/thong_tin_hd/mau_sovat",
            "InvoiceDataXMLSign/InvoiceDataXML/InvoiceData/InvoiceForm",
            "minvoice/invoice/invoiceinformation/template_code",

            "INVOICE/INVOICE_HEADER/SERIAL_NBR",
            "HDon/DLHDon/TTChung/TTKhac/form",
            "HoaDon/@SoMau",
            "HDonDTu/HDonCQT/HDon/billPattern/billPatternCode",
            "TDiep/DLieu/HDon/DLHDon/TTChung/KHMSHDon"
        ];

        return $this->getByPath($arrTemplateCode, $xml);
    }

    protected function getByPath($array, $xml){
        $data = null;
        foreach ($array as $path) {
            $result = $xml->xpath("/" . $path);
            foreach ($result as $item){
                if ($item != null){
                    $data = (string)$item;
                    return $data;
                }
            }
        }
        return $data;
    }

    protected function t($text, $parameters = array()) {
        return $this->language->t($text, $parameters);
    }
}
