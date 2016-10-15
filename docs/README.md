# 設計
## タイトル
SMM (Sadist Masochis Matching)

## 概要

## 実装

### ファイル構成

### ハンドラ
名前をファイル名とする

| 名前 | タイプ | 呼び出されるとき | INPUT | OUTPUT | 備考 |
|:---|:---|:---|:----|:----|:----|
| greeting | send | 初回起動時 | - | S or Mのアンケート | - |
| register | webhook | SMアンケート取得時 | ユーザID, SM | データベース挿入, 登録完了と待機メッセージ | マッチング処理 |
| converation | webhook | 発言された時 | ID, 発言内容 | 相手IDにメッセージ画像 | 画像生成処理する |
