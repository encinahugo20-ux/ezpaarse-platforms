use strict';
const Parser = require('../.lib/parser.js');

/**
 * Recognizes the accesses to the platform ENAC Recursos Digitales
 * @param  {Object} parsedUrl an object representing the URL to analyze
 * main attributes: pathname, query, hostname
 * @param  {Object} ec        an object representing the EC whose URL is being analyzed
 * @return {Object} the result
 */
module.exports = new Parser(function analyseEC(parsedUrl, ec) {
  let result = {};
  let path = parsedUrl.pathname;

  let match;

  // Acceso a un libro electrónico (ebook)
  // Ejemplo: https://recursosdigitales.enac.cl:443/ebook/504-1-Life_students_book_elemtary_slipt_A/...
  if ((match = /^\/ebook\/(?<book_id>[^/]+)\/(?<chapter_id>.*)$/i.exec(path)) !== null) {
    result.rtype = 'BOOK'; // O 'BOOK' si prefieres agrupar por libro completo
    result.mime = 'HTML';
    result.title_id = match.groups.book_id;
    //result.unitid = match.groups.chapter_id;

  } 
  // Acceso a la página principal
  // Ejemplo: https://recursosdigitales.enac.cl:443/index.php
  else if ((match = /^\/index\.php$/i.exec(path)) !== null) {
    result.rtype = 'HOMEPAGE'; // Un tipo de recurso para páginas principales
    result.mime = 'HTML';
    result.unitid = 'homepage'; // Identificador único para la página principal
  }

  // Agrega más reglas aquí si la plataforma de ENAC tiene otros tipos de recursos (ej. revistas, artículos)
  // else if ((match = /^\/articulo\/(?<article_id>[^/]+)/i.exec(path)) !== null) {
  //   result.rtype = 'ARTICLE';
  //   result.mime = 'HTML';
  //   result.title_id = match.groups.article_id;
  //   result.unitid = match.groups.article_id;
  // } 

  return result;
});

