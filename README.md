# Pet Document Frontend

## Descrição
Este é o frontend do projeto Pet Document, desenvolvido com Angular.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Scripts Disponíveis
- `npm start`: Inicia o servidor de desenvolvimento.
- `npm run build`: Gera a build de produção.
- `npm run lint`: Verifica a qualidade do código.
- `npm run format`: Formata o código.
- `npm run test`: Executa os testes unitários.
- `npm run test:coverage`: Gera relatórios de cobertura de testes.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Contribuição
1. Faça um fork do repositório.
2. Crie uma branch para sua feature (`git checkout -b feature/nome-da-feature`).
3. Faça commit das suas alterações (`git commit -m "feat: descrição da feature"`).
4. Envie para o repositório remoto (`git push origin feature/nome-da-feature`).
5. Abra um Pull Request.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## PASSO A PASSO DE COMMIT

antes de commitar você fazer os seguintes comandos

`ng lint` - assegura que o codigo está deacordo com os padrões

`npm run build` - assegura que o codigo está compilando e que não há nenhum erro que impessa do sistema rodar

após isso você deve rodar os seguinte comando

`git add .` -adicionará todas as alterações realizadas no commit

`npm run commit` - realizará uma serie de perguntas para a documentação das alterações no commit

## QUANDO TIVER ALTERAÇÕES SUFICIENTES

`npm run release` irá alterar o changelog com base nos commits e alterará o changelog com as alterações feitas
