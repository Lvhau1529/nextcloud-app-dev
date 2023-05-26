(function() {
    console.log("a");
    console.log("$('.action-menu')", $('.action-menu'));
    $('.action-menu').click(function() {
        console.log("b")
    });
    registerActionWithMimeType('application/pdf');
    registerActionWithMimeType('image');
})();

function registerActionWithMimeType(mimeType) {
    
    OCA.Files.fileActions.registerAction({
        name: 'OcrFile',
        mime: mimeType,
        permissions: OC.PERMISSION_READ,
        iconClass: 'scissors',
        actionHandler: function (filename, context) {
            console.log("context", context);
            console.log("filename", filename);

            const filePath = getFullPath(context, filename);
            console.log("filePath", filePath);

            const fileId = getFileId(context);
            console.log("fileId", fileId);

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
                class="overlay-shadow-popup-ocr-file"
                >
                    <div
                    style="
                        /* display: table-cell; */
                        /* vertical-align: middle; */
                        margin: 368px 25%;
                        /* width: 37.5%; /* or whatever */
                    "
                    class="overlay-band-popup-ocr-file"
                    >
                        <div
                        style="
                            display: table;
                            width: 100%;
                            background-color: white; /* or whatever */
                            color: black;
                        "
                        class="overlay-box-popup-ocr-file"
                        id="validation-invoice-content"
                        >
                            <table id="content-table-ocr-file">
                                <tbody>
                                    <div class="icon-loading-ocr-file-div" style="width: 100%;height: 300px;">
                                        <div class="icon-loading-ocr-file" alt="Loading" style="
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
            
            $('.overlay-shadow-popup-ocr-file').css('overflow-y', 'scroll');
            $('.overlay-shadow-popup-ocr-file').css('height', '100%');

            // check status ocr file

            // if not existed => call mbfocr Controller

            var checkStatusOcrFileUrl = OC.generateUrl('/apps/mbfocr/checkStatusOcrFile');
            var checkStatusOcrFileData = { source: filePath, fileId: fileId };
            $.ajax({
                type: 'GET',
                url: checkStatusOcrFileUrl,
                dataType: 'json',
                data: checkStatusOcrFileData,
                async: true,
                success: function(checkStatusOcrFileDataResponse) {
                    console.log("checkStatusOcrFileDataResponse", checkStatusOcrFileDataResponse);
                    // status code 46: File chưa ocr
                    if(checkStatusOcrFileDataResponse.data.code === '46') {
                        // OCR file
                        var ocrFileUrl = OC.generateUrl('/apps/mbfocr/ocrFile');
                        var ocrFileData = { source: filePath, fileId: fileId };
                        $.ajax({
                            type: 'GET',
                            url: ocrFileUrl,
                            dataType: 'json',
                            data: ocrFileData,
                            async: true,
                            success: function(ocrFileDataResponse) {
                                console.log("ocrFileDataResponse", ocrFileDataResponse);
                                
                                if(ocrFileDataResponse.data.code === "45") {
                                    contentArray = [
                                        'Tiến trình OCR đang được tiến hành',
                                        'Bạn sẽ nhận được thông báo sau khi tiến trình hoàn tất'
                                    ];
                                    renderPopupMessage(contentArray)
                                }
                
                            },
                            error: function(error) {
                                console.log("error", error);
                                // table = $('<p>').text(data.responseText);
                                // _self.$el.find('.get-mobifone').empty().append(table);
                            }
                        });
                    }
                    else if(checkStatusOcrFileDataResponse.data.code === '36') {
                        // status code 42: File OCR không tồn tại
                        contentArray = [
                            'Đường dẫn file sai hoặc file/folder không tồn tại',
                            'Bạn vui lòng quay trở lại'
                        ];
                        renderPopupMessage(contentArray);
                        $('.content-table-ocr-file-content-row td').css('padding', '0 175px');
                        $('#content-table-ocr-file tbody tr:nth-child(1) td button').css('transform', 'translateX(646px)');
                    }
                    else if(checkStatusOcrFileDataResponse.data.code === '42') {
                        // status code 42: File OCR không đúng định dạng
                        contentArray = [
                            'Tiến trình OCR không đúng định dạng PDF hoặc ảnh (JPG, PNG)',
                            'Bạn vui lòng quay trở lại'
                        ];
                        renderPopupMessage(contentArray);
                        $('.content-table-ocr-file-content-row td').css('padding', '0 100px');
                        $('#content-table-ocr-file tbody tr:nth-child(1) td button').css('transform', 'translateX(613px)');
                    }
                    else if(checkStatusOcrFileDataResponse.data.code === '47') {
                        // status code 47: File đã OCR thành công
                        // gần như ko vào kịch bản này
                        contentArray = [
                            'Tài liệu đã hoàn tất OCR',
                            'Bạn vui lòng không thực hiện thao tác OCR lại.'
                        ];
                        renderPopupMessage(contentArray);
                        $('.content-table-ocr-file-content-row td').css('padding', '0 225px');
                        $('#content-table-ocr-file tbody tr:nth-child(1) td button').css('transform', 'translateX(732px)');
                    }
                    else if(checkStatusOcrFileDataResponse.data.code === '48') {
                        // status code 48: File đang tiến hành ocr
                        contentArray = [
                            'Tiến trình OCR đang được tiến hành',
                            'Bạn vui lòng đợi trong giây lát'
                        ];
                        renderPopupMessage(contentArray);
                        $('.content-table-ocr-file-content-row td').css('padding', '0 200px');
                        $('#content-table-ocr-file tbody tr:nth-child(1) td button').css('transform', 'translateX(602px)');
                    }
                    else if(checkStatusOcrFileDataResponse.data.code === '49') {
                        // status code 49: Hệ thống quá tải
                        contentArray = [
                            'Hệ thống đang quá tải',
                            'Bạn vui lòng OCR sau'
                        ];
                        renderPopupMessage(contentArray);
                        $('.content-table-ocr-file-content-row td').css('padding', '0 200px');
                        $('#content-table-ocr-file tbody tr:nth-child(1) td button').css('transform', 'translateX(501px)');
                    }
                },
                error: function(error) {
                    console.log("error", error);
                }
            })
            
            
        },
        displayName: t('mbfocr', 'OcrFile')
    });
}

