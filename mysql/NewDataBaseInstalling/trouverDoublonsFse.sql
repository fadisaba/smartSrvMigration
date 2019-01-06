SELECT   COUNT(*) AS nbr_doublon, "invoiceHasFseNumber"
FROM     invoice_has_fse
GROUP BY "invoiceHasFseNumber"
HAVING   COUNT(*) > 1;


/** doublon rsp**/
SELECT   COUNT(*) AS nbr_doublon, "rspFileName","rspNumeroFacturation","rspNoemieFileName"
FROM     rsp
GROUP BY ("rspFileName","rspNumeroFacturation","rspNoemieFileName")
HAVING   COUNT(*) > 1;


/** doublon study visit **/
SELECT   COUNT(*) AS nbr_doublon, "studyVisitPacsId"
FROM     study_visit
where "deletedAt" is null
GROUP BY "studyVisitPacsId"
HAVING   COUNT(*) > 1 ;



/** doublon visit accession number **/
SELECT   COUNT(*) AS nbr_doublon, "visitPacsId"
FROM     visit
GROUP BY "visitPacsId"
HAVING   COUNT(*) > 1;