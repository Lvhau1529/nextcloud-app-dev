(function() {

    console.log("Select2", Select2);

    var MobiFoneTabView = OCA.Files.DetailTabView.extend({
        id: 'mobifoneTabView',
        className: 'tab mobifoneTabView',

        getLabel: function() {
            return t('mobifone', 'MobiFone');
        },

        getIcon: function() {
            return 'icon-details';
        },

        render: function() {
            console.log("this", this);
            var fileInfo = this.getFileInfo();

            if (fileInfo) {
                this.$el.html('<div style="text-align:center; word-wrap:break-word;" class="get-mobifone"><p><img src="' +
                    OC.imagePath('core', 'loading.gif') +
                    '"><br><br></p><p>' +
                    t('mobifone', 'Reading mobifone …') +
                    '</p></div>');
                var _self = this;
                // setTimeout(() => {
                //     if (!!dataXmlTemp) {
                //         _self.updateDisplay(dataXmlTemp);
                //     }
                // }, 1000);
                var url = OC.generateUrl('/apps/mbfinvoiceparser/get'),
                    data = { source: fileInfo.getFullPath() },
                    _self = this;
                $.ajax({
                    type: 'GET',
                    url: url,
                    dataType: 'json',
                    data: data,
                    async: true,
                    success: function(data) {
                        console.log("data: ", data);
                        _self.updateDisplay(data, fileInfo.attributes.name);
                    },
                    error: function(error) {
                        console.log("error: ", error);
                        table = $('<p>').text(data.responseText);
                        _self.$el.find('.get-mobifone').empty().append(table);
                    }
                });
            }
            // add time left file
            // addTimeLeftFile(this.model);
        },

        canDisplay: function(fileInfo) {
            if (!fileInfo || fileInfo.isDirectory()) {
                return false;
            }
            var mimetype = fileInfo.get('mimetype') || '';
            return (['application/xml'].indexOf(mimetype) > -1);
        },

        formatValue: function(value) {
            return Array.isArray(value) ? value.join('; ') : value;
        },

        updateDisplay: function(data, fileInfo) {
            let table;
            let contentBefore = ""
            if (!data.data["Số hóa đơn"]) {
                this.$el.find('.get-mobifone').empty().append("<span>Không phải xml hóa đơn</span>");
            } else {
                try {
                    if (data.response === 'success') {
                        contentBefore += "<button id='validation-check-btn-id' type='submit'>Kiểm tra tính hợp lệ của hóa đơn</button>";
                        contentBefore += "<div class='title-info-xml'><span>Kết quả kiểm tra hóa đơn: </span>" + fileInfo + "</div><div class='invoice-info'><span></span>Thông tin hóa đơn</div>";
                        table = $('<table>');
                        var dataXml = data.data;
                        for (m in dataXml) {
                            let value = dataXml[m];
                            switch (m) {
                                case 'tongtienkhongthue':
                                case 'tongtienthue':
                                case 'tonggiatrihoadon':
                                    value = parseFloat(value).toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
                                    value = value.trim().replace('VND', '');
                                    break;
                            }
                            if (value == null) {
                                $('#mobifoneTabView').parent().remove();
                                return;
                            }
                            var row = $('<tr>')
                                .append($('<td>').addClass('key').text(m + ':'))
                                .append($('<td>').addClass('value').text(this.formatValue(value)));
                            table.append(row);
                        }
                    } else {
                        table = $('<p>').text(data.msg);
                    }
                } catch (e) {
                    table = $('<p>').text(data);
                }

                this.$el.find('.get-mobifone').empty().append(contentBefore).append(table);

                let displayInvoiceValidationPopup = false;
                $('#validation-check-btn-id').bind('click', (e) => {
                    console.log("e", e);
                    console.log("e.type", e.type);
                    console.log("e.keyCode", e.keyCode);
                    console.log("displayInvoiceValidationPopup", displayInvoiceValidationPopup);

                    if(!displayInvoiceValidationPopup) {

                        displayInvoiceValidationPopup = true;

                        $('body').append(`
                        <div
                            style="
                                /* display: table; */
                                position: fixed;
                                left: 0px;
                                top: 0px;
                                width: 100%;
                                /* height: 100%; */
                                background-color: rgba(0, 130, 200, 0.35);
                                z-index: 9999;
                            "
                            class="overlay-shadow-popup-invoice-validation"
                            >
                                <div
                                style="
                                    /* display: table-cell; */
                                    /* vertical-align: middle; */
                                    margin: 298px auto 70px;
                                    width: 37.5%; /* or whatever */
                                "
                                class="overlay-band-popup-invoice-validation"
                                >
                                    <div
                                    style="
                                        display: table;
                                        width: 100%;
                                        background-color: white; /* or whatever */
                                        color: black;
                                    "
                                    class="overlay-box-popup-invoice-validation"
                                    id="validation-invoice-content"
                                    >
                                        <table id="validation-invoice-content-table">
                                            <tbody>
                                                <div class="icon-loading-invoice-validation-div" style="width: 100%;height: 300px;">
                                                    <div class="icon-loading-invoice-validation" alt="Loading" style="
                                                            width: 100%;
                                                            height: 100%;
                                                            display: flex;
                                                            justify-content: center;
                                                            align-items: center;
                                                            background-color: white;
                                                        ">
                                                        Đang tải...
                                                    </div>
                                                </div>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        `);
                        
                        // $('.overlay-shadow-popup-invoice-validation').css('height', $(window).height());
                        $('.overlay-shadow-popup-invoice-validation').css('overflow-y', 'scroll');
                        $('.overlay-shadow-popup-invoice-validation').css('height', '100%');
                    
                        var fileInfo = this.getFileInfo();
                        console.log("fileInfo", fileInfo);
                        console.log("fileInfo.getFullPath()", fileInfo.getFullPath());
                        var url = OC.generateUrl('/apps/mbfinvoiceparser/getInvoiceValidation')
                            data = { source: fileInfo.getFullPath(), fileId:fileInfo.id },
                            _self = this;
                        console.log("url", url);
                        $.ajax({
                            type: 'GET',
                            url: url,
                            dataType: 'json',
                            data: data,
                            async: true,
                            success: function(data) {
                                console.log("data", data);
                                $('.overlay-box-popup-invoice-validation').width('');
                                $('.overlay-box-popup-invoice-validation').css('margin', '0 auto');
                                $('.icon-loading-invoice-validation-div')[0].remove();
                                // $('.overlay-shadow-popup-invoice-validation').css('overflow-y', 'scroll');
                                // temporarily we only have the first invoice validation result, and we only need the first one
                                // first case: The successful invoice validation
                                if(!!data.data.details && !!data.data.details[0]) {
                                    const invoiceValidationResult = data.data.details[0];
                                    console.log("invoiceValidationResult", invoiceValidationResult);
                                    $('#validation-invoice-content-table tbody').append(`<tr>
                                        <td>
                                            <button
                                                    id="close-validation-invoice-content-popup-x-sym" 
                                                    class="close-popup-btn"
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>`);
                                    $('#validation-invoice-content-table tbody').append(`<tr>
                                        <td
                                            colspan="2"
                                            style="font-weight: bold; text-align: center; padding-top: 40px;"
                                        >
                                            KẾT QUẢ KIỂM TRA HÓA ĐƠN
                                        </td>
                                    </tr>`);
    
                                    if(new String(invoiceValidationResult.code).valueOf() === "0" ) {
                                        // case 1: successfully get the invoice validation: code is "0"
                                        moment.locale('vi');
                                        var invoiceDateMoment = moment(invoiceValidationResult.invoice_info.ngay_lap_hoa_don, "YYYY-MM-DD", true);
                                        var signingDateMoment = moment(invoiceValidationResult.invoice_info.ngay_ky_hoa_hoa_don, "YYYY-MM-DD HH:mm:ss", true);
                                        if(!!invoiceValidationResult.invoice_info){
                                            $('#validation-invoice-content-table tbody').append(`<tr>
                                                <td>
                                                    Ký hiệu: <span style="font-weight: bold;">${invoiceValidationResult.invoice_info.ky_hieu_hoa_don ? invoiceValidationResult.invoice_info.ky_hieu_hoa_don : ""}</span>
                                                </td>
                                            </tr>`);
                                            $('#validation-invoice-content-table tbody').append(`<tr>
                                                <td>
                                                    Số: <span style="color: #BF6B55;">${invoiceValidationResult.invoice_info.so_hoa_don ? invoiceValidationResult.invoice_info.so_hoa_don : ""}</span>
                                                </td>
                                            </tr>`);
                                            $('#validation-invoice-content-table tbody').append(`<tr>
                                                <td>
                                                    Ngày hóa đơn: <span style="font-weight: bold;">${invoiceDateMoment.isValid() ? invoiceDateMoment.format("DD/MM/YYYY") : "Lỗi hoặc không có ngày hóa đơn"}</span>
                                                </td>
                                                <td>
                                                    <span style="font-weight: bold;">Trạng thái hóa đơn</span>: ${ invoiceValidationResult.invoice_info.trang_thai_hoa_don && invoiceValidationResult.invoice_info.trang_thai_hoa_don === true ?
                                                        `<span class="status_invoice_valid">Hợp lệ</span>` : invoiceValidationResult.invoice_info.trang_thai_hoa_don === false ? `<span class="status_invoice_invalid">Không hợp lệ</span>` : `<span></span>`}
                                                </td>
                                            </tr>`);
                                            $('#validation-invoice-content-table tbody').append(`<tr>
                                                <td>
                                                    Ngày kí: <span style="font-weight: bold;">${signingDateMoment.isValid() ? signingDateMoment.format("DD/MM/YYYY") : "Lỗi hoặc không có ngày kí"}</span>
                                                </td>
                                            </tr>`);
                                        }
        
                                        if(!!invoiceValidationResult.invoice_checked) {
                                            $('#validation-invoice-content-table tbody').append(`
                                                ${invoiceValidationResult.invoice_checked.check_nguoi_mua.is_mst_exist_in_cqt ? 
                                                    `<tr>
                                                    <td
                                                        class="green-tick-check-mark-successful"
                                                        style="padding-top: 15px;"
                                                    >
                                                        <span style="font-weight: bold;">Đúng MST bên mua</span>
                                                    </td>`
                                                    :
                                                    `<tr>
                                                    <td
                                                        class="red-tick-check-mark-failed"
                                                        style="padding-top: 15px;"
                                                    >
                                                        <span style="font-weight: bold;">Sai MST bên mua</span>
                                                    </td>`
                                                }

                                                ${invoiceValidationResult.invoice_checked.check_nguoi_ban.is_mst_exist_in_cqt ? 
                                                    `
                                                    <td
                                                        class="green-tick-check-mark-successful"
                                                        style="padding-top: 15px;"
                                                    >
                                                        <span style="font-weight: bold;">Đúng MST bên bán</span>
                                                    </td>
                                                    `
                                                    : 
                                                    `
                                                    <td
                                                        class="red-tick-check-mark-failed"
                                                        style="padding-top: 15px;"
                                                    >
                                                        <span style="font-weight: bold;">Sai MST bên bán</span>
                                                    </td>
                                                    `
                                                }
                                            </tr>`);
                                            $('#validation-invoice-content-table tbody').append(`
                                                ${invoiceValidationResult.invoice_checked.check_nguoi_mua.is_ten_cty_exist_in_cqt ? 
                                                    `
                                                    <tr>
                                                        <td
                                                            class="${invoiceValidationResult.invoice_checked.check_nguoi_mua.is_ten_cty_exist_in_cqt ? "green-tick-check-mark-successful" : "red-tick-check-mark-failed"}"
                                                            style="padding-top: 8px;"
                                                        >
                                                            <span style="font-weight: bold;">Đúng tên công ty bên mua</span>
                                                        </td>
                                                    `
                                                    : 
                                                    `
                                                    <tr>
                                                        <td
                                                            class="${invoiceValidationResult.invoice_checked.check_nguoi_mua.is_ten_cty_exist_in_cqt ? "green-tick-check-mark-successful" : "red-tick-check-mark-failed"}"
                                                            style="padding-top: 8px;"
                                                        >
                                                            <span style="font-weight: bold;">Sai tên công ty bên mua</span>
                                                        </td>
                                                    `
                                                }

                                                ${invoiceValidationResult.invoice_checked.check_nguoi_ban.is_ten_cty_exist_in_cqt ? 
                                                    `
                                                    <td
                                                        class="green-tick-check-mark-successful"
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;">Đúng tên công ty bên bán</span>
                                                    </td>`
                                                    : 
                                                    `
                                                    <td
                                                        class="red-tick-check-mark-failed"
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;">Sai tên công ty bên bán</span>
                                                    </td>
                                                    `
                                                }
                                                </tr>`
                                            );
                                            $('#validation-invoice-content-table tbody').append(`
                                                ${invoiceValidationResult.invoice_checked.check_nguoi_mua.is_dia_chi_cty_exist_in_cqt ? 
                                                    `
                                                    <tr>
                                                        <td
                                                            class="green-tick-check-mark-successful"
                                                            style="padding-top: 8px;"
                                                        >
                                                            <span style="font-weight: bold;">Đúng địa chỉ công ty bên mua</span>
                                                        </td>`
                                                    :
                                                    `
                                                    <tr>
                                                        <td
                                                            class="red-tick-check-mark-failed"
                                                            style="padding-top: 8px;"
                                                        >
                                                            <span style="font-weight: bold;">Sai địa chỉ công ty bên mua</span>
                                                        </td>
                                                    `
                                                }

                                                ${invoiceValidationResult.invoice_checked.check_nguoi_ban.is_dia_chi_cty_exist_in_cqt ? 
                                                    `
                                                    <td
                                                        class="green-tick-check-mark-successful"
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;">Đúng địa chỉ công ty bên bán</span>
                                                    </td>
                                                    `
                                                    :
                                                    `
                                                    <td
                                                        class="red-tick-check-mark-failed"
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;">Sai địa chỉ công ty bên bán</span>
                                                    </td>
                                                    `
                                                }
                                            </tr>`);
                                            $('#validation-invoice-content-table tbody').append(`
                                                ${invoiceValidationResult.invoice_checked.is_invoice_signed ? 
                                                    `
                                                    <tr>
                                                    <td
                                                        class="green-tick-check-mark-successful"
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;">Hóa đơn đã được kí điện tử</span>
                                                    </td>
                                                    `
                                                    :
                                                    `
                                                    <tr>
                                                    <td
                                                        class="red-tick-check-mark-failed"
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;">Hóa đơn chưa được kí điện tử</span>
                                                    </td>
                                                    `
                                                }


                                                ${invoiceValidationResult.invoice_checked.is_modified_invoice.result ? 
                                                    `
                                                    <td
                                                        class="green-tick-check-mark-successful"
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;">Hóa đơn không bị chỉnh sửa</span>
                                                    </td>
                                                    `
                                                    :
                                                    `
                                                    <td
                                                        class="red-tick-check-mark-failed"
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;">Hóa đơn đã bị chỉnh sửa</span>
                                                    </td>
                                                    `
                                                }
                                            </tr>`);
                                        }
        
                                        // console.log("!!invoiceValidationResult.sign_info", !!invoiceValidationResult.sign_info);
                                        // console.log("!!invoiceValidationResult.sign_info.result", !!invoiceValidationResult.sign_info.result);
                                        // Kết quả kiểm tra chữ kí
                                        if(!!invoiceValidationResult.sign_info) {
                                            $('#validation-invoice-content-table tbody').append(`<tr>
                                                <td
                                                    colspan="2"
                                                    style="font-weight: bold; text-align: center;padding: 12px 0px;"
                                                >
                                                    KẾT QUẢ KIỂM TRA CHỮ KÍ
                                                </td>
                                            </tr>`);
                                            if(!!invoiceValidationResult.sign_info.is_modified_sign) {
                                                $('#validation-invoice-content-table tbody').append(`
                                                    ${invoiceValidationResult.sign_info.is_modified_sign.result ? 
                                                        `
                                                        <tr>
                                                        <td
                                                            class="green-tick-check-mark-successful"
                                                            style="padding-top: 8px;"
                                                        >
                                                            <span style="font-weight: bold;">Chữ kí hợp lệ</span>
                                                        </td>
                                                        ` 
                                                        :
                                                        `
                                                        <tr>
                                                        <td
                                                            class="red-tick-check-mark-failed"
                                                            style="padding-top: 8px;"
                                                        >
                                                            <span style="font-weight: bold;">Chữ kí không hợp lệ</span>
                                                        </td>
                                                        `
                                                    }
                                                    <td
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;display: flex;align-items: center;margin-left: 6px;">
                                                            Trạng thái chữ ký: ${
                                                                invoiceValidationResult.sign_info.status_sign.includes("Còn hạn") ?
                                                                `<span class="status_sign_unexpired"
                                                                >${invoiceValidationResult.sign_info.status_sign}</span>` : invoiceValidationResult.sign_info.status_sign.includes("Hết hạn") ?
                                                                `<span class="status_sign_expired"
                                                                >${invoiceValidationResult.sign_info.status_sign}</span>` : invoiceValidationResult.sign_info.status_sign.includes("Không thuộc danh mục") ?
                                                                `<div class="status_sign_not_in_digi_sign_catalog"
                                                                >Không thuộc danh
                                                                mục chữ ký số</div>` : ""}
                                                        </span>
                                                    </td>
                                                </tr>`);
                                            } else {
                                                $('#validation-invoice-content-table tbody').append(`<tr>
                                                    <td
                                                        class="red-tick-check-mark-failed"
                                                        style="padding-top: 8px;"
                                                    >
                                                        <span style="font-weight: bold;">Hóa đơn không có chữ kí</span>
                                                    </td>
                                                </tr>`);
                                            }
                                        }
        
                                        $('#validation-invoice-content-table tbody').append(`<tr>
                                            <td colspan="2" style="text-align: center; padding: 20px 0 35px;"
                                            >
                                                <button id="close-validation-invoice-content-popup" type="submit" class="close-popup-btn">Quay lại</button>
                                            </td>
                                        </tr>`);
                                    }
                                    else {
                                        // case 2: failure get the invoice validation: code is not "0"
                                        $('#validation-invoice-content-table tbody').append(`<tr>
                                            <td
                                                colspan="2"
                                                style="text-align: center; padding-top: 40px;"
                                            >
                                                ${invoiceValidationResult.message}
                                            </td>
                                        </tr>`);
                                        $('#validation-invoice-content-table tbody').append(`<tr>
                                            <td colspan="2" style="text-align: center; padding: 20px 0 35px;"
                                            >
                                                <button id="close-validation-invoice-content-popup" type="submit" class="close-popup-btn">Quay lại</button>
                                            </td>
                                        </tr>`);
                                        $("#validation-invoice-content").css('padding', '0 173px');
                                    }
                                }
                                // draw the pop up: File không tồn tại trong hệ thống
                                else {
                                    console.log("errrrrrrrrrrrrrrrrrr");
                                    $('#validation-invoice-content-table tbody').append(`<tr>
                                        <td>
                                            <button
                                                    id="close-validation-invoice-content-popup-x-sym" 
                                                    class="close-popup-btn"
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>`);
                                    $('#validation-invoice-content-table tbody').append(`<tr>
                                        <td
                                            colspan="2"
                                            style="font-weight: bold; text-align: center; padding-top: 40px;"
                                        >
                                            KẾT QUẢ KIỂM TRA HÓA ĐƠN
                                        </td>
                                    </tr>`);
                                    $('#validation-invoice-content-table tbody').append(`<tr>
                                        <td
                                            colspan="2"
                                            style="text-align: center; padding-top: 40px;"
                                        >
                                            Hóa đơn đang kiểm tra không tồn tại trong hệ thống
                                        </td>
                                    </tr>`);
                                    $('#validation-invoice-content-table tbody').append(`<tr>
                                        <td colspan="2" style="text-align: center; padding: 20px 0 35px;"
                                        >
                                            <button id="close-validation-invoice-content-popup" type="submit" class="close-popup-btn">Quay lại</button>
                                        </td>
                                    </tr>`);
    
                                    
                                    // adding property padding: 0 173px;
                                    $("#validation-invoice-content").css('padding', '0 173px');
                                }
                                // adding X symbol 
                                $('#close-validation-invoice-content-popup-x-sym').css('transform', `translateX(${$('#validation-invoice-content').width()+($('#validation-invoice-content').outerWidth() - $('#validation-invoice-content').width())/2 - 70}px)`);
    
    
                                $('.close-popup-btn').bind('click', () => {
                                    displayInvoiceValidationPopup = false;
                                    
                                    $('.overlay-shadow-popup-invoice-validation').remove();
                                });
                            },
                            error: function(error) {
                                console.log("error", error);
                                // table = $('<p>').text(data.responseText);
                                // _self.$el.find('.get-mobifone').empty().append(table);
                            }
                        });
                    }
                    
                });
            }
        }
    });

    OCA.MobiFone = OCA.MobiFone || {};

    OCA.MobiFone.MobiFoneTabView = MobiFoneTabView;
})();


