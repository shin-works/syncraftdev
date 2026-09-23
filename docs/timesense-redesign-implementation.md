# TimeSense LP リニューアル実装メモ

2026-09-23。承認済みの計画とレビューに基づく実装。

## 変更内容

- 日本語と既存8言語のLPに、Lagoonの背景・オフセット・紫のボタンを基準にした共通デザインを適用。
- 日本語・欧文はZen Maru Gothic。韓国語・繁体字・簡体字は各言語用のNoto Sans。
- ヒーローは残り時間をピンクの色面で見せるタイマーが主役。小さなアナログ時計とLumaの吹き出しを併置。タップ・Enter・Spaceで30→15→5分と表示が変わり、色面と吹き出しが連動する。アプリの描画比率・Lagoon配色を参考にしたSVGで、実際のスクリーンショットや動作中のカウントダウンではない。自動再生・自動発声なし。動きを減らす設定に対応。
- 特徴紹介は1つの特徴を1枚のカードに統合。見出し→画像→白い内側の説明面の順で、PCでは同じ階層の3枚を横並びにする。活用シーンは枠のない構成、FAQは罫線と小さな操作部品に整理。
- 音声試聴はキャラクター別の再生・停止ボタン。同時再生を抑止し、再生状態とエラーを文字でも表示。
- FAQはネイティブのdetails/summary。JavaScriptなしでも本文と開閉機能を利用可能。音声もJavaScriptなしでは標準のプレーヤーを表示。
- 画像に実寸を指定し、下部画像を遅延読み込み。キャラクターはアプリ資産から透過WebPへ最適化。
- 既存Meta Pixelは本番ホストでのみ動作させ、ローカルプレビューでは送信しない。
- 特徴・試聴・開発者メッセージのカードは共通の外側24px／内側14px／オフセット8pxを使用。スマートフォンは20px／12px／6px。画像だけの台紙は廃止し、内容のまとまりにカードを使う。ヒーロー下・声かけ紹介・ダウンロード案内に緩い波形を追加。
- Light/Dark紹介を6色のテーマ紹介に変更。アプリの `assets/images/onboarding/theme_preview_*.jpg` を384px幅のWebPへ最適化。Default / Lagoon / Terracotta / Sunny / Night / Forestを掲載。
- 無料のLuma / Pico / Milo / Totoを元の丸アイコンで一覧表示。無料の試聴例は既存のLuma / Picoの2つであることを明記。プレミアムは宿題のMilo・おやすみのTotoをシーン別アイコンで紹介。
- 無料・プレミアムは共通の「見出しと説明→丸アイコンの横並び→2枚の試聴カード」を使用し、上下に配置。スマートフォンでは両方の試聴カードを同じように1列にする。アイコンの重複掲載はしない。
- 添付された実機画面に合わせ、ヒーローのタイマーは色面の外径を文字盤半径の約94%、中央円を約45%に修正。中央は30:00／15:00／05:00で切り替える。アナログ時計は維持。
- 最終レビューに合わせ、ヒーローの操作案内は全言語で矢印＋「Tap」に簡略化。支援技術向けの操作名は各言語で保持。
- フッターは公開中のsyncraft.devと同じ `/syncraft_logo_yoko_new.png` を使用。

## 維持する内容

メインコピー、サブコピー、H1、FAQ回答、title、meta description、OGPのメタ情報、canonical、hreflang、ストアへのURL、音声ソースは変更前の保存値と照合する。既存見出し・本文も保持し、例外は修正依頼のあったテーマ紹介の新見出し、無料／プレミアム音声紹介の各見出し・説明文のみ。保存値はこの範囲に限定して更新した。

特徴紹介の画面画像は既存LPの素材を引き継ぎ、テーマ紹介は指定されたアプリのオンボーディング画像に更新した。最新の実機画面への撮り直しや料金の原稿改訂は含めていない。韓国語など既存ページに残る英語表記も、原稿保持の方針に従っている。

ドイツ語の声かけ画像とポルトガル語のGoogle Playバッジにあった既存のリンク切れは、対応する既存英語素材への参照に修正した。

## 編集箇所

- HTML: `public/timesense/index.html` と各言語フォルダーの `index.html`
- 共通スタイル: `public/timesense/assets/redesign/site.css`
- 共通動作: `public/timesense/assets/redesign/site.js`
- 図版・キャラクター: `public/timesense/assets/redesign/`
- 回帰確認: `scripts/check-timesense-pages.py`
- 保持すべき原稿・メタ情報の保存値: `scripts/fixtures/timesense-preserved-copy.json`

ルート直下の `timesense/` は編集対象にしない。公開元は `public/timesense/`。

旧 `generate-timesense-ptbr.mjs` / `generate-timesense-zh.mjs` は旧HTMLの文字列置換を前提にしている。新デザイン検出時に書き込み前に停止するガードを追加した。今後の文章編集は各言語HTMLへ直接行い、デザイン変更は共通CSS/JSへ集約する。保存値の更新は、原稿変更が明示的に承認された場合のみ行う。

## 確認方法と実施結果

```sh
python3 scripts/check-timesense-pages.py
node --check public/timesense/assets/redesign/site.js
npm run build -- --outDir /tmp/timesense-redesign-build
npm run preview -- --outDir /tmp/timesense-redesign-build --host 127.0.0.1 --port 4323
```

- 9言語のコピー・メタ情報・FAQ・音声ソース・ストアURL・アンカー・ローカル素材の検証が成功。
- 公開用ビルドが成功。作業中の `dist/` を上書きしないよう別ディレクトリーに出力。
- ブラウザーで9言語×320 / 768 / 1280pxの横はみ出しとH1数を確認。
- 日本語・英語のスマホ表示、日本語のPC表示を目視確認。
- 日本語の音声再生、別キャラへの切り替え、FAQのクリック・Enterでの開閉、公開用URLでの言語切り替えを確認。
- フィードバック反映後も9言語×320 / 768 / 1280pxの横はみ出しなし。タイマーのクリック・Enter・Spaceによる3段階切り替え、無料→プレミアムの音声切り替えと停止を確認。ブラウザーのエラーログなし。
- iOS Safari・Android実機での確認と、Lighthouseや実利用データによる性能計測は未実施。

公開はユーザー承認済み。mainへのpushを起点に、既存のGitHub Pagesワークフローでビルド・公開する。法務ページは変更しない。ローカルの生成物や別作業の変更はコミットに含めない。
