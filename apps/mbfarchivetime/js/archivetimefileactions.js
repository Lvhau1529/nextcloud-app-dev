(function() {
    console.log("a");
    OCA.Files.fileActions.registerAction({
        name: 'UpdateArchiveDueTime',
        mime: 'file',
        permissions: OC.PERMISSION_READ,
        iconClass: 'icon-alert-outline',
        actionHandler: function (filename, context) {
            console.log("context", context);
            console.log("filename", filename);

            const filePath = getFullPath(context, filename);
            console.log("filePath", filePath);

            const fileId = getFileId(context);
            console.log("fileId", fileId);

            // Adding the frame
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
                class="overlay-shadow-popup-archive-time"
                >
                    <div
                    style="
                        /* display: table-cell; */
                        /* vertical-align: middle; */
                        margin: 135px 25%;
                        /* width: 37.5%; /* or whatever */
                    "
                    class="overlay-band-popup-archive-time"
                    >
                        <div
                        style="
                            display: table;
                            width: 100%;
                            background-color: white; /* or whatever */
                            color: black;
                        "
                        class="overlay-box-popup-archive-time"
                        id="validation-invoice-content"
                        >
                            <table id="content-table-archive-time">
                                <tbody>
                                    <div class="icon-loading-archive-time-div" style="width: 100%;height: 300px;">
                                        <div class="icon-loading-archive-time" alt="Loading" style="
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
            
            $('.overlay-shadow-popup-archive-time').css('overflow-y', 'scroll');
            $('.overlay-shadow-popup-archive-time').css('height', '100%');

            

            var getTimeLeftUrl = OC.generateUrl('/apps/mbfarchivetime/getTimeLeftFile');
            var getTimeLeftFileData = { source: filePath, fileId: fileId};
            $.ajax({
                type: 'GET',
                url: getTimeLeftUrl,
                dataType: 'json',
                data: getTimeLeftFileData,
                async: true,
                success: function(getTimeLeftFileDataResponse) {
                    console.log("getTimeLeftFileDataResponse", getTimeLeftFileDataResponse);
                    // write here

                    $('.overlay-box-popup-archive-time').width('');
                    $('.overlay-box-popup-archive-time').css('margin', '0 auto');
                    $('.icon-loading-archive-time-div').remove();
    
                    $('#content-table-archive-time tbody').append(`<tr>
                        <td>
                            <button style="
                                        position: absolute;
                                        /* right: 25%; */
                                        transform: translateX(1205px);
                                        background-color: white;
                                        border: none;
                                        color: black;
                                        border-radius: 0;"
                                    class="close-popup-archive-time-btn"
                            >
                                X
                            </button>
                        </td>
                    </tr>`);
                    $('#content-table-archive-time tbody').append(`<tr>
                        <td
                            colspan="4"
                            class="duration-time-popup-title cursor-auto"
                        >
                            CẬP NHẬT THỜI HẠN LƯU TRỮ TÀI LIỆU
                        </td>
                    </tr>`);
                    // hard to loop the tag list
                    $('#content-table-archive-time tbody').append(`<tr class="centering-duration-options-list">
                        <td class="centering-duration-option">
                            <label class="switch-archive-time">
                                <input type="checkbox" id="centering-duration-option-1-year" value="1y">
                                <span class="slider-archive-time round-archive-time"></span>
                            </label>
                            1 Năm
                        </td>
                        <td class="centering-duration-option">
                            <label class="switch-archive-time">
                                <input type="checkbox" id="centering-duration-option-5-year" value="5y">
                                <span class="slider-archive-time round-archive-time"></span>
                            </label>
                            5 Năm
                        </td>
                        <td class="centering-duration-option">
                            <label class="switch-archive-time">
                                <input type="checkbox" id="centering-duration-option-10-year" value="10y">
                                <span class="slider-archive-time round-archive-time"></span>
                            </label>
                            10 Năm
                        </td>
                        <td class="centering-duration-option">
                            <label class="switch-archive-time">
                                <input type="checkbox" id="centering-duration-option-unlimited" value="unlimited">
                                <span class="slider-archive-time round-archive-time"></span>
                            </label>
                            Vĩnh viễn
                        </td>
                    </tr>`);

                    switch(getTimeLeftFileDataResponse.data.message.tag_label) {
                        case "1y": {
                            $('#centering-duration-option-1-year').prop('checked', true);
                            break;
                        }
                        case "5y": {
                            $('#centering-duration-option-5-year').prop('checked', true);
                            break;
                        }
                        case "10y": {
                            $('#centering-duration-option-10-year').prop('checked', true);
                            break;
                        }
                        case "unlimited": {
                            $('#centering-duration-option-unlimited').prop('checked', true);
                            break;
                        }
                        default: {
                            break;
                        }
                    }

                    $('#content-table-archive-time tbody').append(`<tr class="content-table-archive-time-content-row">
                        <td colspan="4" style="font-size: 16px;">
                            <pre style="font-weight: bold;" class="cursor-auto">Lưu ý:</pre>
                            <pre style="font-weight: bold;" class="cursor-auto">Những tài liệu lưu tối thiểu 5 năm:</pre>
                            <pre class="cursor-auto">1. Chứng từ kế toán không sử dụng trực tiếp để ghi sổ kế toán và lập báo cáo tài chính như phiếu thu, phiếu chi, phiếu nhập kho, phiếu xuất kho không lưu trong tập tài liệu</pre>
                            <pre class="cursor-auto">kế toán của bộ phận kế toán.</pre>
                            <pre class="cursor-auto">2. Tài liệu kế toán dùng cho quản lý, điều hành của đơn vị kế toán không trực tiếp ghi sổ kế toán và lập báo cáo tài chính.</pre>
                            <pre class="cursor-auto">3. Trường hợp tài liệu kế toán quy định tại khoản 1, khoản 2 Điều này mà pháp luật khác quy định phải lưu trữ trên 5 năm thì thực hiện lưu trữ theo quy định đó.</pre>
                            <pre>
                            </pre>
                            <pre style="font-weight: bold;" class="cursor-auto">Tài liệu phải lưu trữ tối thiểu 10 năm:</pre>
                            <pre class="cursor-auto">1. Chứng từ kế toán sử dụng trực tiếp để ghi sổ kế toán và lập báo cáo tài chính, các bảng kê, bảng tổng hợp chi tiết, các sổ kế toán chi tiết, các sổ kế toán tổng hợp, báo</pre>
                            <pre class="cursor-auto">cáo tài chính tháng, quý, năm của đơn vị kế toán, báo cáo quyết toán, báo cáo tự kiểm tra kế toán, biên bản tiêu hủy tài liệu kế toán lưu trữ và tài liệu khác sử dụng trực</pre>
                            <pre class="cursor-auto">tiếp để ghi sổ kế toán và lập báo cáo tài chính.</pre>
                            <pre class="cursor-auto">2. Tài liệu kế toán liên quan đến thanh lý, nhượng bán tài sản cố định; báo cáo kết quả kiểm kê và đánh giá tài sản.</pre>
                            <pre class="cursor-auto">3. Tài liệu kế toán của đơn vị chủ đầu tư, bao gồm tài liệu kế toán của các kỳ kế toán năm và tài liệu kế toán về báo cáo quyết toán dự án hoàn thành thuộc nhóm B, C.</pre>
                            <pre class="cursor-auto">4. Tài liệu kế toán liên quan đến thành lập, chia, tách, hợp nhất, sáp nhập, chuyển đổi hình thức sở hữu, chuyển đổi loại hình doanh nghiệp hoặc chuyển đổi đơn vị, giải thể,</pre>
                            <pre class="cursor-auto">phá sản, chấm dứt hoạt động, kết thúc dự án.</pre>
                            <pre class="cursor-auto">5. Tài liệu liên quan tại đơn vị như hồ sơ kiểm toán của Kiểm toán Nhà nước, hồ sơ thanh tra, kiểm tra, giám sát của cơ quan nhà nước có thẩm quyền hoặc hồ sơ của các tổ</pre>
                            <pre class="cursor-auto">chức kiểm toán độc lập.</pre>
                            <pre class="cursor-auto">6. Các tài liệu khác không được quy định tại mục lưu trữ 5 năm và mục lưu trữ vĩnh viễn.</pre>
                            <pre>
                            </pre>
                            <pre style="font-weight: bold;" class="cursor-auto">Tài liệu phải lưu trữ vĩnh viễn:</pre>
                            <pre class="cursor-auto">1. Báo cáo quyết toán dự án hoàn thành thuộc nhóm A, dự án quan trọng quốc gia; Tài liệu kế toán khác có tính sử liệu, có ý nghĩa quan trọng về kinh tế, an ninh, quốc</pre>
                            <pre class="cursor-auto">phòng.</pre>
                            <pre class="cursor-auto">Việc xác định tài liệu kế toán khác phải lưu trữ vĩnh viễn do người đại diện theo pháp luật của đơn vị kế toán.</pre>
                            <pre class="cursor-auto">2. Đối với hoạt động kinh doanh, tài liệu kế toán phải lưu trữ vĩnh viễn gồm các tài liệu kế toán có tính sử liệu, có ý nghĩa quan trọng về kinh tế, an ninh, quốc phòng.</pre>
                            <pre class="cursor-auto">Việc xác định tài liệu kế toán phải lưu trữ vĩnh viễn do người đứng đầu hoặc người đại diện theo pháp luật của đơn vị kế toán quyết định căn cứ vào tính sử liệu và ý nghĩa</pre>
                            <pre class="cursor-auto">lâu dài của tài liệu, thông tin để quyết định cho từng trường hợp cụ thể và giao cho bộ phận kế toán hoặc bộ phận khác lưu trữ dưới hình thức bản gốc hoặc hình thức</pre>
                            <pre class="cursor-auto">khác.</pre>
                            <pre class="cursor-auto">3. Thời hạn lưu trữ vĩnh viễn phải là thời hạn lưu trữ trên 10 năm cho đến khi tài liệu kế toán bị hủy hoại tự nhiên.</pre>
                        </td>
                    </tr>`)
                    // $('#content-table-archive-time tbody').append(`<tr><td>Ký hiệu: <span style="font-weight: bold;">${invoiceValidationResult.invoice_info.ky_hieu_hoa_don}</span></td></tr>`);
                    // $('#content-table-archive-time tbody').append(`<tr><td>Số: <span style="color: #BF6B55;">${invoiceValidationResult.invoice_info.so_hoa_don}</span></td></tr>`);
                    // $('#content-table-archive-time tbody').append(`<tr>
                    //     <td>
                    //         Ngày hóa đơn: <span style="font-weight: bold;">${invoiceValidationResult.invoice_info.ngay_lap_hoa_don}</span>
                    //     </td>
                    //     <td>
                    //         <span style="font-weight: bold;">Trạng thái hóa đơn</span>: ${invoiceValidationResult.invoice_info.trang_thai_hoa_don === true ?
                    //             `<span class="status_invoice_valid">Hợp lệ</span>` : `<span class="status_invoice_invalid">Không hợp lệ</span>`}
                    //     </td>
                    // </tr>`);
                    // $('#content-table-archive-time tbody').append(`<tr><td>Ngày kí: <span style="font-weight: bold;">${invoiceValidationResult.invoice_info.ngay_ky_hoa_hoa_don}</span></td></tr>`);
                    // $('#content-table-archive-time tbody').append(`<tr>
                    //     <td
                    //         class="${invoiceValidationResult.invoice_checked.check_nguoi_mua.is_mst_exist_in_cqt ? "success" : "failed"}"
                    //         style="padding-top: 15px;"
                    //     >
                    //         <span style="font-weight: bold;">Đúng MST bên mua</span>
                    //     </td>
                    //     <td
                    //         class="${invoiceValidationResult.invoice_checked.check_nguoi_ban.is_mst_exist_in_cqt ? "success" : "failed"}"
                    //         style="padding-top: 15px;"
                    //     >
                    //         <span style="font-weight: bold;">Đúng MST bên bán</span>
                    //     </td>
                    // </tr>`);
                    // $('#content-table-archive-time tbody').append(`<tr>
                    //     <td
                    //         class="${invoiceValidationResult.invoice_checked.check_nguoi_mua.is_ten_cty_exist_in_cqt ? "success" : "failed"}"
                    //         style="padding-top: 8px;"
                    //     >
                    //         <span style="font-weight: bold;">Đúng tên công ty bên mua</span>
                    //     </td>
                    //     <td
                    //         class="${invoiceValidationResult.invoice_checked.check_nguoi_ban.is_ten_cty_exist_in_cqt ? "success" : "failed"}"
                    //         style="padding-top: 8px;"
                    //     >
                    //         <span style="font-weight: bold;">Đúng tên công ty bên bán</span>
                    //     </td>
                    // </tr>`);
                    // $('#content-table-archive-time tbody').append(`<tr>
                    //     <td
                    //         class="${invoiceValidationResult.invoice_checked.check_nguoi_mua.is_dia_chi_cty_exist_in_cqt ? "success" : "failed"}"
                    //         style="padding-top: 8px;"
                    //     >
                    //         <span style="font-weight: bold;">Đúng địa chỉ công ty bên mua</span>
                    //     </td>
                    //     <td
                    //         class="${invoiceValidationResult.invoice_checked.check_nguoi_ban.is_dia_chi_cty_exist_in_cqt ? "success" : "failed"}"
                    //         style="padding-top: 8px;"
                    //     >
                    //         <span style="font-weight: bold;">Đúng địa chỉ công ty bên bán</span>
                    //     </td>
                    // </tr>`);
                    // $('#content-table-archive-time tbody').append(`<tr>
                    //     <td
                    //         class="${invoiceValidationResult.invoice_checked.is_invoice_signed ? "success" : "failed"}"
                    //         style="padding-top: 8px;"
                    //     >
                    //         <span style="font-weight: bold;">Hóa đơn đã được kí điện tử</span>
                    //     </td>
                    //     <td
                    //         class="${invoiceValidationResult.invoice_checked.is_modified_invoice.result ? "success" : "failed"}"
                    //         style="padding-top: 8px;"
                    //     >
                    //         <span style="font-weight: bold;">Hóa đơn không bị chỉnh sửa</span>
                    //     </td>
                    // </tr>`);
                    // $('#content-table-archive-time tbody').append(`<tr>
                    //     <td
                    //         colspan="4"
                    //         style="font-weight: bold; text-align: center;padding: 12px 0px;"
                    //     >
                    //         KẾT QUẢ KIỂM TRA CHỮ KÍ
                    //     </td>
                    // </tr>`);
                    // $('#content-table-archive-time tbody').append(`<tr>
                    //     <td
                    //         class="${invoiceValidationResult.sign_info.is_modified_sign.result ? "success" : "failed"}"
                    //         style="padding-top: 8px;"
                    //     >
                    //         <span style="font-weight: bold;">Chữ kí không bị chỉnh sửa</span>
                    //     </td>
                    //     <td
                    //         style="padding-top: 8px;"
                    //     >
                    //         <span style="font-weight: bold;display: flex;align-items: center;margin-left: 6px;">
                    //             Trạng thái chữ ký: ${
                    //                 invoiceValidationResult.sign_info.status_sign === "Còn hạn" ?
                    //                 `<span class="status_sign_unexpired"
                    //                 >${invoiceValidationResult.sign_info.status_sign}</span>` : invoiceValidationResult.sign_info.status_sign === "Hết hạn" ?
                    //                 `<span class="status_sign_expired"
                    //                 >${invoiceValidationResult.sign_info.status_sign}</span>` : invoiceValidationResult.sign_info.status_sign === "Không thuộc danh mục chữ ký số" ?
                    //                 `<div class="status_sign_not_in_digi_sign_catalog"
                    //                 >Không thuộc danh
                    //                 mục chữ ký số</div>` : ""}
                    //         </span>
                    //     </td>
                    // </tr>`);
        
                    $('#content-table-archive-time tbody').append(`<tr>
                        <td colspan="4" style="text-align: center; padding: 20px 0 35px;"
                        >
                            <button id="close-content-popup-archive-time" type="submit">Xác nhận</button>
                        </td>
                    </tr>`);
        
                    // Scripts after rendering all html css
    
                    // $('#centering-duration-option-1-year').prop('checked', true);
    
                    $('#centering-duration-option-1-year').on('change', function(event) {
                        console.log("centering-duration-option-1-year event", event);
                        if(event.target.checked === false) {
                            this.checked = true;
                        }
                        $('#centering-duration-option-5-year').prop('checked', false);
                        $('#centering-duration-option-10-year').prop('checked', false);
                        $('#centering-duration-option-unlimited').prop('checked', false);
                    });
                    
                    $('#centering-duration-option-5-year').on('change', function(event) {
                        console.log("centering-duration-option-5-year event", event);
                        if(event.target.checked === false) {
                            this.checked = true;
                        }
                        $('#centering-duration-option-1-year').prop('checked', false);
                        $('#centering-duration-option-10-year').prop('checked', false);
                        $('#centering-duration-option-unlimited').prop('checked', false);
                    });
                    
                    $('#centering-duration-option-10-year').on('change', function(event) {
                        console.log("centering-duration-option-10-year event", event);
                        if(event.target.checked === false) {
                            this.checked = true;
                        }
                        $('#centering-duration-option-1-year').prop('checked', false);
                        $('#centering-duration-option-5-year').prop('checked', false);
                        $('#centering-duration-option-unlimited').prop('checked', false);
                    });
                    
                    $('#centering-duration-option-unlimited').on('change', function(event) {
                        if(event.target.checked === false) {
                            this.checked = true;
                        }
                        $('#centering-duration-option-1-year').prop('checked', false);
                        $('#centering-duration-option-5-year').prop('checked', false);
                        $('#centering-duration-option-10-year').prop('checked', false);
                    });
    
                    $('.close-popup-archive-time-btn').bind('click', function(){
                        $('.overlay-shadow-popup-archive-time').remove();
                    });
    
                    $('#close-content-popup-archive-time').bind('click', function() {
                        $(".error-row").remove();

                        $('#close-content-popup-archive-time').attr("disabled", true);
                        $("#close-content-popup-archive-time").css("border-color", "#FFFFFF");
    
                        var url = OC.generateUrl('/apps/mbfarchivetime/assignFileTag')
                        console.log("url", url);
    
                        var tagLabel = 
                            $('#centering-duration-option-1-year').is(':checked') ? $('#centering-duration-option-1-year').val() :
                            $('#centering-duration-option-5-year').is(':checked') ? $('#centering-duration-option-5-year').val() :
                            $('#centering-duration-option-10-year').is(':checked') ? $('#centering-duration-option-10-year').val() :
                            $('#centering-duration-option-unlimited').is(':checked') ? $('#centering-duration-option-unlimited').val() : null;
    
                        var data = { source: filePath, fileId: fileId, tagLabel: tagLabel}
                        console.log("data", data);
    
                        $.ajax({
                            type: 'GET',
                            url: url,
                            dataType: 'json',
                            data: data,
                            async: true,
                            success: function(data) {
                                console.log("data", data);
                                
                                if(data.data.code === 200) {
                                    $.ajax({
                                        type: 'GET',
                                        url: getTimeLeftUrl,
                                        dataType: 'json',
                                        data: getTimeLeftFileData,
                                        async: true,
                                        success: function(newGetTimeLeftFileDataResponse) {
                                            $('.overlay-shadow-popup-archive-time').remove();
                                            $(".app-sidebar-header__title-container p:nth-child(3)").remove();
                                            $(".app-sidebar-header__title-container").append(`
                                            <p>
                                                Thời gian lưu trữ còn lại: ${newGetTimeLeftFileDataResponse.data.message.time_left}
                                            </p>`);
                                        },
                                        error: function(error) {
                                            console.log("error", error);
                                            // table = $('<p>').text(data.responseText);
                                            // _self.$el.find('.get-mobifone').empty().append(table);
                                        }
                                    });
                                }
                                else {
                                    $(`<tr class="error-row">
                                        <td style="color: rgb(255, 0, 0);">
                                            Lỗi: ${data.data.message}
                                        </td>
                                    </tr>`
                                    ).insertAfter('.content-table-archive-time-content-row');
                                    $('#close-content-popup-archive-time').attr("disabled", false);
                                }
                            },
                            error: function(error) {
                                console.log("error", error);
                                // table = $('<p>').text(data.responseText);
                                // _self.$el.find('.get-mobifone').empty().append(table);
                            }
                        });
                    })
                
                    // $.get('a.html', data => {
                    //     console.log(`data`, data);
                    //     console.log(`$(this).children("div:first")`, $(this).children("div:first"));
                    //     $(this).children("div:first").append(data);
                    // })
                    // let dir, id
                    // if (context.$file) {
                    //     dir = context.$file.attr('data-path')
                    //     id = context.$file.attr('data-id')
                    // } else {
                    //     dir = context.fileList.getCurrentDirectory()
                    //     id = context.fileId
                    // }
                    // if (OCA.Files.App && OCA.Files.App.getActiveView() !== 'files') {
                    //     OCA.Files.App.setActiveView('files', {silent: true});
                    //     OCA.Files.App.fileList.changeDirectory(OC.joinPaths(dir, filename), true, true);
                    // } else {
                    //     context.fileList.changeDirectory(OC.joinPaths(dir, filename), true, false, parseInt(id, 10));
                    // }
                },
                error: function(error) {
                    console.log("error", error);
                    // table = $('<p>').text(data.responseText);
                    // _self.$el.find('.get-mobifone').empty().append(table);
                }
            });

            setTimeout(function() {
            }, 500);
            
        },
        displayName: t('mbfarchivetime', 'UpdateArchiveDueTime')
    })
})();

function getFullPath(context, filename) {
    return `${context.dir !== "/" ? context.dir+"/" : ""}${filename}`
}

function getFileId(context) {
    return context.fileInfoModel.id;
}