function addTimeLeftFile(model) {
    
    var filePath = `${model.attributes.path ? (model.attributes.path + "/") : ""}${model.attributes.name}`;
    var fileId = model.id;
    console.log("filePath", filePath);
    var getTimeLeftUrl = OC.generateUrl('/apps/mbfarchivetime/getTimeLeftFile');
    var getTimeLeftData = { source: filePath, fileId: fileId};
    $.ajax({
        type: 'GET',
        url: getTimeLeftUrl,
        dataType: 'json',
        data: getTimeLeftData,
        async: true,
        success: function(data) {
            console.log("getTimeLeftFile data", data);
            // $(".app-sidebar-header__title-container p:nth-child(3)").css("opacity", 0.2);
            // setTimeout(function() {
            //     $(".app-sidebar-header__title-container p:nth-child(3)").remove();
            //     $(".app-sidebar-header__title-container").append(`
            //     <p>
            //         Thời gian lữu trữ còn lại: ${data.data.message.time_left}
            //     </p>`);
            //     $(".app-sidebar-header__title-container p:nth-child(3)").css("opacity", 1);
            // }, 300);
            $(".app-sidebar-header__title-container p:nth-child(3)").remove();
            $(".app-sidebar-header__title-container").append(`
            <p>
                Thời gian lữu trữ còn lại: ${data.data.message.time_left}
            </p>`);
        },
        error: function(error) {
            console.log("error", error);
            // table = $('<p>').text(data.responseText);
            // _self.$el.find('.get-mobifone').empty().append(table);
        }
    });
}