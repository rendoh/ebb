# Ebb frontend

Vite + React

## TODO

- [x] @vanilla-extract/css
- [x] @vanilla-extract/recipes (Stitches ライクなやつ)
  - [ ] もう少し色々書いてみる、Sprinkles API も少し試す
- [x] NestJS の class-validator ベースのバリデータを使えるか検証
  - 使えるけどきついので DTO の型だけつかう方がよさそう
    - @nest/swagger がくっついてくるとかがあってどこかを妥協しないといけない
    - react-hook-form の resolver はある
    - class-validator サイズデカい
- [x] NestJS + OpenAPI generator で生成したクライアントでどこまで耐えるか
  - 使い物にならないとまでは言わないが使いづらい
  - たぶん `allOf` 関連で型がつかない箇所がある
- [ ] TanStack 試す
  - [ ] React Query 久々に使ってみる
  - [ ] React Location 使ってみる（React Router v6 と比較してどうか）
- [ ] Firebase UI 外す
