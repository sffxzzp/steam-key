# Steam Licenses

基于云激活项目修改而来的，在云端跨区添加 Steam 免费游戏。

forked from https://github.com/makazeu/steam-key

## Docker 使用方法

拉取：

```
docker pull sffxzzp/steam-key:latest
docker pull ghcr.io/sffxzzp/steam-key:latest
```

运行示例：

```
docker run -it --name steamkey -p 80:80 -e STKEY_ID=1 -e STKEY_NAME=US -e STKEY_SERVER_BY=abc --rm sffxzzp/steamkey:latest
```
