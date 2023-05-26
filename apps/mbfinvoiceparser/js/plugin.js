var dataXmlTemp = null;
var mobifoneFileListPlugin = {
    attach: function(fileList) {
        if (fileList.id === 'trashbin' || fileList.id === 'files.public') {
            return;
        }

        fileList.registerTabView(new OCA.MobiFone.MobiFoneTabView());
    }
};
OC.Plugins.register('OCA.Files.FileList', mobifoneFileListPlugin);