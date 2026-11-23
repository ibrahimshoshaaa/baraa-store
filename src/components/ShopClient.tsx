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
    if (sort === "price-low") list.sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "price-high") list.sort((a, b) => b.priceCents - a.priceCents);
    if (sort === "name")
      list.sort((a, b) => productName(a, lang).localeCompare(productName(b, lang), lang === "ar" ? "ar" : "en"));
    return list;
  }, [category, query, sort, lang]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <header className="text-center">
        <h1 className="font-display text-4xl font-bold text-pine sm:text-5xl">{t("shopTitle")}</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink-soft">{t("shopSubtitle")}</p>
      </header>

      <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCategory("all")}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              category === "all" ? "bg-pine text-white" : "bg-surface text-ink hover:bg-pine/10"
            }`}
          >
            {t("shopAllCategories")}
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCategory(c.slug)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === c.slug ? "bg-pine text-white" : "bg-surface text-ink hover:bg-pine/10"
              }`}
            >
              {lang === "ar" ? c.nameAr : c.name}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("shopSearchPlaceholder")}
            aria-label={t("shopSearchPlaceholder")}
            className="w-full rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm outline-none focus:border-pine lg:w-56"
          />
          <label className="flex shrink-0 items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2.5 text-sm">
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
        {filtered.length} {t("shopShowing")}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-[24px] bg-surface p-10 text-center shadow-[0_6px_24px_rgba(11,61,46,0.07)]">
          <p className="font-display text-xl font-bold text-pine">{t("shopNoResults")}</p>
          <button
            type="button"
            onClick={() => {
              setCategory("all");
              setQuery("");
            }}
            className="mt-4 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white"
          >
            {t("shopClearFilters")}
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
