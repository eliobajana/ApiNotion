const dotenv = require('dotenv').config()
const { Client } = require('@notionhq/client')

//Init Client
const notion = new Client({
    auth: process.env.NOTION_TOKEN
})

const database_id = process.env.NOTION_DATABASE_ID

module.exports = async function getDatos() {
    const payload = {
        path: `databases/${database_id}/query`,
        method: 'POST',
        
          
    }

    const { results } = await notion.request(payload)
    
    //Muestra todo el response
    //console.log(results);
     

    //Mostrar toda la pagina
    const Informacion = results.map((page) => {
        
        if(page.properties.Traspaso.rich_text[0].plain_text == 'No Copiado'){
            console.log(page.properties.Numero.number)
            console.log(page.properties.Letras.title)
            console.log(page.properties.Traspaso.rich_text)
        }

        return{
                
                Numero: page.properties.Numero.number,
                Letras: page.properties.Letras.title[0].text.content,
                Traspaso: page.properties.Traspaso.rich_text[0].plain_text  


            //Marca: page.properties.Marca.rich_text[0].text.content,
            /*Pais: page.properties.Pais.rich_text[0].text.content,
            Cliente: page.properties.Cliente.rich_text[0].text.content,
            Modelo: page.properties.Modelo.rich_text[0].text.content,
            Color: page.properties.Color.rich_text[0].text.content*/

        }
    })

    return Informacion
}