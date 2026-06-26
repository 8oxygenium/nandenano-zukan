# なんでなの？図鑑

小学生がふと思う「なんで？」に、1ページ1問でやさしく答える **静的HTMLの教育辞典サイト** です。

- サイト名：なんでなの？図鑑
- 想定ドメイン：`https://nandenano-zukan.com/`（取得・接続前提。未確定の場合は後述の手順でURLを置換）
- 技術：静的HTML + 共通CSS + 最小JavaScript（ビルド工程なし）
- ホスティング：Cloudflare Pages（ビルドなし配信）

---

## 特徴・方針

- **ビルド不要**：HTML/CSS/JS をそのまま配信。npm / Node / package.json は使いません。
- **1記事 = 1ディレクトリ**：`why/{slug}/index.html`
- **共通CSSは1本**：`assets/css/style.css` に集約
- **JavaScriptは最小限**：モバイルメニュー・記事しぼりこみ・上へ戻るのみ（`assets/js/main.js`）
- **kikaku-note.com などの他サイトとは独立**（別ドメイン・別リポジトリ）

---

## ディレクトリ構成

```txt
nandenano-zukan/
├── index.html                  … トップ（検索風UI・カテゴリ・人気・なぜ一覧）
├── about/index.html            … このサイトについて（運営者情報）
├── contact/index.html          … お問い合わせ
├── privacy/index.html          … プライバシーポリシー
├── categories/
│   ├── index.html              … カテゴリ一覧
│   ├── ikimono/   …  いきもの
│   ├── karada/    …  からだ
│   ├── kotoba/    …  ことば
│   ├── kurashi/   …  くらし
│   ├── manner/    …  マナー
│   ├── benkyo/    …  勉強
│   ├── shizen/    …  自然
│   ├── tabemono/  …  食べもの（準備中）
│   ├── shikumi/   …  もののしくみ（準備中）
│   └── shakai/    …  社会
├── why/                        … 記事13本（各 {slug}/index.html）
│   ├── compound-eyes/          … 複眼ってなに？
│   ├── no-running-in-store/    … なんでお店で走っちゃダメなの？
│   ├── good-table-manners/     … 食べ方が汚いとなんでダメなの？
│   ├── why-study/              … 勉強しないといけないのはなんで？
│   ├── shuitsu/                … 秀逸ってどういう意味？
│   ├── why-rain/               … 雨はなんで降るの？
│   ├── why-sky-blue/           … 空はなんで青いの？
│   ├── why-bugs-light/         … 虫はなんで光に集まるの？
│   ├── why-sleep/              … なんで寝ないといけないの？
│   ├── why-brush-teeth/        … なんで歯をみがくの？
│   ├── why-rules/              … ルールはなんであるの？
│   ├── why-friends-fight/      … 友だちとケンカするのはなんで？
│   └── water-forms-difference/ … 池・沼・湖・海・川・水たまりって何が違うの？
├── assets/
│   ├── css/style.css
│   ├── js/main.js
│   └── img/
│       ├── favicon.svg
│       └── ogp-default.png     … OGP用 1200×630
├── robots.txt
├── sitemap.xml
├── README.md
└── CLAUDE.md
```

---

## ローカルでの確認

ビルドは不要です。静的ファイルを配信できれば確認できます。

- VS Code の **Live Server** 拡張で `index.html` を開く、または
- 任意の静的サーバーでプロジェクト直下を配信する

> 内部リンクと CSS/JS はすべて **ルート相対パス**（`/assets/...`、`/why/...`）です。
> `file://` で直接開くとパスが解決されません。**必ずローカルサーバー経由**で確認してください。

---

## 記事の増やし方

1. `why/{新しいslug}/index.html` を作成する（既存記事をコピーするのが速い）。
2. ページ内の以下を新しい記事に合わせて書き換える。
   - `<title>` / `<meta name="description">`
   - `<link rel="canonical">` と OGP の `og:url`（`/why/{slug}/`）
   - JSON-LD（BreadcrumbList / Article）の `name`・`headline`・URL・日付
   - パンくず、`<h1>`、カテゴリタグ、本文、ミニクイズ、関連するなぜ
3. 本文は次の見出し構成にそろえる：
   **まず答え → たとえば → もう少し詳しく → やってみよう → おうちの人・先生へ → まとめ → ミニクイズ → 参考にした情報**
4. トップ（`index.html`）の「なぜ一覧」と、該当カテゴリページにカードを追加する。
5. `sitemap.xml` に `<url>` を追加する。

### 表現・事実確認のルール（重要）

- です・ます調。1文は短く。むずかしい言葉はすぐ言いかえる。
- 子どもを責めない。「ダメ」で終わらせず理由を書く。
- 「絶対」「必ず」「医学的に証明」などの根拠なき断定をしない。
- **出典URLを捏造しない**。URLを載せるのは実在確認済みのものだけ。
- 分野で定義が割れるものは「だいたいの目安」として書く。
- 医療・法律・安全の個別判断は専門家・公的機関へ案内する。

---

## デプロイ（Cloudflare Pages）

| 項目 | 値 |
|---|---|
| Framework preset | None |
| Build command | （なし） |
| Build output directory | `/` |
| Production branch | `main` |

`main` に push すると Cloudflare Pages が自動で配信します。ビルド工程はありません。

### 公開前チェック

- [ ] 独自ドメイン接続・SSL・`www` 方針の確認
- [ ] アクセス解析（GA4）/ 広告（AdSense）タグを **実IDで** 設置（各 `<head>` 末尾のコメント箇所）
- [ ] `about` の運営者情報・`contact`・`privacy` の表示確認
- [ ] Search Console に `sitemap.xml` を登録
- [ ] OGP・canonical の最終確認

> ドメインを変更する場合は、全 `*.html` と `sitemap.xml` / `robots.txt` 内の
> `https://nandenano-zukan.com` を新URLへ一括置換してください（置換前に `git diff` を確認）。

---

## 運営者

- 運営者：HANSODE
- お問い合わせ：copilaproz@gmail.com

© 2026 なんでなの？図鑑（HANSODE）
