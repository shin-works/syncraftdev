# TimeSense 繁体字・簡体字ローカライズ計画

更新日: 2026-05-16

## 目的

TimeSense の既存ローカライズ運用 (`ja`, `en`, `de`, `fr`, `es`, `ko`) に合わせて、以下の中国語ページを追加する。

- LP 本体
- 利用規約
- プライバシーポリシー

対象候補:

- 繁体字: `zh-Hant`
- 簡体字: `zh-Hans`

## 現状整理

### 配置

TimeSense は Astro の `src/pages` ではなく、静的 HTML を `public/timesense/` 配下に直接置く構成。

既存ページ:

- LP: `/timesense/`, `/timesense/en/`, `/timesense/de/`, `/timesense/fr/`, `/timesense/es/`, `/timesense/ko/`
- 規約: `/timesense/<lang>/terms/`
- Privacy: `/timesense/<lang>/privacy/`

実ファイル例:

- [public/timesense/en/index.html](/Users/user/dev/syncraftdev/public/timesense/en/index.html)
- [public/timesense/en/terms/index.html](/Users/user/dev/syncraftdev/public/timesense/en/terms/index.html)
- [public/timesense/en/privacy/index.html](/Users/user/dev/syncraftdev/public/timesense/en/privacy/index.html)

### 既存ローカライズの特徴

- `en` `es` `de` `ko` はほぼ同じ LP 構造
- `fr` は行数が少なく、別系統で編集されている
- 法務ページは各言語ごとに独立 HTML
- 言語切替は `select` の直書き
- `hreflang` も各ページに直書き
- 音声サンプルは言語ごとに独自 MP3 を持つケースと、英語音声を流用しているケースがある
- 追加音声パックの配布定義は [public/timesense/voices/manifest.json](/Users/user/dev/syncraftdev/public/timesense/voices/manifest.json)

## 今回の追加対象

### 推奨 URL

ユーザー要望が「繁体字」「簡体字」なので、国別ではなく字体別 URL を推奨する。

- 繁体字 LP: `/timesense/zh-hant/`
- 繁体字 Terms: `/timesense/zh-hant/terms/`
- 繁体字 Privacy: `/timesense/zh-hant/privacy/`
- 簡体字 LP: `/timesense/zh-hans/`
- 簡体字 Terms: `/timesense/zh-hans/terms/`
- 簡体字 Privacy: `/timesense/zh-hans/privacy/`

### 推奨 hreflang

- 繁体字: `zh-Hant`
- 簡体字: `zh-Hans`

補足:

- URL は小文字ディレクトリで運用しつつ、`hreflang` は正式表記にする
- 将来リージョン別に分ける場合は `zh-TW`, `zh-HK`, `zh-CN`, `zh-SG` に拡張可能

## 追加・更新が必要なもの

### 新規作成

- `public/timesense/zh-hant/index.html`
- `public/timesense/zh-hant/terms/index.html`
- `public/timesense/zh-hant/privacy/index.html`
- `public/timesense/zh-hans/index.html`
- `public/timesense/zh-hans/terms/index.html`
- `public/timesense/zh-hans/privacy/index.html`

### 既存ページの横展開修正

全言語の LP / Terms / Privacy に以下を追加。

- `hreflang="zh-Hant"`
- `hreflang="zh-Hans"`
- 言語切替 `select` の選択肢 2 件

対象は最低でも以下。

- 既存 LP 6ページ
- 既存 Terms 6ページ
- 既存 Privacy 6ページ
- 日本語 LP / Terms / Privacy

### 任意だが先にやる価値が高い改善

- LP / Terms / Privacy の共通部品をテンプレート化
- 言語切替候補を共通配列化
- `hreflang` をコピペ運用から脱却

## 実装上の論点

### 1. ベースにする言語

推奨:

- LP は `en` をベースに複製
- Terms / Privacy も `en` をベースに複製

理由:

- `en` は `de` `es` `ko` と同じ構造で、最も素直に量産しやすい
- `fr` は構造差分があり、今回の複製元には向かない

### 2. 音声サンプルをどうするか

現状、`ko` は韓国語 LP でも英語音声を参照している。

選択肢:

1. 初回公開では中国語 LP も英語音声を流用する
2. 中国語音声アセットを先に用意してから公開する
3. 音声サンプルセクションだけ中国語ページでは一時的に非表示にする

推奨:

1 を基本案にし、文言で「音声イメージ紹介」と割り切るか、
中国語音声提供の予定が近いなら 2 に寄せる。

理由:

- 既存運用に前例がある
- 実装速度が最も速い
- ただし、ユーザー期待とのズレは残る

### 3. 音声パック manifest を追加するか

現状 `voices/manifest.json` にあるのは `de`, `es`, `fr`, `ko` のみ。

