# Objetivo:
construir uma página web com html e css separado

1. Página principal
  - menu com links: blog com posts, menu de pesquisa para retornar algum post com a palavra chave em uma dropdow de sugestões e levar o usuario ate aqule posts, esta caixa de pesquisa deve ficar no canto direito, links como categorias para cada uma deve levar para a pagina da categoria escolhida onde estarãos as capacitações dela, no menu vai ser uma dropdown mesmo pagina home, e a pagina de agradecimentos
  - seção com Carrossel de imagens em /assets/banners devem cobrir toda a tela para desktop e para dispositivos moveis 50% de altura
  - seção com categorias de trilhas: Programação Web, Infraestrutura e Devops, Desenvolvimento Backend, Ia e Analise de dados
  - em cada categoria tem que ter um card que vira e aparece o verso com a descrição e botão para a página
  - deixar responsivo para celular 1:1 e desktop 2:2  a imagem ocupar tofo card, ter uma sombra e hover na animação que aumente a sombra
  - seção footer da pagina com copyright centralido e icone do github e linkedin

# Stack
- html
- css
- js
- bootstrap

# Regras

- o css deve ser respeitado e definido em um main.css definido em /assets/css para todas as paginas
- neste css de main.css deve ter a paleta de cores que esta em README.md e ai usar variaveis
- usar o reset css
- todas as paginas ter o menu e footer, só na home é pra ter o carrossel
- pode fazer arquivos se eu especificar ai coloque no link este redirecionamento


# estrutura geral das paginas para ficar organizado e criar as rotas

- index.html (home)
    - trilhas/
        devops-infra.html/
            index.html
            -capacitacoes/
                git.html
        programacao-web.html
            index.html
            -capacitacoes/
                fundamentos.html
        desenvolvimento-backend.html
            index.html
            -capacitacoes/
                fundamentos.html
        ia-analise.html
            index.html
            -capacitacoes/
                fundamentos.html
