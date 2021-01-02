function LanguageJS(itemsToTranslate) {
    this.addLanguageFile = function(){
        var languageFile = document.getElementById('languageFile');
        (languageFile != null) ? languageFile.parentNode.removeChild(languageFile):"";
        languageFile = document.createElement('script');
        languageFile.src = "js/translation/lang-" + this.languageID + ".js";
        languageFile.id = "languageFile";
        document.getElementsByTagName('body')[0].appendChild(languageFile);
    }

    this.translate = function(languageID) {
        this.languageID = new String(languageID);
        this.addLanguageFile();
        var languageFile = document.getElementById('languageFile');
        languageFile.onload = function(){
            for (var i in itemsToTranslate) {
                var elementToTranslate = document.getElementsByClassName('lang__' + itemsToTranslate[i]);
                for (var o in elementToTranslate) {
                    elementToTranslate[o].innerHTML = localization[itemsToTranslate[i]];
                }
            }
        }
    }
}