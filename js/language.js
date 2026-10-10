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

var LanguageJS = new LanguageJS([
      "menuabout", "menuskills", "menuexp", "menuedu1", "menuedu2", "menuawards", "menuevents", "menuinterests", "menuservice",
      "profile",
      "skillslangtools", "skillsworkflow", "skillswf1", "skillswf2", "skillswf3",
      "skillsti", "skillsti1", "skillsti2", "skillsti3",
      "skillslg", "skillslges", "skillslgpt", "skillslgen", "skillslgfr",
      "expwebdev", "expwebdevplace", "expwebdevtext", "expwebdevyears", "expwebdesign", "expwebdesignplace", "expwebdesigntext","expwebdesignyears", "expti", "exptiplace", "exptitext", "exptiyears",
      "portfoliosubtitle", "portfolioobimtype", "portfolioobimtext", "portfoliospiralxtype", "portfoliospiralxtext", "portfoliofavintype", "portfoliofavintext", "portfoliotcctype", "portfoliotcctext",
      "edu1tecnologo", "edu1tecnologodesc", "edu1tecnico", "edu1tecnicodesc", "edu1emt", "edu1emtdesc", "edu1ifsul", "edu1utu",
      "edu2bit", "edu2cuti", "edu2bityears", "edu2ppi", "edu2ppiyears", "edu2itrn", "edu2testing", "edu2testingyears", "edu2jap", "edu2pf", "edu2pfyears", "edu2cbf", "edu2cbfyears", "edu2cle",
      "eventEcosistema", "eventEcosistemaRole", "eventGamemakers", "eventGamemakersRole", "eventDemoday", "eventDemodayRole", "eventCai", "eventCaiRole", "eventFebitec", "eventFebitecRole", "eventFebitec2", "eventFebitecRole2",
      "interestsp1", "interestsp2", "eventINJU", "eventINJURol",
      "modalServiceTitle"
    ]);