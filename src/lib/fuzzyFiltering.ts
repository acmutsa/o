import { matchSorter } from "match-sorter";

export function fuzzySearchMultipleWords<ItemType>(
  rows: ItemType[], // array of data [{a: "a", b: "b"}, {a: "c", b: "d"}]
  keys: string[], // keys to search ["a", "b"]
  filterValue: string // potentially multi-word search string "two words"
) {
  if (!filterValue || !filterValue.length) {
    return rows;
  }

  const terms = filterValue.split(" ");
  if (!terms) {
    return rows;
  }

  // reduceRight will mean sorting is done by score for the _first_ entered word.
  return terms.reduceRight(
    (results, term) => matchSorter<ItemType>(results, term, { keys }),
    rows
  );
}
