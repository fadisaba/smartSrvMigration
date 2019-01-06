class SiteReq{
    constructor()
    {

    }
    saveSiteAndSiteConfig(_siteArray,_siteConfigArray)
    {
       let dbUtility = global.App.DbUtility;
        let sitesObj=dbUtility.getToDeleteToAddToModifyData(_siteArray);
        let sitesConfigObj=dbUtility.getToDeleteToAddToModifyData(_siteConfigArray);

        return dbUtility.saveData(sitesObj.dataToAddArr,
            sitesObj.dataToUpdateArr,sitesObj.dataToDeleteArr,
            "SITE","siteId")
            .then(_resultSite=>{
                return dbUtility.saveData(sitesConfigObj.dataToAddArr,
                    sitesConfigObj.dataToUpdateArr,sitesConfigObj.dataToDeleteArr,
                    "SITE_CONFIG","siteConfigId")
            })
    }
}
module.exports=SiteReq;