function getFullPath(context, filename) {
    return `${context.dir !== "/" ? context.dir+"/" : ""}${filename}`
}

function getFileId(context) {
    return context.fileInfoModel.id;
}

function renderPopupMessage(contentArray) {
    $('.overlay-box-popup-ocr-file').width('');
    $('.overlay-box-popup-ocr-file').css('margin', '0 auto');
    $('.icon-loading-ocr-file-div').remove();

    $('#content-table-ocr-file tbody').append(`<tr>
        <td>
            <button style="
                        position: absolute;
                        /* right: 25%; */
                        transform: translateX(406px);
                        background-color: white;
                        border: none;
                        color: black;
                        border-radius: 0;"
                    class="close-popup-ocr-file-btn"
            >
                X
            </button>
        </td>
    </tr>`);
    $('#content-table-ocr-file tbody').append(`<tr>
        <td
            colspan="4"
            class="ocr-file-popup-title cursor-auto"
        >
            THÔNG BÁO
        </td>
    </tr>`);

    $('#content-table-ocr-file tbody').append(`<tr class="content-table-ocr-file-content-row">
        <td colspan="4" style="font-size: 16px; text-align: center;">
            <pre style="font-weight: bold;" class="cursor-auto">${contentArray[0]}</pre>
            <pre style="font-weight: bold;" class="cursor-auto">${contentArray[1]}</pre>
        </td>
    </tr>`)

    $('#content-table-ocr-file tbody').append(`<tr>
        <td colspan="4" style="text-align: center; padding: 20px 0 20px;"
        >
            <button id="close-content-popup-ocr-file" type="submit">Xác nhận</button>
        </td>
    </tr>`);

    // Scripts after rendering all html css

    $('.close-popup-ocr-file-btn').bind('click', function(){
        $('.overlay-shadow-popup-ocr-file').remove();
    });

    $('#close-content-popup-ocr-file').bind('click', function() {
        $('.overlay-shadow-popup-ocr-file').remove();
    });
}