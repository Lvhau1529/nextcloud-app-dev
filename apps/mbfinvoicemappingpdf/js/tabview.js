(function() {
    var MobiFonePdfView = OCA.Files.DetailTabView.extend({
        id: 'MobiFonePdfView',
        className: 'tab MobiFonePdfView',

        getLabel: function() {
            return t('mobifone', 'Mbf Pdf');
        },

        getIcon: function() {
            return 'icon-pdf';
        },

        render: function() {
            var fileInfo = this.getFileInfo();
            let name = fileInfo.get('name');
            let pdfFile = filesPdf[name];
            console.log("pdfFile", pdfFile);
            if (fileInfo && !!pdfFile) {
                console.log(pdfFile.path);
                console.log(pdfFile);

                // http://172.31.193.54/remote.php/dav/files?dir=/Test&fileid=pdfFile.id
                let urlTemp = `${OC.Files.getClient()._baseUrl}/${pdfFile.path}/${pdfFile.name}`
                urlTemp = encodeURI(urlTemp);
                this.$el.html(`<iframe width="100%" height="100%" id="preview-pdf-mbf" src="/index.php/apps/files_pdfviewer/?file=${urlTemp}&amp;canDownload=1" class="viewer__file viewer__file--active"></iframe>`);

                // this.$el.html('<iframe data-v-4668a4a2="" data-v-47390bfb="" src="/index.php/apps/files_pdfviewer/?file=http%3A%2F%2F172.31.193.54%2Fremote.php%2Fdav%2Ffiles%2Fadmin%2FTest%2FXmlInvoice.pdf&amp;canDownload=1" class="viewer__file viewer__file--active"></iframe>');
                // this.$el.html('<div style="text-align:center; word-wrap:break-word;" class="get-pdf-mobifone" data-file-xml-pdf="' + name + '"></div>');
                let linkUrl = FileList.getDefaultActionUrl(pdfFile.path, pdfFile.id);
                var linkElem = $('<a><span>' + pdfFile.name + '</span></a>').attr({
                    "class": "name",
                    "href": linkUrl
                });

                linkElem.append('<div class="thumbnail-wrapper"><div class="thumbnail" style="background-image:url(' + FileList._getIconUrl(pdfFile) + ');"></div></div>');
                this.$el.find('.get-pdf-mobifone').empty().append(linkElem);
                // var docUrl = OC.generateUrl("/remote.php/webdav/App_Name/temp_folder/" + name);
                // PDFObject.embed(docUrl, $('.get-pdf-mobifone'));
                // this.$el.find('.get-pdf-mobifone').empty().append("");
                resizeTabview.init();
            } else {
                resizeTabview.stop();
            }
        },

        canDisplay: function(fileInfo) {
            if (!fileInfo || fileInfo.isDirectory()) {
                return false;
            }
            var mimetype = fileInfo.get('mimetype') || '';
            let name = fileInfo.get('name');

            return (['application/xml'].indexOf(mimetype) > -1 && !!filesPdf[name]);
        },

        formatValue: function(value) {
            return Array.isArray(value) ? value.join('; ') : value;
        },
    });

    OCA.MobiFone = OCA.MobiFone || {};

    OCA.MobiFone.MobiFonePdfView = MobiFonePdfView;
})();