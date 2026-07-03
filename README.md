Docusaurus fornece um conjunto de scripts para ajudá-lo a gerar, servir e implantar seu site.

Assim que seu site for inicializado, a fonte do site conterá os scripts Docusaurus que você pode invocar com seu gerenciador de pacotes:

> package.json
```json
{
  // ...
  "scripts": {
    "docusaurus": "docusaurus",
    "start": "docusaurus start",
    "build": "docusaurus build",
    "swizzle": "docusaurus swizzle",
    "deploy": "docusaurus deploy",
    "clear": "docusaurus clear",
    "serve": "docusaurus serve",
    "write-translations": "docusaurus write-translations",
    "write-heading-ids": "docusaurus write-heading-ids"
  }
}
```

## Comandos do Docusaurus CLI

Abaixo está uma lista dos comandos do Docusaurus CLI e seus usos:
docusaurus start [siteDir]

Nome	Padrão	Descrição

--port	3000	Especifica a porta do servidor de desenvolvimento.

--host	localhost	Especifique um host a ser usado. For example, if you want your server to be accessible externally, you can use --host 0.0.0.0.

--locale	Specify site locale to be used.

--hot-only	false	Enables Hot Module Replacement without page refresh as a fallback in case of build failures. More information here.

--no-open	false	Do not open the page automatically in the browser.

--config	undefined	Path to Docusaurus config file, default to [siteDir]/docusaurus.config.js

--poll [optionalIntervalMs]	false	Use a pesquisa de arquivos em vez de observar a recarga ao vivo como uma alternativa em ambientes onde a vigilância não funciona. More information here.

--no-minify	false	Crie um site sem minimizar os pacotes JS/CSS.

## Habilitando HTTPS

Existem várias maneiras de obter um certificado. We will use mkcert as an example.

    Run mkcert localhost to generate localhost.pem + localhost-key.pem

    Run mkcert -install to install the cert in your trust store, and restart your browser

    Inicie o aplicativo com variáveis de ambiente Docusaurus HTTPS:

HTTPS=true SSL_CRT_FILE=localhost.pem SSL_KEY_FILE=localhost-key.pem yarn start

    Open https://localhost:3000/

## temas

veja sobre uso de temas em:

[https://docusaurus.io/pt-BR/docs/api/themes/configuration](https://docusaurus.io/pt-BR/docs/api/themes/configuration)


## sitemap.xml

```bash
npm install --save @docusaurus/plugin-sitemap
```

## robots.txt