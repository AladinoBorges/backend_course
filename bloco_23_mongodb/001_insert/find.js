// use database_name;
// db.colletion_name.find(query, projection);

/*
    base
    ! query (opcional):
        * tipo: documento;
        * descrição: especifica os filtros da seleção que usam os query operators. Para retornar todos os documentos da coleção, só é necessário omitir esse parâmetro ou passar um documento vazio ({}).
        
    ! projection (opcional):
        * tipo: documento;
        * descrição: especifica quais os atributos que serão retornados nos documentos selecionados pelo parâmetro query. Para retornar todos os atributos desses documentos, basta omitir este parâmetro.
*/
db.aulas.find({ nome: "aula_1" });
