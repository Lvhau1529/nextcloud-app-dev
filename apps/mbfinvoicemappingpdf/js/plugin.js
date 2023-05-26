var resizeTabview = {
    element: null,
    content: document.querySelector("#app-content"),
    init: (e) => {
        resizeTabview.element = document.querySelector('#app-sidebar-vue');
        // resizeTabview.element.style.width = "700px"
        // lswidth = localStorage.getItem("pre-width");
        // if (!!lswidth) {
        //     resizeTabview.element.style.width = lswidth;
        // }

        // resizeTabview.element.removeEventListener('click', resizeTabview.init, false);
        // resizeTabview.element.className = resizeTabview.element.className + ' resizable';
        // var resizer = document.createElement('div');
        // // resizer.className = 'resizer';
        // resizeTabview.element.appendChild(resizer);
        // resizer.addEventListener('mousedown', resizeTabview.initDrag, false);
    },
    stop: () => {
        resizeTabview.element = document.querySelector('#app-sidebar-vue');
        // resizeTabview.element.style.width = "27vw"
    },
    startX: null,
    startY: null,
    startWidth: null,
    startHeight: null,
    initDrag: (e) => {
        resizeTabview.startX = e.clientX;
        resizeTabview.startY = e.clientY;
        resizeTabview.startWidth = parseInt(document.defaultView.getComputedStyle(resizeTabview.element).width, 10);
        resizeTabview.startHeight = parseInt(document.defaultView.getComputedStyle(resizeTabview.element).height, 10);
        document.documentElement.addEventListener('mousemove', resizeTabview.doDrag, false);
        document.documentElement.addEventListener('mouseup', resizeTabview.stopDrag, false);
    },
    doDrag: (e) => {
        if (!resizeTabview.element.className.includes("moving")) {
            resizeTabview.element.classList.toggle('moving', true);
            resizeTabview.content.classList.toggle('moving', true);
        }
        resizeTabview.element.style.width = (resizeTabview.startWidth - e.clientX + resizeTabview.startX) + 'px';
        localStorage.setItem("pre-width", resizeTabview.element.style.width);
        // p.style.height = (resizeTabview.startHeight + e.clientY - resizeTabview.startY) + 'px';
    },
    stopDrag: (e) => {
        document.documentElement.removeEventListener('mousemove', resizeTabview.doDrag, false);
        document.documentElement.removeEventListener('mouseup', resizeTabview.stopDrag, false);
        if (resizeTabview.element.className.includes("moving")) {
            setTimeout(() => {
                resizeTabview.element.classList.toggle('moving', false);
                resizeTabview.content.classList.toggle('moving', false);
            }, 1000);
        }
        // resizeTabview.element.click();
    }
}
var filesPdf = {};
var mobifonePdfListPlugin = {
    attach: function(fileList) {
        console.log("fileList", fileList);

        //hide file pdf
        fileList.setFiles = function(filesArray) {
            let fileNameSame = filesArray.filter(item => {
                return item.mimetype === 'application/xml';
            }).map(item => {
                let name = item.name;
                if (name.includes('.xml')) {
                    name = name.replace('.xml', '');
                }
                return name;
            });
            filesPdf = {};
            filesArray = filesArray.filter(item => {
                let name = item.name;
                if (name.includes('.pdf') && item.mimetype === 'application/pdf') {
                    name = name.replace('.pdf', '');
                    if (fileNameSame.indexOf(name) != -1) {
                        filesPdf[name + '.xml'] = item;
                        return false;
                    }
                }
                return true;
            }).map(item => {
                let name = item.name;
                if (name in filesPdf) {
                    item.pdf = filesPdf[name];
                }
                return item;
            });
            var self = this;
            // detach to make adding multiple rows faster
            this.files = filesArray;
            this.$fileList.empty();

            if (this._allowSelection) {
                // The results table, which has no selection column, checks
                // whether the main table has a selection column or not in order
                // to align its contents with those of the main table.
                this.$el.addClass('has-selection');
            }

            // clear "Select all" checkbox
            this.$el.find('.select-all').prop('checked', false);

            // Save full files list while rendering

            this.isEmpty = this.files.length === 0;
            this._nextPage();

            this.updateEmptyContent();

            this.fileSummary.calculate(this.files);

            this._selectedFiles = {};
            this._selectionSummary.clear();
            this.updateSelectionSummary();
            $(window).scrollTop(0);

            this.$fileList.trigger(jQuery.Event('updated'));
            _.defer(function() {
                self.$el.closest('#app-content').trigger(jQuery.Event('apprendered'));
            });
        }

        fileList._getIconUrl = function(fileInfo) {
            var mimeType = fileInfo.mimetype || 'application/octet-stream';
            // if (!!filesPdf[fileInfo.name] && mimeType === "application/xml") {
            //     return "/apps/mbfinvoiceparser/img/app.svg";
            // }
            if (mimeType === 'httpd/unix-directory') {
                // use default folder icon
                if (fileInfo.mountType === 'shared' || fileInfo.mountType === 'shared-root') {
                    return OC.MimeType.getIconUrl('dir-shared');
                } else if (fileInfo.mountType === 'external-root') {
                    return OC.MimeType.getIconUrl('dir-external');
                } else if (fileInfo.mountType !== undefined && fileInfo.mountType !== '') {
                    return OC.MimeType.getIconUrl('dir-' + fileInfo.mountType);
                } else if (fileInfo.shareTypes && (
                        fileInfo.shareTypes.indexOf(OC.Share.SHARE_TYPE_LINK) > -1 ||
                        fileInfo.shareTypes.indexOf(OC.Share.SHARE_TYPE_EMAIL) > -1)) {
                    return OC.MimeType.getIconUrl('dir-public')
                } else if (fileInfo.shareTypes && fileInfo.shareTypes.length > 0) {
                    return OC.MimeType.getIconUrl('dir-shared')
                }
                return OC.MimeType.getIconUrl('dir');
            }
            return OC.MimeType.getIconUrl(mimeType);
        }

        fileList._uploader.on('done', (function() {
            fileList.reload();
        }).bind(this));

        //rename
        fileList.rename = function(oldName) {
            var self = this;
            var tr, td, input, form;
            tr = this.findFileEl(oldName);
            var oldFileInfo = this.files[tr.index()];
            tr.data('renaming', true);
            td = tr.children('td.filename');
            input = $('<input type="text" class="filename"/>').val(oldName);
            form = $('<form></form>');
            form.append(input);
            td.children('a.name').children(':not(.thumbnail-wrapper)').hide();
            td.append(form);
            input.focus();
            //preselect input
            var len = input.val().lastIndexOf('.');
            if (len === -1 ||
                tr.data('type') === 'dir') {
                len = input.val().length;
            }
            input.selectRange(0, len);
            var checkInput = function() {
                var filename = input.val();
                if (filename !== oldName) {
                    // Files.isFileNameValid(filename) throws an exception itself
                    if (!!filesPdf[oldName]) {
                        let filenamePdf = filename.replace('.xml', '.pdf');
                        OCA.Files.Files.isFileNameValid(filenamePdf);
                        if (self.inList(filenamePdf)) {
                            throw t('files', '{newName} already exists', { newName: filenamePdf }, undefined, {
                                escape: false
                            });
                        }
                    }
                    OCA.Files.Files.isFileNameValid(filename);
                    if (self.inList(filename)) {
                        throw t('files', '{newName} already exists', { newName: filename }, undefined, {
                            escape: false
                        });
                    }
                }
                return true;
            };

            function restore() {
                input.tooltip('hide');
                tr.data('renaming', false);
                form.remove();
                td.children('a.name').children(':not(.thumbnail-wrapper)').show();
            }

            function updateInList(fileInfo) {
                self.updateRow(tr, fileInfo);
                self._updateDetailsView(fileInfo.name, false);
            }

            // TODO: too many nested blocks, move parts into functions
            form.submit(function(event) {
                event.stopPropagation();
                event.preventDefault();
                if (input.hasClass('error')) {
                    return;
                }

                try {
                    var newName = input.val().trim();
                    input.tooltip('hide');
                    form.remove();

                    if (newName !== oldName) {
                        checkInput();
                        // mark as loading (temp element)
                        self.showFileBusyState(tr, true);
                        tr.attr('data-file', newName);
                        var basename = newName;
                        if (newName.indexOf('.') > 0 && tr.data('type') !== 'dir') {
                            basename = newName.substr(0, newName.lastIndexOf('.'));
                        }
                        td.find('a.name span.nametext').text(basename);
                        td.children('a.name').children(':not(.thumbnail-wrapper)').show();

                        var path = tr.attr('data-path') || self.getCurrentDirectory();
                        let oldFilePdf = filesPdf[oldName];
                        if (!!oldFilePdf) {
                            let oldNamePdf = oldFilePdf.name;
                            let newNamePdf = newName.replace('.xml', '.pdf');
                            self.filesClient.move(OC.joinPaths(path, oldNamePdf), OC.joinPaths(path, newNamePdf))
                                .done(function() {
                                    oldFilePdf.name = newNamePdf;
                                    // updateInList(oldFilePdf);
                                    delete filesPdf[oldName];
                                    filesPdf[newName] = oldFilePdf;

                                    //update tab detail
                                    let divPdf = $('div[data-file-xml-pdf="' + oldName + '"]');
                                    console.log(divPdf);
                                    divPdf.find('a.name span').text(newNamePdf);
                                    divPdf.attr('id', 'xml-pdf-' + newName);
                                })
                                .fail(function(status) {
                                    // TODO: 409 means current folder does not exist, redirect ?
                                    if (status === 404) {
                                        // source not found, so remove it from the list
                                        OC.Notification.show(t('files', 'Could not rename "{fileName}", it does not exist any more', { fileName: oldNamePdf }), { timeout: 7, type: 'error' });

                                        self.remove(newNamePdf, { updateSummary: true });
                                        return;
                                    } else if (status === 412) {
                                        // target exists
                                        OC.Notification.show(
                                            t('files', 'The name "{targetName}" is already used in the folder "{dir}". Please choose a different name.', {
                                                targetName: newNamePdf,
                                                dir: self.getCurrentDirectory(),
                                            }), {
                                                type: 'error'
                                            }
                                        );
                                    } else {
                                        // restore the item to its previous state
                                        OC.Notification.show(t('files', 'Could not rename "{fileName}"', { fileName: oldNamePdf }), { type: 'error' });
                                    }
                                    // updateInList(oldFilePdf);
                                });
                        }
                        self.filesClient.move(OC.joinPaths(path, oldName), OC.joinPaths(path, newName))
                            .done(function() {
                                oldFileInfo.name = newName;
                                updateInList(oldFileInfo);
                                self.reload();
                            })
                            .fail(function(status) {
                                // TODO: 409 means current folder does not exist, redirect ?
                                if (status === 404) {
                                    // source not found, so remove it from the list
                                    OC.Notification.show(t('files', 'Could not rename "{fileName}", it does not exist any more', { fileName: oldName }), { timeout: 7, type: 'error' });

                                    self.remove(newName, { updateSummary: true });
                                    return;
                                } else if (status === 412) {
                                    // target exists
                                    OC.Notification.show(
                                        t('files', 'The name "{targetName}" is already used in the folder "{dir}". Please choose a different name.', {
                                            targetName: newName,
                                            dir: self.getCurrentDirectory(),
                                        }), {
                                            type: 'error'
                                        }
                                    );
                                } else {
                                    // restore the item to its previous state
                                    OC.Notification.show(t('files', 'Could not rename "{fileName}"', { fileName: oldName }), { type: 'error' });
                                }
                                updateInList(oldFileInfo);
                            });
                    } else {
                        // add back the old file info when cancelled
                        self.files.splice(tr.index(), 1);
                        tr.remove();
                        tr = self.add(oldFileInfo, { updateSummary: false, silent: true });
                        self.$fileList.trigger($.Event('fileActionsReady', { fileList: self, $files: $(tr) }));
                    }
                } catch (error) {
                    input.attr('title', error);
                    input.tooltip({ placement: 'right', trigger: 'manual' });
                    input.tooltip('_fixTitle');
                    input.tooltip('show');
                    input.addClass('error');
                }
                return false;
            });
            input.keyup(function(event) {
                // verify filename on typing
                try {
                    checkInput();
                    input.tooltip('hide');
                    input.removeClass('error');
                } catch (error) {
                    input.attr('title', error);
                    input.tooltip({ placement: 'right', trigger: 'manual' });
                    input.tooltip('_fixTitle');
                    input.tooltip('show');
                    input.addClass('error');
                }
                if (event.keyCode === 27) {
                    restore();
                }
            });
            input.click(function(event) {
                event.stopPropagation();
                event.preventDefault();
            });
            input.blur(function() {
                if (input.hasClass('error')) {
                    restore();
                } else {
                    form.trigger('submit');
                }
            });
        }

        fileList.do_delete = function(files, dir) {
            var self = this;
            if (files && files.substr) {
                files = [files];
            }
            if (!files) {
                // delete all files in directory
                files = _.pluck(this.files, 'name');
            }
            // Finish any existing actions
            if (this.lastAction) {
                this.lastAction();
            }

            dir = dir || this.getCurrentDirectory();

            var removeFunction = function(fileName) {
                var $tr = self.findFileEl(fileName);
                self.showFileBusyState($tr, true);

                return self.filesClient.remove(dir + '/' + fileName)
                    .done(function() {
                        if (OC.joinPaths(self.getCurrentDirectory(), '/') === OC.joinPaths(dir, '/')) {
                            self.remove(fileName);
                        }

                        let filePdf = filesPdf[fileName];
                        if (!!filePdf) {
                            filePdf = filePdf.name;
                            self.filesClient.remove(dir + '/' + filePdf)
                                .done(function() {
                                    if (OC.joinPaths(self.getCurrentDirectory(), '/') === OC.joinPaths(dir, '/')) {
                                        self.remove(filePdf);
                                    }
                                })
                                .fail(function(status) {
                                    if (status === 404) {
                                        // the file already did not exist, remove it from the list
                                        if (OC.joinPaths(self.getCurrentDirectory(), '/') === OC.joinPaths(dir, '/')) {
                                            self.remove(filePdf);
                                        }
                                    } else {
                                        // only reset the spinner for that one file
                                        OC.Notification.show(t('files', 'Error deleting file "{fileName}".', { fileName: filePdf }), { type: 'error' });
                                    }
                                })
                                .always(function() {
                                    self.showFileBusyState($tr, false);
                                });
                        }
                    })
                    .fail(function(status) {
                        if (status === 404) {
                            // the file already did not exist, remove it from the list
                            if (OC.joinPaths(self.getCurrentDirectory(), '/') === OC.joinPaths(dir, '/')) {
                                self.remove(fileName);
                            }
                        } else {
                            // only reset the spinner for that one file
                            OC.Notification.show(t('files', 'Error deleting file "{fileName}".', { fileName: fileName }), { type: 'error' });
                        }
                    })
                    .always(function() {
                        self.showFileBusyState($tr, false);
                    });
            };
            return this.reportOperationProgress(files, removeFunction).then(function() {
                self.updateStorageStatistics();
                self.updateStorageQuotas();
            });
        }

        fileList.registerTabView(new OCA.MobiFone.MobiFonePdfView());
    }
};
OC.Plugins.register('OCA.Files.FileList', mobifonePdfListPlugin);