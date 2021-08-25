/*
    Ao executar o método find() , o MongoDB Shell itera automaticamente o cursor para exibir os 20 primeiros documentos. Digite it para continuar a iteração. Assim, mais 20 documentos serão exibidos até o final do cursor.

    Um método bastante interessante que é utilizado num cursor é o count() . O método count() retorna o número de documentos de uma coleção, e também pode receber um critério de seleção para retornar apenas o número de documentos que atendam a esse critério.
    
    Você pode retornar o número de documentos de uma coleção com a seguinte operação:
    * db.collection_name.count();
*/
db.aulas.count();
