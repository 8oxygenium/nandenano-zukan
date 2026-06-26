/* ---------------------------------------------------------
   なんでなの？図鑑 共通スクリプト（最小限）
   - モバイルメニューの開閉
   - トップページの記事しぼりこみ（検索窓風UI）
   - 「上へ戻る」ボタン
   外部ライブラリは使いません。
   --------------------------------------------------------- */
(function () {
  "use strict";

  /* ---- モバイルメニュー ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    });
    // メニュー内リンクを押したら閉じる
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "メニューを開く");
      }
    });
  }

  /* ---- 記事しぼりこみ（トップのみ） ---- */
  var searchInput = document.getElementById("why-search");
  if (searchInput) {
    var items = Array.prototype.slice.call(
      document.querySelectorAll("[data-search-item]")
    );
    var noResult = document.getElementById("search-no-result");

    var normalize = function (s) {
      return (s || "").toLowerCase().replace(/\s+/g, "");
    };

    searchInput.addEventListener("input", function () {
      var q = normalize(searchInput.value);
      var hit = 0;
      items.forEach(function (el) {
        var hay = normalize(el.getAttribute("data-keywords") + el.textContent);
        var show = q === "" || hay.indexOf(q) !== -1;
        el.style.display = show ? "" : "none";
        if (show) hit++;
      });
      if (noResult) {
        noResult.style.display = hit === 0 ? "block" : "none";
      }
    });
  }

  /* ---- 上へ戻る ---- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    var onScroll = function () {
      if (window.scrollY > 500) {
        toTop.classList.add("is-visible");
      } else {
        toTop.classList.remove("is-visible");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
