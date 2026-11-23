"use client";

// Baraa — shop: category filter, search, sort.
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS, categoryName, productName } from "@/lib/catalog";
import { useLanguage } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";

type Sort = "featured" | "price-low" | "price-high" | "name";

export function ShopClient() {
  const params = useSearchParams();
  const { lang, t } = useLanguage();
  const [category, setCategory] = useState<string>(params.get("category") ?? "all");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState<Sort>("featured");

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];
    if (category !== "all") list = list.filter((p) => p.categorySlug === category);
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameAr.includes(query.trim()) ||
          categoryName(p.categorySlug, "en").toLowerCase().includes(q) ||
          categoryName(p.categorySlug, "ar").includes(query.trim()),
      );
    }
    if (sort === "price-low") list.sort((a, b) => a.price - b.price);
    if (sort === "price-high") list.sort((a, b) => b.price - a.price);
    if (sort === "name")
      list.sort((a, b) => productName(a, lang).localeCompare(productName(b, lang), lang === "ar" ? "ar" : "en"));
    return list;
  }, [category, query, sort, lang]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <header className="text-center">
        <p className="eyebrow justify-center">{t("featuredEyebrow")}</p>
        <h1 className="section-title mt-3">{t("shopTitle")}</h1>
        <p className="section-sub mx-auto max-w-xl">{t("shopSubtitle")}</p>
      </header>

      {/* Filter toolbar — one clean card: pills on top, search + sort below
          on mobile, single row on desktop. */}
      <div className="card mt-8 flex flex-col gap-3 p-3 sm:mt-10 sm:p-4">
        <div className="flex min-w-0 flex-1 flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={`chip ${category === "all" ? "chip-active" : ""}`}
          >
            {t("shopAllCategories")}
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug)}
              aria-pressed={category === c.slug}
              className={`chip ${category === c.slug ? "chip-active" : ""}`}
            >
              {lang === "ar" ? c.nameAr : c.name}
            </button>
          ))}
        </div>
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("shopSearchPlaceholder")}
            aria-label={t("shopSearchPlaceholder")}
            className="input min-w-0 flex-1"
          />
          <label className="flex h-12 shrink-0 items-center gap-2 rounded-2xl border border-black/15 bg-white px-4 text-sm">
            <span className="text-ink-soft">{t("shopSort")}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="bg-transparent font-semibold outline-none"
              aria-label={t("shopSort")}
            >
              <option value="featured">{t("sortFeatured")}</option>
              <option value="price-low">{t("sortPriceLow")}</option>
              <option value="price-high">{t("sortPriceHigh")}</option>
              <option value="name">{t("sortName")}</option>
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft">
        <strong className="font-bold text-pine">{filtered.length}</strong> {t("shopShowing")}
      </p>

      {filtered.length === 0 ? (
        <div className="card mt-6 p-10 text-center">
          <p className="font-display text-xl font-bold text-pine">{t("shopNoResults")}</p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            className="btn btn-primary mt-5"
          >
            {t("shopClearFilters")}
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