確認事項:

- 中国語音声パックをアプリ内配信する予定があるか
- ある場合、繁体字と簡体字を分けるか

分ける場合の候補:

- `zh-hant`
- `zh-hans`

未定なら、LP 公開と manifest 追加は分離してよい。

### 4. ストアバッジ

既存は言語ごとに App Store / Google Play バッジを差し替えている。

確認事項:

- 繁体字向けに使うバッジ: 台湾/HK向け App Store 表記が必要か
- 簡体字向けに Google Play バッジを置くか

注意:

- 中国本土向けは Google Play が一般的ではないため、簡体字ページで Android 導線をどう見せるかは要判断

推奨:

- 初回は英語バッジ流用でも公開可能
- ただし簡体字ページの Android CTA は優先的に確認する

### 5. 法務翻訳の精度

Terms / Privacy は LP より誤訳リスクが高い。

必要条件:

- 既存英語版を基準文書にする
- 料金、定期購読、自動更新、広告、分析、データ保存、問い合わせ先の文言を重点確認
- 日付は既存と揃える
  - Effective Date: `April 1, 2025`
  - Last Updated: `May 7, 2026`

## 推奨実装フェーズ

### Phase 0: 方針確定

- URL を `zh-hant` / `zh-hans` にする
- 音声サンプルの扱いを決める
- ストアバッジ運用を決める
- 中国語音声パック公開有無を切り分ける

### Phase 1: 最小公開

- `zh-hant` LP / Terms / Privacy 作成
- `zh-hans` LP / Terms / Privacy 作成
- 全既存言語ページの `hreflang` と言語切替更新
- 目視 QA

### Phase 2: 体験品質の改善

- 中国語ネイティブ表現の見直し
- App Store / Google Play バッジの現地化
- OGP 文言最適化
- 必要なら中国語音声サンプル差し替え

### Phase 3: 保守性改善

- 直書き HTML のテンプレート化
- 共通メタ / `hreflang` / フッター導線の部品化
- 将来言語追加時のチェックリスト整備

## 作業 Breakdown

### LP

- `html lang` を中国語向けに設定
- `title`, `meta description`, OGP を翻訳
- `canonical` を各 URL に変更
- `alternate hreflang` を全言語入りに更新
- 言語切替 `select` に繁体字・簡体字を追加
- ヒーロー、課題提起、特徴、利用シーン、音声サンプル、DL セクション、開発者コメント、フッター法務導線を翻訳
- 必要に応じて改行位置と行長を調整

### Terms

- タイトル、見出し、本文、戻る導線を翻訳
- `hreflang` と言語切替を全言語入りに更新
- 日付維持
- `hello@syncraft.dev` など固有情報は不変

### Privacy

- タイトル、見出し、本文、戻る導線を翻訳
- `hreflang` と言語切替を全言語入りに更新
- iOS/Android 差分説明、AdMob/Firebase/Store 課金説明を重点確認

## QA チェックリスト

### SEO / ルーティング

- `/timesense/zh-hant/` が 200
- `/timesense/zh-hans/` が 200
- Terms / Privacy 各 200
- `canonical` が自己参照
- `hreflang` が相互に整合
- `x-default` は日本語トップ維持で問題ないか確認

### UI

- 言語切替で全言語へ遷移できる
- モバイルで中国語の行折返しが破綻しない
- ボタン、見出し、カードの高さ崩れがない
- フッターの Terms / Privacy リンクが正しい

### コンテンツ

- LP と法務ページで用語統一
- 繁体字と簡体字の混在がない
- ストアバッジ文言と遷移先が適切
- 音声サンプル説明と実音声の言語が矛盾しすぎない

## 既存ページで見えている注意点

### 既存運用のばらつき

- `fr` の LP 構造が他言語と揃っていない
- `ko` LP の一部文言と法務リンクは英語のまま
- `ko` 音声サンプルは英語 MP3 を参照
- `hreflang` がページによって `fr` を含んでいない箇所がある

今回の中国語追加時に、既存言語も一度まとめて横並び確認したほうが安全。

## 進め方の推奨

最短で進めるなら、以下の順がよい。

1. `en` ベースで `zh-hant` / `zh-hans` の 3ページずつを複製
2. 中国語本文を流し込み
3. 全既存ページの `hreflang` と言語切替だけ横展開修正
4. 中国語音声やバッジは必要に応じて第2弾で差し替え

## 実装前の確認事項

- URL は `zh-hant` / `zh-hans` でよいか
- 簡体字ページの Google Play 導線を出すか
- 音声サンプルは英語流用で先行公開してよいか
- 法務翻訳は機械翻訳ベースで進めた後にレビューするか、先にネイティブチェックを入れるか
