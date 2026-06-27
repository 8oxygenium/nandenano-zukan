# CLAUDE.md — なんでなの？図鑑

このファイルは、Claude Code がこのリポジトリで作業するときの指針です。
**作業前に必ず読むこと。** 迷ったら「やらないこと」を優先する。

---

## このプロジェクトは何か

- 小学生（3〜6年生）向けの教育辞典サイト「なんでなの？図鑑」。
- 「なぜ？」に 1ページ1問で、短く・正しく・おもしろく答える。
- 読者：子ども本人 → 保護者 → 先生 → 検索ユーザー。

## 技術スタック（厳守）

- 静的HTML + Vanilla CSS + 最小JavaScript のみ。
- **Astro を使わない / npm install しない / package.json を作らない / ビルド工程を作らない。**
- Cloudflare Pages の「ビルドなし配信」前提（output: `/`）。
- 内部リンク・アセットは **ルート相対パス**（`/why/...`, `/assets/...`）。

## やってはいけないこと

- `kikaku-note.com` の既存リポジトリを触る。
- `takaosugiyama.com` / `kanen0naruki.com` と混ぜる・相互リンクする。
- NAS 上で直接 Git 作業する。
- 勝手にドメインを「取得確定」した前提で書く（URLは `nandenano.kikaku-note.com` を仮の本番URLとして使用。変更時は一括置換）。
- 存在しない GA4 ID / AdSense ID / 仮ID（`dummy` `sample` `YOUR_` `仮`）を残す。
- 出典URLを捏造する。画像素材を無断流用する。
- 子どもの個人情報・顔写真を扱う。コメント欄・ログイン・投稿フォームを作る。
- 医療・法律・安全の断定。不安を煽るしつけ表現。

## ファイル規約

- 1記事 = `why/{slug}/index.html`、1カテゴリ = `categories/{slug}/index.html`。
- 共通CSSは `assets/css/style.css` の1本。JSは `assets/js/main.js` のみ。
- ヘッダー / フッター / パンくずは各HTMLに手書きで揃える（テンプレートエンジンなし）。
  変更時は全ページに同じ修正を反映する。大量置換の前は必ず `git diff` を確認。

## 記事の本文構成（順番を守る）

1. まず答え（`.answer-box`）— 1〜3文で結論
2. たとえば
3. もう少し詳しく
4. やってみよう（家・学校で安全にできること）
5. おうちの人・先生へ（`.parent-note`）
6. まとめ（3行以内）
7. ミニクイズ（`.quiz-box` / `<details>` で答え）
8. 参考にした情報（`.sources`）+ 免責（`.disclaimer`）
9. 関連するなぜ（`.related`）

各記事の `<head>` に必須：`title` / `description` / `canonical` / OGP / JSON-LD（BreadcrumbList・Article）。

## 表現ルール

- です・ます調。1文は短め。漢字は必要に応じてひらがな補足。
- NG：「常識です」「絶対に」「必ず」「できない子」「頭が悪い」「医学的に証明されています」など。
- OK：「理由があります」「安全のためです」「こう考えるとわかりやすいです」。
- 分野で定義が割れるものは「だいたいの目安」と明記する。

## 呼び出し順（チーム作業の目安）

```txt
web-designer → web-coder → proofreader → debugger
```

- proofreader / debugger は原則ソースを直接書き換えない。修正適用は web-coder。

## コミット前チェック

- [ ] ローカルサーバー（Live Server 等）で表示確認
- [ ] `git diff` / `git status`
- [ ] `YOUR_` / `dummy` / `sample` / `仮` が残っていない
- [ ] マージ衝突マーカー（`<<<<<<<` `=======` `>>>>>>>`）が残っていない
- [ ] 内部リンク・OGP・canonical の確認
- [ ] 新規記事を sitemap.xml / トップの一覧 / カテゴリページに反映済み

## 公開前チェック

- [ ] Cloudflare Pages の向き先・独自ドメイン・SSL・`www` 方針
- [ ] GA4 / AdSense を実IDで設置（各 `<head>` 末尾のコメント箇所）
- [ ] about / contact / privacy の表示
- [ ] Search Console に sitemap 登録
