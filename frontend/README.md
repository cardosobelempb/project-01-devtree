## start

## react-hook-form
- npm install react-hook-form
- npm install @hookform/resolvers

## zod validation
- npm i zod

## requisições
- npm i axios

## wsl 2 comandos

## OBS: Para verificar a versão e build do seu windows excute o comando windows 10 versão 1903, build 18362
- winver
## Habilitar o recurso
- 01 opção
- recurso do windows
- [x] Subsistema do windows para linux
- 02 opção
- wsl --install

## intalação
- wsl --install -d Ubuntu-24.04
- Ele pode ser iniciado por meio de 'wsl.exe -d docker-desktop'

## removendo
- wsl --unregister Ubuntu

## listar
- wsl --list --running
- wsl --l
- wsl --list --verbose
- wsl --list --verbose --all
- wsl --list --online

## difiniçõa / alteração
- wsl --set-default-version 2/1
- wsl --set-version Ubuntu-24.04 2/1
- wsl --set-default Ubuntu-24.04

## status / atualização
- wsl --status
- wsl --update

## executando distribuição
- Start WSL
- wsl --distribution Ubuntu-24.04 --user surb
- wsl --distribution Ubuntu-24.04

## exportação / importação
- wsl --export Ubuntu-24.04 "F:\Ubuntu-24.tar"
- wsl --import Ubuntu-24.04 "C:" "F:\Ubuntu-24.tar"

## sair
- exit
- wsl --terminate Ubuntu-24.04
- wsl --shutdown

## reiniciar
- wsl --shutdown

## nvm / nodejs
- sudo apt-get install curl
- curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
- nvm -v
- nvm ls-remote
- nvm install 22.14.0
- node -v
- npm -v
- explorer.exe .
- sudo apt update
- sudo apt upgrade -y
